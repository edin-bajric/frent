package ba.edu.ibu.frent.core.exceptions.repository;

import ba.edu.ibu.frent.core.exceptions.GeneralException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class ResourceAlreadyExistsException extends GeneralException {
    public ResourceAlreadyExistsException(String message) {
        super(HttpStatus.NOT_FOUND.value(), message);
    }

    public ResourceAlreadyExistsException() {
        super(HttpStatus.NOT_FOUND.value());
    }
}
