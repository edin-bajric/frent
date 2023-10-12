package ba.edu.ibu.frent.core.repository;

import ba.edu.ibu.frent.core.model.Movie;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

@Repository
public class MovieRepository {
    private List<Movie> movies;

    public MovieRepository() {
        this.movies = Arrays.asList(
                new Movie(1, "Movie1", "Director1", "Genre1", 2023),
                new Movie(2, "Movie2", "Director2", "Genre2", 2023),
                new Movie(3, "Movie3", "Director3", "Genre3", 2023)
        );
    }

    public List<Movie> findAll() {
        return movies;
    }

    public Movie findById(int id) {
        return movies.stream().filter(movie -> movie.getId() == id).findFirst().orElse(null);
    }
}
