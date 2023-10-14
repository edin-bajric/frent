package ba.edu.ibu.frent.rest.controllers;

import ba.edu.ibu.frent.core.model.Movie;
import ba.edu.ibu.frent.core.model.User;
import ba.edu.ibu.frent.core.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/send-to-all")
    public String sendEmailToAllUsers(@RequestParam String message) {
        return userService.sendEmailToAllUsers(message);
    }

    @GetMapping public List<User> findAll() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public User findById(@PathVariable int id) {
        return userService.findById(id);
    }
}
