package ba.edu.ibu.frent.core.service;

import ba.edu.ibu.frent.core.exceptions.repository.ResourceNotFoundException;
import ba.edu.ibu.frent.core.model.Movie;
import ba.edu.ibu.frent.core.repository.MovieRepository;
import ba.edu.ibu.frent.rest.dto.MovieDTO;
import ba.edu.ibu.frent.rest.dto.MovieRequestDTO;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@Service
public class MovieService {
    private final MovieRepository movieRepository;
    private final MongoTemplate mongoTemplate;

    public MovieService(MovieRepository movieRepository, MongoTemplate mongoTemplate) {
        this.movieRepository = movieRepository;
        this.mongoTemplate = mongoTemplate;
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

    public MovieDTO changeAvailability(String id) {
        Optional<Movie> movie = movieRepository.findById(id);
        if (movie.isEmpty()) {
            throw new ResourceNotFoundException("The movie with the given ID does not exist.");
        }
        Query query = new Query(Criteria.where("_id").is(id));
        Update update = new Update();
        if (movie.get().isAvailable()) {
            update.set("available", false);
        }
        else update.set("available", true);
        mongoTemplate.updateFirst(query, update, Movie.class);
        Optional<Movie> updatedMovie = movieRepository.findById(id);
        return updatedMovie.map(MovieDTO::new).orElseThrow(() ->
                new ResourceNotFoundException("Unable to retrieve the updated movie.")
        );
    }

    public List<MovieDTO> searchMovies(String keyword) {
        List<Movie> movies = movieRepository.findByTitleIgnoreCaseContainingOrDirectorIgnoreCaseContaining(keyword, keyword);
        List<Movie> filteredMovies = movies.stream()
                .filter(movie -> matchesSubstringInWord(keyword.toLowerCase(), movie.getTitle().toLowerCase())
                        || matchesSubstringInWord(keyword.toLowerCase(), movie.getDirector().toLowerCase()))
                .toList();
        return filteredMovies.stream()
                .map(MovieDTO::new)
                .collect(Collectors.toList());
    }

    private boolean matchesSubstringInWord(String substring, String text) {
        String[] words = text.split("\\s+");
        for (String word : words) {
            if (word.startsWith(substring)) {
                return true;
            }
        }
        return false;
    }
}
