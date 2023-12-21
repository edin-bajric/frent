package ba.edu.ibu.frent.core.service;

import ba.edu.ibu.frent.core.api.mailsender.MailSender;
import ba.edu.ibu.frent.core.exceptions.auth.UserAlreadyExistsException;
import ba.edu.ibu.frent.core.exceptions.repository.ResourceNotFoundException;
import ba.edu.ibu.frent.core.model.User;
import ba.edu.ibu.frent.core.repository.UserRepository;
import ba.edu.ibu.frent.rest.dto.UserDTO;
import ba.edu.ibu.frent.rest.dto.UserRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;

import static java.util.stream.Collectors.toList;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    private MailSender mailgunSender;
    @Autowired
    private MailSender sendgridSender;
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDTO> getUsers() {
        List<User> users = userRepository.findAll();

        return users
                .stream()
                .map(UserDTO::new)
                .collect(toList());
    }

    public UserDTO getUserById(String id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            throw new ResourceNotFoundException("The user with the given ID does not exist.");
        }
        return new UserDTO(user.get());
    }

    public UserDTO addUser(UserRequestDTO payload) {

        if (userRepository.existsByEmail(payload.getEmail()) || userRepository.existsByUsername(payload.getUsername())) {
            throw new UserAlreadyExistsException("User already exists");
        }

        User user = userRepository.save(payload.toEntity());
        return new UserDTO(user);
    }

    public UserDTO updateUser(String id, UserRequestDTO payload) {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            throw new ResourceNotFoundException("The user with the given ID does not exist.");
        }
        User updatedUser = payload.toEntity();
        updatedUser.setId(user.get().getId());
        updatedUser = userRepository.save(updatedUser);
        return new UserDTO(updatedUser);
    }

    public void deleteUser(String id) {
        Optional<User> user = userRepository.findById(id);
        user.ifPresent(userRepository::delete);
    }

    public UserDTO filterByEmail(String email) {
        Optional<User> user = userRepository.findFirstByEmailLike(email);
        return user.map(UserDTO::new).orElse(null);
    }

    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) {
                return userRepository.findByUsernameOrEmail(username)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            }
        };
    }

    public UserDTO addToCart(String movieId, String username) {
        Optional<User> userOptional = userRepository.findByUsernameOrEmail(username);
        if (userOptional.isEmpty()) {
            throw new ResourceNotFoundException("The user with the given username does not exist.");
        }

        User user = userOptional.get();
        Set<String> cart = user.getCart();
        cart.add(movieId);
        user.setCart(cart);

        User updatedUser = userRepository.save(user);
        return new UserDTO(updatedUser);
    }

    public UserDTO addToWishlist(String movieId, String username) {
        Optional<User> userOptional = userRepository.findByUsernameOrEmail(username);
        if (userOptional.isEmpty()) {
            throw new ResourceNotFoundException("The user with the given username does not exist.");
        }

        User user = userOptional.get();
        Set<String> wishlist = user.getWishlist();
        wishlist.add(movieId);
        user.setWishlist(wishlist);

        User updatedUser = userRepository.save(user);
        return new UserDTO(updatedUser);
    }

    public UserDTO removeFromCart(String movieId, String username) {
        Optional<User> userOptional = userRepository.findByUsernameOrEmail(username);
        if (userOptional.isEmpty()) {
            throw new ResourceNotFoundException("The user with the given username does not exist.");
        }

        User user = userOptional.get();
        Set<String> cart = user.getCart();
        cart.remove(movieId);
        user.setCart(cart);

        User updatedUser = userRepository.save(user);
        return new UserDTO(updatedUser);
    }

    public UserDTO removeFromWishlist(String movieId, String username) {
        Optional<User> userOptional = userRepository.findByUsernameOrEmail(username);
        if (userOptional.isEmpty()) {
            throw new ResourceNotFoundException("The user with the given username does not exist.");
        }

        User user = userOptional.get();
        Set<String> wishlist = user.getWishlist();
        wishlist.remove(movieId);
        user.setWishlist(wishlist);

        User updatedUser = userRepository.save(user);
        return new UserDTO(updatedUser);
    }

    public Set<String> getCart(String username) {
        Optional<User> userOptional = userRepository.findByUsernameOrEmail(username);
        if (userOptional.isEmpty()) {
            throw new ResourceNotFoundException("The user with the given username does not exist.");
        }
        User user = userOptional.get();
        return user.getCart() != null ? new HashSet<>(user.getCart()) : new HashSet<>();
    }

    public Set<String> getWishlist(String username) {
        Optional<User> userOptional = userRepository.findByUsernameOrEmail(username);
        if (userOptional.isEmpty()) {
            throw new ResourceNotFoundException("The user with the given username does not exist.");
        }
        User user = userOptional.get();
        return user.getWishlist() != null ? new HashSet<>(user.getWishlist()) : new HashSet<>();
    }
}
