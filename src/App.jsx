import { useState } from "react";
import Row from "./Row";
import "./App.css";

import requests from "./request";
import Banner from "./Banner";
import Nav from "./Nav";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {" "}
      <div className="App">
        <Banner fetchURL={requests.fetchNetflixOriginals}></Banner>
        <Nav></Nav>
        <Row
          title="Netflix Originals"
          fetchURL={requests.fetchNetflixOriginals}
          isLargeRow
        ></Row>
        <Row title="Trending now" fetchURL={requests.fetchTrending}></Row>
        <Row title="Top Rated" fetchURL={requests.fetchTopRated}></Row>
        <Row title="Action Movies" fetchURL={requests.fetchActionMovies}></Row>
        <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies}></Row>
        <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies}></Row>
        <Row
          title="Romance Movies"
          fetchURL={requests.fetchRomanceMovies}
        ></Row>
        <Row title="Documentaries" fetchURL={requests.fetchDocumentaries}></Row>
      </div>
    </>
  );
}

export default App;
