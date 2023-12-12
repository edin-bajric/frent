package ba.edu.ibu.frent.core.repository;

import ba.edu.ibu.frent.core.model.Rental;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RentalRepository extends MongoRepository<Rental, String> {

    boolean existsByMovieIdAndUsernameAndReturnDateIsNull(String movieId, String username);
}
