package ba.edu.ibu.frent.rest.dto;

import ba.edu.ibu.frent.core.model.Rental;

import java.util.Date;

public class RentalRequestDTO {
    private String userId;
    private String movieId;
    private Date rentalDate;
    private Date returnDate;
    private double rentalPrice;

    public RentalRequestDTO() { }

    public RentalRequestDTO(Rental rental) {
        this.userId = rental.getUserId();
        this.movieId = rental.getMovieId();
        this.rentalDate = rental.getRentalDate();
        this.returnDate = rental.getReturnDate();
        this.rentalPrice = rental.getRentalPrice();
    }

    public Rental toEntity() {
        Rental rental = new Rental();
        rental.setUserId(userId);
        rental.setMovieId(movieId);
        rental.setRentalDate(rentalDate);
        rental.setReturnDate(returnDate);
        rental.setRentalPrice(rentalPrice);
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

    public Date getRentalDate() {
        return rentalDate;
    }

    public void setRentalDate(Date rentalDate) {
        this.rentalDate = rentalDate;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Date returnDate) {
        this.returnDate = returnDate;
    }

    public double getRentalPrice() {
        return rentalPrice;
    }

    public void setRentalPrice(double rentalPrice) {
        this.rentalPrice = rentalPrice;
    }
}
