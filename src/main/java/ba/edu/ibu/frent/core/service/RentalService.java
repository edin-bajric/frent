package ba.edu.ibu.frent.core.service;

import ba.edu.ibu.frent.core.exceptions.repository.ResourceNotFoundException;
import ba.edu.ibu.frent.core.model.Movie;
import ba.edu.ibu.frent.core.model.Rental;
import ba.edu.ibu.frent.core.repository.MovieRepository;
import ba.edu.ibu.frent.core.repository.RentalRepository;
import ba.edu.ibu.frent.rest.dto.RentalDTO;
import ba.edu.ibu.frent.rest.dto.RentalRequestDTO;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@Service
public class RentalService {
    private final RentalRepository rentalRepository;
    private final MovieRepository movieRepository;
    private final MongoTemplate mongoTemplate;
    private final NotificationService notificationService;

    public RentalService(RentalRepository rentalRepository, MovieRepository movieRepository, MongoTemplate mongoTemplate, NotificationService notificationService) {
        this.rentalRepository = rentalRepository;
        this.movieRepository = movieRepository;
        this.mongoTemplate = mongoTemplate;
        this.notificationService = notificationService;
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

    public RentalDTO returnRental(String id) {
        Optional<Rental> rental = rentalRepository.findById(id);
        if (rental.isEmpty()) {
            throw new ResourceNotFoundException("The rental with the given ID does not exist.");
        }
        Query query = new Query(Criteria.where("_id").is(id));
        Update update = new Update()
                .set("returnDate", LocalDate.now())
                .set("returned", true);
        mongoTemplate.updateFirst(query, update, Rental.class);
        Optional<Rental> updatedRental = rentalRepository.findById(id);
        return updatedRental.map(RentalDTO::new).orElseThrow(() ->
                new ResourceNotFoundException("Unable to retrieve the updated rental.")
        );
    }

    public List<RentalDTO> getRentalsForUser(String username) {
        Query query = new Query(Criteria.where("username").is(username));
        List<Rental> rentals = mongoTemplate.find(query, Rental.class);

        return rentals
                .stream()
                .map(RentalDTO::new)
                .collect(toList());
    }

    public RentalDTO addRentalForUser(String username, RentalRequestDTO payload) {
        String movieId = payload.getMovieId();
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new ResourceNotFoundException("Movie with ID " + movieId + " not found."));
        if (!movie.isAvailable()) {
            throw new IllegalStateException("The movie is not available for rental.");
        }
        double rentalPrice = movie.getRentalPrice();
        payload.setRentalPrice(rentalPrice);
        payload.setUsername(username);
        Rental rental = rentalRepository.save(payload.toEntity());
        return new RentalDTO(rental);
    }

    public RentalDTO getRentalByIdForUser(String id, String username) {
        Query query = new Query(Criteria.where("_id").is(id).and("username").is(username));
        Rental rental = mongoTemplate.findOne(query, Rental.class);

        if (rental == null) {
            throw new ResourceNotFoundException("The rental with the given ID for the user does not exist.");
        }

        return new RentalDTO(rental);
    }

    public void deleteRentalForUser(String id, String username) {
        Query query = new Query(Criteria.where("_id").is(id).and("username").is(username));
        Rental rental = mongoTemplate.findOne(query, Rental.class);


        if (rental == null) {
            throw new ResourceNotFoundException("The rental with the given ID for the user does not exist.");
        }

        rentalRepository.delete(rental);
    }

    public void checkDueDatesAndSendWarnings() {
        List<Rental> overdueRentals = getOverdueRentals();
        for (Rental rental : overdueRentals) {
            String username = rental.getUsername();
            List<String> ids = new ArrayList<>();
            ids.add(rental.getMovieId());
            String warningMessage = "Your movie " + ids + " is overdue! Please return it.";
            notificationService.sendMessage(username, warningMessage);
        }
    }

    private List<Rental> getOverdueRentals() {
        LocalDate today = LocalDate.now();
        Query query = new Query(Criteria.where("returnDate").is(null).and("dueDate").lt(today));
        return mongoTemplate.find(query, Rental.class);
    }
}
