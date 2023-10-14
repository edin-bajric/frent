package ba.edu.ibu.frent.core.service;

import ba.edu.ibu.frent.core.model.User;
import ba.edu.ibu.frent.core.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
