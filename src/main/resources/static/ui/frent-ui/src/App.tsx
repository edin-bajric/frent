import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import MovieCard from "./components/MovieCard";
import RentalCard from "./components/RentalCard";
import { movie1, movie2, notification1, notification2 } from "./constants";

export default function App() {
  const movies = [movie1, movie2];
  const notifications = [notification1, notification2];
  return (
    <>
      <Navbar movies={movies} notifications={notifications} />
      <h1 style={{padding: "16px"}}>Card for movies page (there will be many cards like this one in the movies page)</h1>
      <MovieCard movie={movie1} />
      <h1 style={{padding: "16px"}}>Card for rentals page (there will be many cards like this one in the rentals page)</h1>
      <RentalCard movie={movie1} />
    </>
  );
}
