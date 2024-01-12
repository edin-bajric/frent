import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import { movie1, movie2, notification1, notification2 } from "./constants";
import { Home, Movies, Rentals, SignInPage, RegisterPage, NotFound } from "./pages";
import { Routes, Route } from "react-router-dom";

export default function App() {
  const movies = [movie1, movie2];
  const notifications = [notification1, notification2];
  return (
    <>
      <Navbar movies={movies} notifications={notifications} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/rentals" element={<Rentals />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
