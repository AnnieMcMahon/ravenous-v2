import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import BusinessList from "./components/BusinessList";
import getSuggestions from "./utilities/yelp";
import { appBusinessInfo } from "./utilities/interfaces";

function App() {
  const [businesses, setBusinesses] = useState<appBusinessInfo[]>([]);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const searchYelp = async (
    keyword: string,
    location: string,
    sort: string
  ) => {
    try {
      const suggestions: appBusinessInfo[] = await getSuggestions(
        keyword,
        location,
        sort
      );
      if (suggestions.length > 0) {
        setBusinesses(suggestions);
        setShowMessage(false);
      } else {
        setShowMessage(true);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setShowMessage(true);
    }
  };

  useEffect(() => {
    searchYelp("food", "US", "best_match");
  }, []);

  const handleUnlockAccess = () => {
    window.open("https://cors-anywhere.herokuapp.com/corsdemo", "_blank");
  };

  return (
    <div className="App">
      <Header />
      <main>
        <SearchBar searchYelp={searchYelp} />
        {showMessage && (
          <div className="message">
            <p>
              To use this app, you must temporarily unlock access to the demo.
              Click{" "}
              <span className="link" onClick={handleUnlockAccess}>
                here
              </span>{" "}
              to proceed.
            </p>
          </div>
        )}
        {businesses.length > 0 && <BusinessList businesses={businesses} />}
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
