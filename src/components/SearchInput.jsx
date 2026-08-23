function SearchInput({ searchText, setSearchText }) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search jobs by title, company or location..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
}

export default SearchInput;