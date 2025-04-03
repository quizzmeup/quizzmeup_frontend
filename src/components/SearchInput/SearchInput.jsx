import { FaSearch } from "react-icons/fa";

const SearchInput = ({ placeholder, value, onChange }) => {
  return (
    <form>
      <input placeholder={placeholder} value={value} onChange={onChange} />
      <FaSearch />
    </form>
  );
};

export default SearchInput;
