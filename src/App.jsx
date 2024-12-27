import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Slider from './components/Slider';
import ProductionHouse from './components/ProductionHouse';
import GenreMovieList from './components/GenreMovieList';

import WatchList from './pages/WatchList';
import Originals from './pages/Originals';
import Movies from './pages/Movies';
import Series from './pages/Series';
import MovieDetails from './pages/MovieDetails';

function App() {
  return (
    <Router>
      <div className="">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Slider />
              <ProductionHouse />
              <GenreMovieList />
            </>
          } />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/originals" element={<Originals />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieDetails />} /> 
          <Route path="/series" element={<Series />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
