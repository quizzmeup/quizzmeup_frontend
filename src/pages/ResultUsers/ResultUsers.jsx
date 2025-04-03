import "./ResultUsers.css";
import SearchInput from "../../components/SearchInput/SearchInput";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import BannerItemBis from "../../components/BannerItemBis/BannerItemBis";
import { ROUTES } from "../../routes";
import { getUsers } from "../../api/users";
import Loader from "../../components/Loader/Loader";

const ResultUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const { token } = useAuth();

  let isAdmin;
  const storedUser = localStorage.getItem("userData");
  if (storedUser) {
    const obj = JSON.parse(storedUser);
    isAdmin = obj.isAdmin;
  }

  const fetchData = async () => {
    try {
      let filters = "";
      filters += `?name=${search}`;
      setData(await getUsers(filters));
      setIsLoading(false);
    } catch (error) {
      console.error;
    }
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return token && isAdmin ? (
    isLoading ? (
      <Loader />
    ) : (
      <div className="container ">
        <div className="result-background">
          <SearchInput
            placeholder="Rechercher un utilisateur"
            onChange={handleSearch}
            value={search}
          />
          {data &&
            data.map((user) => {
              return (
                <BannerItemBis
                  key={user._id}
                  title={user.name}
                  linkLabel="Consulter"
                />
              );
            })}
        </div>
      </div>
    )
  ) : (
    <Navigate to={ROUTES.home} />
  );
};

export default ResultUsers;
