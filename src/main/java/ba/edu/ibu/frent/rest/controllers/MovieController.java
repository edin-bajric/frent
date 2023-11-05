package ba.edu.ibu.frent.rest.controllers;

import ba.edu.ibu.frent.core.service.MovieService;
import ba.edu.ibu.frent.rest.dto.MovieDTO;
import ba.edu.ibu.frent.rest.dto.MovieRequestDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/movies")
public class MovieController {
    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/")
    public ResponseEntity<List<MovieDTO>> getMovies() {
        return ResponseEntity.ok(movieService.getMovies());
    }

    @RequestMapping(method = RequestMethod.POST, path = "/add")
    public ResponseEntity<MovieDTO> add(@RequestBody MovieRequestDTO movie) {
        return ResponseEntity.ok(movieService.addMovie(movie));
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    public ResponseEntity<MovieDTO> getMovieById(@PathVariable String id) {
        return ResponseEntity.ok(movieService.getMovieById(id));
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/{id}")
    public ResponseEntity<MovieDTO> updateMovie(@PathVariable String id, @RequestBody MovieRequestDTO movie) {
        return ResponseEntity.ok(movieService.updateMovie(id, movie));
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
    public ResponseEntity<Void> deleteMovie(@PathVariable String id) {
        movieService.deleteMovie(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
