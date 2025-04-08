import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import ResultCard from "../../components/ResultCard/ResultCard";
import { ROUTES } from "../../routes";
import Loader from "../../components/Loader/Loader";
import { getCohortsWithSubmissions } from "../../api/cohorts";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const CohortsWithSubmissionsList = () => {
  const { quizId } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCohortsWithSubmissions(quizId);
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const { token } = useAuth();
  const { userData } = useAuth();
  const userIsAdmin = userData?.isAdmin;

  if (!token || !userIsAdmin) return <Navigate to={ROUTES.home} />;
  if (isLoading) return <Loader />;

  return (
    <div className="container">
      <div className="search-page-layout">
        <h1>Sessions</h1>
        {data.map((cohort) => {
          return (
            <ResultCard
              key={cohort._id}
              title={cohort.name}
              specialClass="search-results"
              actionLabel="Consulter"
              linkTo={ROUTES.cohortUsersWithSubmissionList.build(
                quizId,
                cohort._id
              )}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CohortsWithSubmissionsList;
