package ba.edu.ibu.frent.rest.controllers;

import ba.edu.ibu.frent.core.service.RentalService;
import ba.edu.ibu.frent.rest.dto.RentalDTO;
import ba.edu.ibu.frent.rest.dto.RentalRequestDTO;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("api/rentals")
@SecurityRequirement(name = "JWT Security")
public class RentalController {
    private final RentalService rentalService;

    public RentalController(RentalService rentalService) {
        this.rentalService = rentalService;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/")
    @PreAuthorize("hasAnyAuthority('EMPLOYEE', 'ADMIN')")
    public ResponseEntity<List<RentalDTO>> getRentals() {
        return ResponseEntity.ok(rentalService.getRentals());
    }

    @RequestMapping(method = RequestMethod.POST, path = "/add")
    @PreAuthorize("hasAnyAuthority('EMPLOYEE', 'ADMIN')")
    public ResponseEntity<RentalDTO> add(@RequestBody RentalRequestDTO rental) {
        return ResponseEntity.ok(rentalService.addRental(rental));
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    @PreAuthorize("hasAnyAuthority('EMPLOYEE', 'ADMIN')")
    public ResponseEntity<RentalDTO> getRentalById(@PathVariable String id) {
        return ResponseEntity.ok(rentalService.getRentalById(id));
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/{id}")
    @PreAuthorize("hasAnyAuthority('EMPLOYEE', 'ADMIN')")
    public ResponseEntity<RentalDTO> updateRental(@PathVariable String id, @RequestBody RentalRequestDTO rental) {
        return ResponseEntity.ok(rentalService.updateRental(id, rental));
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
    @PreAuthorize("hasAnyAuthority('EMPLOYEE', 'ADMIN')")
    public ResponseEntity<Void> deleteRental(@PathVariable String id) {
        rentalService.deleteRental(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/return/{id}")
    @PreAuthorize("hasAnyAuthority('MEMBER', 'EMPLOYEE', 'ADMIN')")
    public ResponseEntity<RentalDTO> returnRental(@PathVariable String id) {
        RentalDTO updatedRental = rentalService.returnRental(id);
        return ResponseEntity.ok(updatedRental);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getForUser")
    @PreAuthorize("hasAnyAuthority('MEMBER', 'EMPLOYEE', 'ADMIN')")
    public ResponseEntity<List<RentalDTO>> getRentalsForUser(Principal principal) {
        String username = principal.getName();
        List<RentalDTO> rentalIds = rentalService.getRentalsForUser(username);
        return ResponseEntity.ok(rentalIds);
    }

    @RequestMapping(method = RequestMethod.POST, path = "/addForUser/{movieId}")
    @PreAuthorize("hasAnyAuthority('MEMBER', 'EMPLOYEE', 'ADMIN')")
    public ResponseEntity<RentalDTO> addForUser(@PathVariable String movieId, @RequestBody RentalRequestDTO rental, Principal principal) {
        String username = principal.getName();
        return ResponseEntity.ok(rentalService.addRentalForUser(username, movieId, rental));
    }

    @RequestMapping(method = RequestMethod.GET, path = "/getForUser/{id}")
    @PreAuthorize("hasAnyAuthority('MEMBER', 'EMPLOYEE', 'ADMIN')")
    public ResponseEntity<RentalDTO> getRentalByIdForUser(@PathVariable String id, Principal principal) {
        String username = principal.getName();
        return ResponseEntity.ok(rentalService.getRentalByIdForUser(id, username));
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/deleteForUser/{id}")
    @PreAuthorize("hasAnyAuthority('MEMBER', 'EMPLOYEE', 'ADMIN')")
    public ResponseEntity<Void> deleteRentalForUser(@PathVariable String id, Principal principal) {
        String username = principal.getName();
        rentalService.deleteRentalForUser(id, username);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(method = RequestMethod.POST, path = "/sendDueDateWarnings")
    @PreAuthorize("hasAnyAuthority('EMPLOYEE', 'ADMIN')")
    public ResponseEntity<Void> sendDueDateWarnings() {
        rentalService.checkDueDatesAndSendWarnings();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
