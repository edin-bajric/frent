package ba.edu.ibu.frent.rest.dto;

import ba.edu.ibu.frent.core.model.Rental;

import java.time.LocalDate;

public class RentalRequestDTO {
    private String userId;
    private String movieId;
    private double rentalPrice;

    public RentalRequestDTO() { }

    public RentalRequestDTO(Rental rental) {
        this.userId = rental.getUserId();
        this.movieId = rental.getMovieId();
        this.rentalPrice = rental.getRentalPrice();
    }

    public Rental toEntity() {
        Rental rental = new Rental();
        rental.setUserId(userId);
        rental.setMovieId(movieId);
        rental.setRentalDate(LocalDate.now());
        rental.setReturnDate(null);
        rental.setRentalPrice(rentalPrice);
        rental.setReturned(false);
        return rental;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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
