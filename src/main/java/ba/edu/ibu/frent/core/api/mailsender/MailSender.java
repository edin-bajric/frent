package ba.edu.ibu.frent.core.api.mailsender;

import ba.edu.ibu.frent.core.model.User;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface MailSender {
    public String send(List<User> users, String message, String subject);
}
