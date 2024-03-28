import React, { useEffect, useState } from "react";
import "./Banner.css";
const Banner = ({ fetchURL }) => {
  const [movie, setMovie] = useState(null); // Initialize movie state with null
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`https://api.themoviedb.org/3${fetchURL}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        const randomIndex = Math.floor(Math.random() * data.results.length);
        const randomMovie = data.results[randomIndex];
        console.log(randomMovie);
        setMovie(randomMovie); // Update movie state with random movie
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [fetchURL]);

  const backdropPath = movie?.backdrop_path ? movie.backdrop_path : "";
  const backdropURL = backdropPath
    ? `https://image.tmdb.org/t/p/w500/${backdropPath}`
    : "";
  // https://image.tmdb.org/t/p/w500/8VXhcrl5z2I1zEU9X3pkkNrZlD.jpg
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("${backdropURL}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My list</button>
        </div>
        <h1 className="banner_description">{movie?.overview}</h1>
      </div>
      <div className="banner_fadeBottom"></div>
    </header>
  );
};

export default Banner;
