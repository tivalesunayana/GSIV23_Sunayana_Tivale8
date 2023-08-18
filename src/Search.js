import React from "react";
import { useGlobalContext } from "./context";
import { AiOutlineSearch } from "react-icons/ai";

const Search = () => {
  const { query, setQuery, isError } = useGlobalContext();

  return (
    <section className="search-section">
      <form action="#" onSubmit={(e) => e.preventDefault()}>
        <div className="search-container">
          <div className="search-input">
            <AiOutlineSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search here..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>
      <div className="card-error">
        <p>{isError.show && isError.msg}</p>
      </div>
    </section>
  );
};

export default Search;
