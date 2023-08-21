import React from "react";
import { useGlobalContext, API_IMAGE } from "./context";
import { NavLink } from "react-router-dom";
const Movies = () => {
  const { movie, isLoading } = useGlobalContext();
  console.log(movie);
  if (isLoading) {
    return (
      <div className="">
        <div className="loading">Loading...</div>
      </div>
    );
  }
  return (
    <section className="movie-page">
      <div className="container grid grid-4-col">
        {movie.map((curElement) => {
          const { title, poster_path, id } = curElement;
          const movieName = title
            ? title.length >= 15
              ? `${title.substring(0, 15)}...`
              : title
            : "";

          return (
            <NavLink key={id} to={`movie/${id}`}>
              <div className="movie-section">
                <div className="card-info">
                  <h2>
                    {movieName.length >= 15 ? `${movieName}...` : movieName}
                  </h2>

                  <img src={API_IMAGE + poster_path} alt={id} />
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
};
export default Movies;
