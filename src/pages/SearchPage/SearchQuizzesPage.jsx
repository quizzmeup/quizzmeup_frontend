import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import ResultCard from "../../components/ResultCard/ResultCard";
import { ROUTES } from "../../routes";
import Loader from "../../components/Loader/Loader";
import useSearchResults from "../../hooks/useSearchResults";
import { getQuizzes } from "../../api/quiz";
import SearchPageLayout from "./SearchPageLayout";

const SearchQuizzesPage = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useSearchResults(getQuizzes, search, "title");
  const { token } = useAuth();
  const userIsAdmin = JSON.parse(localStorage.getItem("userData"))?.isAdmin;

  if (!token || !userIsAdmin) return <Navigate to={ROUTES.home} />;
  if (isLoading) return <Loader />;

  return (
    <SearchPageLayout
      label="formulaire"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    >
      {data.map((quiz) => (
        <ResultCard
          key={quiz._id}
          title={quiz.title}
          linkTo={ROUTES.searchCohorts}
          specialClass="search-results"
          actionLabel="Consulter"
        />
      ))}
    </SearchPageLayout>
  );
};

export default SearchQuizzesPage;
