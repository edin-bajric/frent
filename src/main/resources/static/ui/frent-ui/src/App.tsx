import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import {
  Home,
  Movies,
  Rentals,
  SignInPage,
  RegisterPage,
  NotFound,
  SearchResult,
} from "./pages";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/rentals" element={<Rentals />} />
        </Route>
        <Route path="/login" element={<SignInPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
