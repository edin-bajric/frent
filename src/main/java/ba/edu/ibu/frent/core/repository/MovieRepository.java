package ba.edu.ibu.frent.core.repository;

import ba.edu.ibu.frent.core.model.Movie;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

@Repository
public interface MovieRepository extends MongoRepository<Movie, String> {
    List<Movie> findByTitleContainingIgnoreCaseOrDirectorContainingIgnoreCase(String titleKeyword, String directorKeyword);
}
