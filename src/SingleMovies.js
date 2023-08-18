import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { API_IMAGE } from "./context";

const SingleMovies = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  // const [isError, setIsError] = useState({ show: "false", msg: "" });
  console.log(id);
  const getData = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data) {
        setIsLoading(false);
        setMovie(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let timerOut = setTimeout(() => {
      //   getData(`${API_URL}&i=${id}`);
      getData(
        `https://api.themoviedb.org/3/movie/${id}?api_key=d7a800494edd3841049967c805ba75e1`
      );
    }, 500);
    return () => clearTimeout(timerOut);
  }, [id]);
  if (isLoading) {
    return (
      <div className="">
        <div className="loading">Loading...</div>
      </div>
    );
  }
  console.log(`title : ${movie.title}`);
  console.log(`title : ${API_IMAGE + movie.poster_path}`);
  return (
    <section className="movie-section">
      <div className="movie-card">
        <figure>
          <figure>
            <img src={`${API_IMAGE}${movie.poster_path}`} alt={id} />
          </figure>
        </figure>
        <div className="card-content">
          <p className="title">{movie.title}</p>
          <p className="card-text">{movie.release_date}</p>
          <p className="card-text">Length: {movie.runtime} minutes</p>
          <p className="card-text">Rating: {movie.vote_average}</p>
          <p className="card-text">
            Original Language: {movie.original_language}
          </p>
          <p className="card-text">Overview : {movie.overview}</p>

          <NavLink to="/" className="back-btn">
            Go Back
          </NavLink>
        </div>
      </div>
    </section>
  );
};
export default SingleMovies;
