import { useEffect, useState } from "react";
import { getCohorts, createCohort } from "../../api/cohort";
import { useToast } from "../../contexts/ToastContext";
import Loader from "../../components/Loader/Loader";
import { handleApiError } from "../../utils/apiErrorHandler";
import "./CohortManager.css";

const CohortManager = () => {
  const [cohorts, setCohorts] = useState([]);
  const [newCohortName, setNewCohortName] = useState("");
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchCohorts = async () => {
      try {
        const res = await getCohorts();
        setCohorts(res.data);
      } catch (error) {
        showToast(`Erreur lors du chargement des sessions: ${error}`, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchCohorts();
  }, [showToast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newCohortName.trim()) return;

    try {
      const res = await createCohort(newCohortName.trim());
      setCohorts((prev) => [...prev, res.data]);
      setNewCohortName("");
      showToast("Cohorte créée avec succès", "success");
    } catch (error) {
      console.log("error:", handleApiError(error));
      showToast(
        `Erreur lors de la création de la session: ${handleApiError(error)}`,
        "error"
      );
    }
  };

  return (
    <div className="container">
      <div className="cohort-manager-page">
        <h1>Gestion des Sessions</h1>

        <form className="cohort-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom de la nouvelle session"
            value={newCohortName}
            onChange={(e) => setNewCohortName(e.target.value)}
          />
          <button type="submit" className="auth-btn">
            Créer
          </button>
        </form>

        {loading ? (
          <Loader />
        ) : (
          <ul className="cohort-list">
            {cohorts.map((cohort) => (
              <li key={cohort._id}>{cohort.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CohortManager;
