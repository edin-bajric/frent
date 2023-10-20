package ba.edu.ibu.frent.core.service;

import ba.edu.ibu.frent.core.exceptions.repository.ResourceNotFoundException;
import ba.edu.ibu.frent.core.model.Rental;
import ba.edu.ibu.frent.core.repository.RentalRepository;
import ba.edu.ibu.frent.rest.dto.RentalDTO;
import ba.edu.ibu.frent.rest.dto.RentalRequestDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@Service
public class RentalService {
    private final RentalRepository rentalRepository;

    public RentalService(RentalRepository rentalRepository) {
        this.rentalRepository = rentalRepository;
    }

    public List<RentalDTO> getRentals() {
        List<Rental> rentals = rentalRepository.findAll();

        return rentals
                .stream()
                .map(RentalDTO::new)
                .collect(toList());
    }

    public RentalDTO getRentalById(String id) {
        Optional<Rental> rental = rentalRepository.findById(id);
        if (rental.isEmpty()) {
            throw new ResourceNotFoundException("The rental with the given ID does not exist.");
        }
        return new RentalDTO(rental.get());
    }

    public RentalDTO addRental(RentalRequestDTO payload) {
        Rental rental = rentalRepository.save(payload.toEntity());
        return new RentalDTO(rental);
    }

    public RentalDTO updateRental(String id, RentalRequestDTO payload) {
        Optional<Rental> rental = rentalRepository.findById(id);
        if (rental.isEmpty()) {
            throw new ResourceNotFoundException("The rental with the given ID does not exist.");
        }
        Rental updatedRental = payload.toEntity();
        updatedRental.setId(rental.get().getId());
        updatedRental = rentalRepository.save(updatedRental);
        return new RentalDTO(updatedRental);
    }

    public void deleteRental(String id) {
        Optional<Rental> rental = rentalRepository.findById(id);
        rental.ifPresent(rentalRepository::delete);
    }
}
