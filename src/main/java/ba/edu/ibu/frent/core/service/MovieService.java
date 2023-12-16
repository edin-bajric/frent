package ba.edu.ibu.frent.core.service;

import ba.edu.ibu.frent.core.exceptions.repository.ResourceAlreadyExistsException;
import ba.edu.ibu.frent.core.exceptions.repository.ResourceNotFoundException;
import ba.edu.ibu.frent.core.model.Movie;
import ba.edu.ibu.frent.core.model.User;
import ba.edu.ibu.frent.core.repository.MovieRepository;
import ba.edu.ibu.frent.core.repository.UserRepository;
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
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public MovieService(MovieRepository movieRepository, MongoTemplate mongoTemplate, UserRepository userRepository, NotificationService notificationService) {
        this.movieRepository = movieRepository;
        this.mongoTemplate = mongoTemplate;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
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

    public MovieDTO setAvailable(String id) {
        Optional<Movie> movieOptional = movieRepository.findById(id);
        if (movieOptional.isEmpty()) {
            throw new ResourceNotFoundException("The movie with the given ID does not exist.");
        }
        Movie movie = movieOptional.get();
        if (movie.isAvailable()) {
            throw new ResourceAlreadyExistsException("The movie is already available.");
        }
        updateAvailability(id, true);
        if (!movie.isAvailable()) {
            List<User> usersWithMovieInWishlist = userRepository.findByWishlistContaining(id);
            for (User user : usersWithMovieInWishlist) {
                String username = user.getUsername();
                String notificationMessage = movie.getTitle() + " from your wishlist is now available!";
                notificationService.sendMessage(username, notificationMessage);
            }
        }
        return movieRepository.findById(id)
                .map(MovieDTO::new)
                .orElseThrow(() -> new ResourceNotFoundException("Unable to retrieve the updated movie."));
    }

    public MovieDTO setUnavailable(String id) {
        Optional<Movie> movie = movieRepository.findById(id);
        if (movie.isEmpty()) {
            throw new ResourceNotFoundException("The movie with the given ID does not exist.");
        }
        if (!movie.get().isAvailable()) {
            throw new ResourceAlreadyExistsException("The movie is already unavailable.");
        }
        updateAvailability(id, false);
        return movieRepository.findById(id)
                .map(MovieDTO::new)
                .orElseThrow(() -> new ResourceNotFoundException("Unable to retrieve the updated movie."));
    }

    private void updateAvailability(String id, boolean newAvailability) {
        Query query = new Query(Criteria.where("_id").is(id));
        Update update = new Update().set("available", newAvailability);
        mongoTemplate.updateFirst(query, update, Movie.class);
    }

    public MovieDTO setPriceAndNotify(String id, double discount) {
        Optional<Movie> movieOptional = movieRepository.findById(id);
        if (movieOptional.isEmpty()) {
            throw new ResourceNotFoundException("The movie with the given ID does not exist.");
        }
        Movie movie = movieOptional.get();
        double originalPrice = movie.getRentalPrice();
        double discountedPrice = calculateDiscountedPrice(originalPrice, discount);
        if (originalPrice == discountedPrice) {
            throw new ResourceAlreadyExistsException("The movie is already on sale.");
        }
        movie.setRentalPrice(discountedPrice);
        movieRepository.save(movie);
        List<User> usersWithMovieInWishlist = userRepository.findByWishlistContaining(id);
        for (User user : usersWithMovieInWishlist) {
            String username = user.getUsername();
            String notificationMessage = movie.getTitle() + " is now on sale! Original price: " +
                    originalPrice + ", Discounted price: " + discountedPrice;
            notificationService.sendMessage(username, notificationMessage);
        }
        return new MovieDTO(movie);
    }

    private double calculateDiscountedPrice(double originalPrice, double discount) {
        double discountedPrice = originalPrice - (originalPrice * (discount / 100));
        return Math.round(discountedPrice * 100.0) / 100.0;
    }

    public MovieDTO revertPrice(String movieId, double oldPrice) {
        Optional<Movie> movieOptional = movieRepository.findById(movieId);
        if (movieOptional.isEmpty()) {
            throw new ResourceNotFoundException("The movie with the given ID does not exist.");
        }
        Movie movie = movieOptional.get();
        movie.setRentalPrice(oldPrice);
        movieRepository.save(movie);
        return new MovieDTO(movie);
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
