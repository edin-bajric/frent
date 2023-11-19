package ba.edu.ibu.frent.rest.controllers;

import ba.edu.ibu.frent.core.service.UserService;
import ba.edu.ibu.frent.rest.dto.UserDTO;
import ba.edu.ibu.frent.rest.dto.UserRequestDTO;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("api/users")
@SecurityRequirement(name = "JWT Security")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/")
    @PreAuthorize("hasAnyAuthority('EMPLOYEE', 'ADMIN')")
    public ResponseEntity<List<UserDTO>> getUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }

    @RequestMapping(method = RequestMethod.POST, path = "/register")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<UserDTO> register(@RequestBody UserRequestDTO user) {
        return ResponseEntity.ok(userService.addUser(user));
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    @PreAuthorize("hasAnyAuthority('EMPLOYEE', 'ADMIN')")
    public ResponseEntity<UserDTO> getUserById(@PathVariable String id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<UserDTO> updateUser(@PathVariable String id, @RequestBody UserRequestDTO user) {
        return ResponseEntity.ok(userService.updateUser(id, user));
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/filter")
    @PreAuthorize("hasAnyAuthority('EMPLOYEE', 'ADMIN')")
    public ResponseEntity<UserDTO> filterUser(@RequestParam String email) {
        return ResponseEntity.ok(userService.filterByEmail(email));
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/addToCart/{movieId}")
    @PreAuthorize("hasAnyAuthority('MEMBER', 'ADMIN')")
    public ResponseEntity<UserDTO> addToCart(@PathVariable String movieId, Principal principal) {
        String username = principal.getName();
        UserDTO updatedUser = userService.addToCart(movieId, username);
        return ResponseEntity.ok(updatedUser);
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/addToWishlist/{movieId}")
    @PreAuthorize("hasAnyAuthority('MEMBER', 'ADMIN')")
    public ResponseEntity<UserDTO> addToWishlist(@PathVariable String movieId, Principal principal) {
        String username = principal.getName();
        UserDTO updatedUser = userService.addToWishlist(movieId, username);
        return ResponseEntity.ok(updatedUser);
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/removeFromCart/{movieId}")
    @PreAuthorize("hasAnyAuthority('MEMBER', 'ADMIN')")
    public ResponseEntity<UserDTO> removeFromCart(@PathVariable String movieId, Principal principal) {
        String username = principal.getName();
        UserDTO updatedUser = userService.removeFromCart(movieId, username);
        return ResponseEntity.ok(updatedUser);
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/removeFromWishlist/{movieId}")
    @PreAuthorize("hasAnyAuthority('MEMBER', 'ADMIN')")
    public ResponseEntity<UserDTO> removeFromWishlist(@PathVariable String movieId, Principal principal) {
        String username = principal.getName();
        UserDTO updatedUser = userService.removeFromWishlist(movieId, username);
        return ResponseEntity.ok(updatedUser);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/cart")
    @PreAuthorize("hasAnyAuthority('MEMBER', 'ADMIN')")
    public ResponseEntity<List<String>> getCart(Principal principal) {
        String username = principal.getName();
        List<String> cart = userService.getCart(username);
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/wishlist")
    @PreAuthorize("hasAnyAuthority('MEMBER', 'ADMIN')")
    public ResponseEntity<List<String>> getWishlist(Principal principal) {
        String username = principal.getName();
        List<String> wishlist = userService.getWishlist(username);
        return new ResponseEntity<>(wishlist, HttpStatus.OK);
    }
 }
