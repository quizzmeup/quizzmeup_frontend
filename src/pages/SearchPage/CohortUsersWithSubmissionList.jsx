import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import ResultCard from "../../components/ResultCard/ResultCard";
import { ROUTES } from "../../routes";
import Loader from "../../components/Loader/Loader";
import { getUsersWithSubmissions } from "../../api/users";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const CohortUsersWithSubmissionList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { quizId, cohortId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUsersWithSubmissions(quizId, cohortId);
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const { userData, token } = useAuth();
  const userIsAdmin = userData?.isAdmin;

  if (!token || !userIsAdmin) return <Navigate to={ROUTES.home} />;
  if (isLoading) return <Loader />;

  return (
    <div className="container">
      <div className="search-page-layout">
        <h1>Elèves de la session</h1>
        {data.map((user) => {
          return (
            <ResultCard
              key={user.id}
              title={user.name}
              specialClass="search-results"
              actionLabel="Consulter"
              linkTo={`/submissions/${user.submissionId}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CohortUsersWithSubmissionList;
