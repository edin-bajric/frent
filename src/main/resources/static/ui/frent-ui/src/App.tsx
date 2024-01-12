import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import { movie1, movie2, notification1, notification2 } from "./constants";

export default function App() {
  const movies = [movie1, movie2];
  const notifications = [notification1, notification2];
  return (
    <>
      <Navbar movies={movies} notifications={notifications} />
    </>
  );
}
