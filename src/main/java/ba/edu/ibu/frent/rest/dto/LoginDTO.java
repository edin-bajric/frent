package ba.edu.ibu.frent.rest.dto;

public class LoginDTO {
    private String jwt;

    public LoginDTO(String jwt) {
        this.jwt = jwt;
    }
}
