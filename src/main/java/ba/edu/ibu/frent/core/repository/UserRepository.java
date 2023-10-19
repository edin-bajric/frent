package ba.edu.ibu.frent.core.repository;

import ba.edu.ibu.frent.core.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

}
