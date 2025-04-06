import "./ResultUsers.css";
import SearchInput from "../../components/SearchInput/SearchInput";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import BannerItemBis from "../../components/BannerItemBis/BannerItemBis";
import { ROUTES } from "../../routes";
import Loader from "../../components/Loader/Loader";

const Result = ({ request, pageTitle, placeholder, tagKey }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const { token } = useAuth();

  console.log(pageTitle);

  let isAdmin;
  const storedUser = localStorage.getItem("userData");
  if (storedUser) {
    const obj = JSON.parse(storedUser);
    isAdmin = obj.isAdmin;
  }

  const fetchData = async () => {
    try {
      let filters = "";
      filters += `?${tagKey}=${search}`;
      setData(await request(filters));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
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
          <h1>Résultats par {pageTitle}</h1>
          <SearchInput
            placeholder={`Rechercher un ${placeholder}`}
            onChange={handleSearch}
            value={search}
          />
          {data &&
            data.map((elem) => {
              return (
                <BannerItemBis
                  key={elem._id}
                  title={elem[tagKey]}
                  linkLabel="Consulter"
                  specialClass="search-results"
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

export default Result;
