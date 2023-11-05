package ba.edu.ibu.frent.rest.dto;

import ba.edu.ibu.frent.core.model.Movie;
import ba.edu.ibu.frent.core.model.enums.Genre;

import java.util.List;

public class MovieRequestDTO {
    private String title;
    private String director;
    private List<Genre> genre;
    private int year;
    private boolean available;
    private double rentalPrice;

    public MovieRequestDTO() { };

    public MovieRequestDTO(Movie movie) {
        this.title = movie.getTitle();
        this.director = movie.getDirector();
        this.genre = movie.getGenre();
        this.year = movie.getYear();
        this.available = movie.isAvailable();
        this.rentalPrice = movie.getRentalPrice();
    }

    public Movie toEntity() {
        Movie movie = new Movie();
        movie.setTitle(title);
        movie.setDirector(director);
        movie.setGenre(genre);
        movie.setYear(year);
        movie.setAvailable(available);
        movie.setRentalPrice(rentalPrice);
        return movie;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public List<Genre> getGenre() {
        return genre;
    }

    public void setGenre(List<Genre> genre) {
        this.genre = genre;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public double getRentalPrice() {
        return rentalPrice;
    }

    public void setRentalPrice(double rentalPrice) {
        this.rentalPrice = rentalPrice;
    }
}
