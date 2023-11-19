package ba.edu.ibu.frent.core.repository;

import ba.edu.ibu.frent.core.model.Rental;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class RentalRepositoryTest {

    @Autowired
    private RentalRepository rentalRepository;

    @Test
    public void shouldReturnAllRentals() {
        List<Rental> rentals = rentalRepository.findAll();

        assertEquals(1, rentals.size());
        assertEquals("username", rentals.get(0).getUsername());
    }

    @Test
    public void shouldFindRentalById() {
        Optional<Rental> rental = rentalRepository.findById("6557eec58febc00c05b2382e");
        assertNotNull(rental.orElse(null));
    }
}