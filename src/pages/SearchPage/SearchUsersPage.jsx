import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import ResultCard from "../../components/ResultCard/ResultCard";
import { ROUTES } from "../../routes";
import Loader from "../../components/Loader/Loader";
import useSearchResults from "../../hooks/useSearchResults";
import { getUsers } from "../../api/users";
import SearchPageLayout from "./SearchPageLayout";

const SearchUsersPage = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useSearchResults(getUsers, search, "name");
  const { token } = useAuth();
  const userIsAdmin = JSON.parse(localStorage.getItem("userData"))?.isAdmin;

  if (!token || !userIsAdmin) return <Navigate to={ROUTES.home} />;
  if (isLoading) return <Loader />;

  return (
    <SearchPageLayout
      label="utilisateur"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    >
      {data.map((user) => (
        <ResultCard
          key={user._id}
          title={user.name}
          linkTo={`/submissions/user/${user._id}`}
          specialClass="search-results"
          actionLabel="Consulter"
        />
      ))}
    </SearchPageLayout>
  );
};

export default SearchUsersPage;
