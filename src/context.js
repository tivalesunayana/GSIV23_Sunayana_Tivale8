import React, { createContext, useContext, useEffect, useState } from "react";
const AppContext = createContext();
// export const API_URL = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_APP_KEY}`;
// export const API_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_APP_KEY}&include_adult=false&language=en-US&page=1`;
export const API_URL = `https://api.themoviedb.org/3/trending/all/day?api_key=d7a800494edd3841049967c805ba75e1`;
export const API_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=d7a800494edd3841049967c805ba75e1&include_adult=false&language=en-US&page=1`;

export const API_IMAGE = `https://image.tmdb.org/t/p/w500`;
const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [isError, setIsError] = useState({ show: "false", msg: "" });
  const [query, setQuery] = useState("naruto");
  const getData = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data) {
        setIsLoading(false);
        setIsError({ show: false, msg: "" });

        const sortedMovies = data.results.sort((a, b) =>
          b.release_date.localeCompare(a.release_date)
        );

        setMovie(sortedMovies);
      } else {
        setIsError({ show: true, msg: data.Error });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let timerOut = setTimeout(() => {
      getData(`${API_SEARCH}&query=${query}`);
    }, 500);
    return () => clearTimeout(timerOut);
  }, [query]);

  return (
    <AppContext.Provider value={{ isLoading, movie, isError, query, setQuery }}>
      {children}
    </AppContext.Provider>
  );
};
const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider, useGlobalContext };
