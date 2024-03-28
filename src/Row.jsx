import React, { useEffect, useState } from "react";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const Row = ({ title, fetchURL, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://api.themoviedb.org/3${fetchURL}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [fetchURL]);
  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleOnClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          const videoId = urlParams.get("v");
          setTrailerUrl(videoId);
        })
        .catch((error) => {
          console.error("Error fetching trailer:", error);
          // Optionally, you could provide some user feedback here
        });
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => {
          return (
            <img
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
              key={movie.id}
              onClick={() => handleOnClick(movie)}
              src={`https://image.tmdb.org/t/p/w500${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          );
        })}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}></YouTube>}
    </div>
  );
};

export default Row;
