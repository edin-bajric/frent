import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import useAllMovies from "../../hooks/useAllMovies";
import { Movie } from "../../utils/types";
import AddMovie from "../AddMovie";
import useDeleteMovie from "../../hooks/useDeleteMovie";
import UpdateMovie from "../UpdateMovie";

const MovieDashboard = () => {
  const { data: movies = [], isLoading } = useAllMovies();
  const [showAddMovie, setShowAddMovie] = useState(false);
  const { mutate: deleteMovie } = useDeleteMovie();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [movieIdToDelete, setMovieIdToDelete] = useState("");
  const [showUpdateMovie, setShowUpdateMovie] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleAddMovieClick = () => {
    setShowAddMovie(true);
  };

  const handleCloseAddMovie = () => {
    setShowAddMovie(false);
  };

  const handleDeleteConfirmation = (movieId: any) => {
    setMovieIdToDelete(movieId);
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setMovieIdToDelete("");
  };

  const handleDeleteMovie = async () => {
    try {
      await deleteMovie(movieIdToDelete);
      handleCloseConfirmation();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const handleUpdateMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setShowUpdateMovie(true);
  };

  const deleteButtonColumn: TableColumn<Movie> = {
    name: "Delete",
    button: true,
    cell: (row: Movie) => (
      <>
        <Button
          variant="danger"
          onClick={() => handleDeleteConfirmation(row.id)}
        >
          Delete
        </Button>
      </>
    ),
  };

  const updateButtonColumn: TableColumn<Movie> = {
    name: "Update",
    button: true,
    cell: (row: Movie) => (
      <>
        <Button variant="warning" onClick={() => handleUpdateMovieClick(row)}>
          Update
        </Button>
      </>
    ),
  };

  const columns: TableColumn<Movie>[] = [
    deleteButtonColumn,
    updateButtonColumn,
    {
      name: "ID",
      selector: (row: Movie) => row.id,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row: Movie) => row.title,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row: Movie) => row.description,
    },
    {
      name: "Small Image",
      selector: (row: Movie) => row.smallImage,
    },
    {
      name: "Big Image",
      selector: (row: Movie) => row.bigImage,
    },
    {
      name: "Director",
      selector: (row: Movie) => row.director,
      sortable: true,
    },
    {
      name: "Genre",
      selector: (row: Movie) => row.genre.join(", "),
      sortable: true,
    },
    {
      name: "Year",
      selector: (row: Movie) => row.year,
      sortable: true,
    },
    {
      name: "Available",
      selector: (row: Movie) => row.available.toString(),
      sortable: true,
    },
    {
      name: "Rental Price",
      selector: (row: Movie) => row.rentalPrice,
      sortable: true,
    },
    {
      name: "Video",
      selector: (row: Movie) => row.video,
    },
  ];

  return (
    <>
      <Button
        onClick={handleAddMovieClick}
        style={{ margin: "16px" }}
        variant="primary"
      >
        Add Movie
      </Button>
      <DataTable
        columns={columns}
        data={movies}
        progressPending={isLoading}
        progressComponent={<h2>Loading...</h2>}
        noDataComponent={<h2>No movies found</h2>}
        pagination
        responsive
        striped
        highlightOnHover
      />
      <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this movie?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmation}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteMovie}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <AddMovie show={showAddMovie} handleClose={handleCloseAddMovie} />
      {selectedMovie && (
        <UpdateMovie
          show={showUpdateMovie}
          movie={selectedMovie}
          handleClose={() => setShowUpdateMovie(false)}
        />
      )}
    </>
  );
};

export default MovieDashboard;
