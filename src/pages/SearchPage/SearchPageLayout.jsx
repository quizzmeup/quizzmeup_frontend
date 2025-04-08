import SearchInput from "../../components/SearchInput/SearchInput";
import "./SearchPageLayout.css";

const SearchPageLayout = ({ label, value, onChange, children }) => {
  return (
    <div className="container">
      <div className="search-page-layout">
        <h1>Rechercher {label}</h1>
        <SearchInput
          placeholder={`Rechercher un ${label}`}
          value={value}
          onChange={onChange}
        />
        {children}
      </div>
    </div>
  );
};

export default SearchPageLayout;
