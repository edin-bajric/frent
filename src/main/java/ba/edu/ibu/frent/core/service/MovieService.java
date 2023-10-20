package ba.edu.ibu.frent.core.service;

import ba.edu.ibu.frent.core.exceptions.repository.ResourceNotFoundException;
import ba.edu.ibu.frent.core.model.Movie;
import ba.edu.ibu.frent.core.model.Movie;
import ba.edu.ibu.frent.core.repository.MovieRepository;
import ba.edu.ibu.frent.rest.dto.MovieDTO;
import ba.edu.ibu.frent.rest.dto.MovieDTO;
import ba.edu.ibu.frent.rest.dto.MovieRequestDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@Service
public class MovieService {
    private final MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public List<MovieDTO> getMovies() {
        List<Movie> movies = movieRepository.findAll();

        return movies
                .stream()
                .map(MovieDTO::new)
                .collect(toList());
    }

    public MovieDTO getMovieById(String id) {
        Optional<Movie> movie = movieRepository.findById(id);
        if (movie.isEmpty()) {
            throw new ResourceNotFoundException("The movie with the given ID does not exist.");
        }
        return new MovieDTO(movie.get());
    }

    public MovieDTO addMovie(MovieRequestDTO payload) {
        Movie movie = movieRepository.save(payload.toEntity());
        return new MovieDTO(movie);
    }

    public MovieDTO updateMovie(String id, MovieRequestDTO payload) {
        Optional<Movie> movie = movieRepository.findById(id);
        if (movie.isEmpty()) {
            throw new ResourceNotFoundException("The movie with the given ID does not exist.");
        }
        Movie updatedMovie = payload.toEntity();
        updatedMovie.setId(movie.get().getId());
        updatedMovie = movieRepository.save(updatedMovie);
        return new MovieDTO(updatedMovie);
    }

    public void deleteMovie(String id) {
        Optional<Movie> movie = movieRepository.findById(id);
        movie.ifPresent(movieRepository::delete);
    }
}
