package ba.edu.ibu.frent.core.repository;

import ba.edu.ibu.frent.core.model.User;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

@Repository
public class UserRepository {

    private List<User> users;

    public UserRepository() {
        this.users = Arrays.asList(
                new User(1, "Edin", "Bajrić", "edin.bajric@stu.ibu.edu.ba"),
                new User(2, "Amar", "Hodžić", "edin.bajric4321@gmail.com")
        );
    }
    public List<User> findAll() {
        return users;
    }

    public User findById(int id) {
        return users.stream().filter(user -> user.getId() == id).findFirst().orElse(null);
    }
}
