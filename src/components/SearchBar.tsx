import { useState, ChangeEvent, MouseEvent } from 'react';

interface SortChoice {
  id: string;
  choice: string;
}

interface SearchBarProps {
  searchYelp: (keyword: string, location: string, sort: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchYelp }) => {
  const [location, setLocation] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [sort, setSort] = useState<string>("best_match");

  const sortChoices: SortChoice[] = [
    { id: "best_match", choice: "Best Match" },
    { id: "rating", choice: "Highest Rated" },
    { id: "review_count", choice: "Most Reviewed" }
  ];

  const handleSortChange = (choice: string) => {
    setSort(choice);
  };

  const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const finalLocation = location || "US";
    const finalKeyword = keyword || "restaurant";
    searchYelp(finalKeyword, finalLocation, sort);
  };

  return (
    <div id="search-bar">
      <ul id="sort-options">
        {sortChoices.map((choice) => (
          <li 
            key={choice.id} 
            onClick={() => handleSortChange(choice.id)} 
            className={sort === choice.id ? "active" : ""}
          >
            {choice.choice}
          </li>
        ))}
      </ul>
      <hr />
      <div id="user-input">
        <input 
          type="text" 
          className="search-input" 
          id="location" 
          onChange={handleLocationChange} 
          placeholder="Location (e.g., New York, NY)" 
          value={location}
        />
        <input 
          type="text" 
          className="search-input" 
          id="keyword" 
          onChange={handleKeywordChange} 
          placeholder="Keyword (e.g., Pizza)" 
          value={keyword}
        />
        <button 
          id="submit" 
          type="button" 
          onClick={handleSubmit}
        >
          Let's go!
        </button>
      </div>
    </div>
  );
};

export default SearchBar;