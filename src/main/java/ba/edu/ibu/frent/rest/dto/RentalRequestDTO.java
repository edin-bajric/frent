package ba.edu.ibu.frent.rest.dto;

import ba.edu.ibu.frent.core.model.Rental;

import java.time.LocalDate;

public class RentalRequestDTO {
    private String username;
    private String movieId;

    private double rentalPrice;
    public RentalRequestDTO() { }

    public RentalRequestDTO(Rental rental) {
        this.username = rental.getUsername();
        this.movieId = rental.getMovieId();
    }

    public Rental toEntity() {
        Rental rental = new Rental();
        rental.setUsername(username);
        rental.setMovieId(movieId);
        rental.setRentalDate(LocalDate.now());
        rental.setReturnDate(null);
        rental.setRentalPrice(rentalPrice);
        rental.setReturned(false);
        return rental;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMovieId() {
        return movieId;
    }

    public void setMovieId(String movieId) {
        this.movieId = movieId;
    }

    public double getRentalPrice() {
        return rentalPrice;
    }

    public void setRentalPrice(double rentalPrice) {
        this.rentalPrice = rentalPrice;
    }
}