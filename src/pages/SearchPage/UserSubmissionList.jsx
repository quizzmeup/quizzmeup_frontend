import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import ResultCard from "../../components/ResultCard/ResultCard";
import { ROUTES } from "../../routes";
import Loader from "../../components/Loader/Loader";
import { fetchSubmissionByUserId } from "../../api/submission";
import { useParams } from "react-router-dom";
import useSearchWithId from "../../hooks/useSearchWithId";

const UserSubmissionList = () => {
  const { userId } = useParams();
  const { data, isLoading } = useSearchWithId(fetchSubmissionByUserId, userId);

  const { token } = useAuth();
  const userIsAdmin = JSON.parse(localStorage.getItem("userData"))?.isAdmin;

  if (!token || !userIsAdmin) return <Navigate to={ROUTES.home} />;
  if (isLoading) return <Loader />;

  return (
    <div className="container">
      <div className="search-page-layout">
        <h1>Liste des formulaires complétés</h1>
        {data.length === 0 && (
          <span>Cet élève n'a pas complété de formulaire</span>
        )}
        {data.map((submission) => {
          return (
            <ResultCard
              key={submission._id}
              title={submission.quizVersion.title}
              specialClass="search-results"
              actionLabel="Consulter"
              linkTo={`/submissions/${submission._id}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UserSubmissionList;
