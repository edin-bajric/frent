package ba.edu.ibu.frent.rest.dto;

import ba.edu.ibu.frent.core.model.Rental;

import java.time.LocalDate;

public class RentalDTO {
    private String id;
    private String userId;
    private String movieId;
    private LocalDate rentalDate;
    private LocalDate returnDate;
    private double rentalPrice;
    private boolean returned;

    public RentalDTO() {
    }

    public RentalDTO(Rental rental) {
        this.id = rental.getId();
        this.userId = rental.getUserId();
        this.movieId = rental.getMovieId();
        this.rentalDate = rental.getRentalDate();
        this.returnDate = rental.getReturnDate();
        this.rentalPrice = rental.getRentalPrice();
        this.returned = rental.isReturned();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public LocalDate getRentalDate() {
        return rentalDate;
    }

    public void setRentalDate(LocalDate rentalDate) {
        this.rentalDate = rentalDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }

    public double getRentalPrice() {
        return rentalPrice;
    }

    public void setRentalPrice(double rentalPrice) {
        this.rentalPrice = rentalPrice;
    }

    public boolean isReturned() {
        return returned;
    }

    public void setReturned(boolean returned) {
        this.returned = returned;
    }
}
