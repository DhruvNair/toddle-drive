import FormControl from "react-bootstrap/esm/FormControl";
import InputGroup from "react-bootstrap/esm/InputGroup";
import SearchIcon from "../../../assets/SearchO.svg";
import CancelIcon from "../../../assets/Union.png";
import "./Search.css";

type Props = {
  searchText: string;
  setSearchText: (searchText: string) => void;
};

const Search = ({ searchText, setSearchText }: Props) => {
  return (
    <div className="container searchContainer">
      <InputGroup className="bg-white searchGroup">
        <img alt="search" className="searchIcon" src={SearchIcon} />
        <FormControl
          placeholder="Search for a folder or file"
          aria-label="Search for a folder or file"
          aria-describedby="basic-addon1"
          className="text-input"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        <img
          style={{ visibility: !!searchText ? "visible" : "hidden" }}
          alt="cancel-search"
          className="cancelIcon touchable"
          onClick={() => setSearchText("")}
          src={CancelIcon}
        />
      </InputGroup>
      <span
        className="searchHelper"
        style={{ visibility: !!searchText ? "visible" : "hidden" }}
      >
        Showing search results for "{searchText}"
      </span>
    </div>
  );
};

export default Search;
