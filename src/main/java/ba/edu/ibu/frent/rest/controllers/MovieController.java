package ba.edu.ibu.frent.rest.controllers;

import ba.edu.ibu.frent.core.service.MovieService;
import ba.edu.ibu.frent.rest.dto.MovieDTO;
import ba.edu.ibu.frent.rest.dto.MovieRequestDTO;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/movies")
@SecurityRequirement(name = "JWT Security")
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
    @PreAuthorize("hasAnyAuthority('EMPLOYEE', 'ADMIN')")
    public ResponseEntity<MovieDTO> add(@RequestBody MovieRequestDTO movie) {
        return ResponseEntity.ok(movieService.addMovie(movie));
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    public ResponseEntity<MovieDTO> getMovieById(@PathVariable String id) {
        return ResponseEntity.ok(movieService.getMovieById(id));
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/{id}")
    @PreAuthorize("hasAnyAuthority('EMPLOYEE', 'ADMIN')")
    public ResponseEntity<MovieDTO> updateMovie(@PathVariable String id, @RequestBody MovieRequestDTO movie) {
        return ResponseEntity.ok(movieService.updateMovie(id, movie));
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
    @PreAuthorize("hasAnyAuthority('EMPLOYEE', 'ADMIN')")
    public ResponseEntity<Void> deleteMovie(@PathVariable String id) {
        movieService.deleteMovie(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/search/{keyword}")
    public ResponseEntity<List<MovieDTO>> searchMovies(@PathVariable String keyword) {
        return ResponseEntity.ok(movieService.searchMovies(keyword));
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/setAvailable/{id}")
    @PreAuthorize("hasAnyAuthority('EMPLOYEE', 'ADMIN')")
    public ResponseEntity<MovieDTO> setAvailable(@PathVariable String id) {
        return ResponseEntity.ok(movieService.setAvailable(id));
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/setUnavailable/{id}")
    @PreAuthorize("hasAnyAuthority('EMPLOYEE', 'ADMIN')")
    public ResponseEntity<MovieDTO> setUnavailable(@PathVariable String id) {
        return ResponseEntity.ok(movieService.setUnavailable(id));
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/discount/{id}/{discount}")
    @PreAuthorize("hasAnyAuthority('EMPLOYEE', 'ADMIN')")
    public ResponseEntity<MovieDTO> setPriceAndNotify(@PathVariable String id, @PathVariable double discount) {
        MovieDTO updatedMovie = movieService.setPriceAndNotify(id, discount);
        return new ResponseEntity<>(updatedMovie, HttpStatus.OK);
    }
}
