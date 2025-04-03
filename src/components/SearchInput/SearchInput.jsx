import { FaSearch } from "react-icons/fa";
import "./SearchInput.css";

const SearchInput = ({ placeholder, value, onChange }) => {
  return (
    <div>
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="search-input"
      />
      <FaSearch className="search-icon" />
    </div>
  );
};

export default SearchInput;
