import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import ResultCard from "../../components/ResultCard/ResultCard";
import { ROUTES } from "../../routes";
import Loader from "../../components/Loader/Loader";
import { getCohortsWithSubmissions } from "../../api/cohorts";
import { useParams } from "react-router-dom";
import useSearchWithId from "../../hooks/useSearchWithId";

const SearchCohortsPage = () => {
  const { quizId } = useParams();
  const { data, isLoading } = useSearchWithId(
    getCohortsWithSubmissions,
    quizId
  );

  const { token } = useAuth();
  const userIsAdmin = JSON.parse(localStorage.getItem("userData"))?.isAdmin;

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
              linkTo={ROUTES.searchUsersByCohorts.build(quizId, cohort._id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SearchCohortsPage;
