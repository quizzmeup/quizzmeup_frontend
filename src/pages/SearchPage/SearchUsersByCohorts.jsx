import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import ResultCard from "../../components/ResultCard/ResultCard";
import { ROUTES } from "../../routes";
import Loader from "../../components/Loader/Loader";
import { getUsersWithSubmissions } from "../../api/users";
import { useParams } from "react-router-dom";
import useSearchWithId from "../../hooks/useSearchWithId";

const SearchUsersByCohorts = () => {
  const { quizId, cohortId } = useParams();
  const { data, isLoading } = useSearchWithId(
    getUsersWithSubmissions,
    quizId,
    cohortId
  );

  const { token } = useAuth();
  const userIsAdmin = JSON.parse(localStorage.getItem("userData"))?.isAdmin;

  if (!token || !userIsAdmin) return <Navigate to={ROUTES.home} />;
  if (isLoading) return <Loader />;

  return (
    <div className="container">
      <div className="search-page-layout">
        <h1>Elèves de la session</h1>
        {data.map((cohort) => {
          return (
            <ResultCard
              key={cohort.id}
              title={cohort.name}
              specialClass="search-results"
              actionLabel="Consulter"
            />
          );
        })}
      </div>
    </div>
  );
};

export default SearchUsersByCohorts;
