package ba.edu.ibu.frent.api.impl.mailsender;

import ba.edu.ibu.frent.core.api.mailsender.MailSender;
import ba.edu.ibu.frent.core.model.User;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Component
public class MailgunSender implements MailSender {
    private final RestTemplate restTemplate;
    private final String fromEmail;

    public MailgunSender(RestTemplate restTemplate, String fromEmail) {
        this.restTemplate = restTemplate;
        this.fromEmail = fromEmail;
    }

    @Override
    public String send(List<User> users, String message, String subject) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("from", fromEmail);
        for (User user: users) {
            map.add("to", user.getEmail());
        }
        map.add("subject", subject);
        map.add("text", message);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);

        return restTemplate.postForEntity("/messages", request, String.class).getBody();
    }
}
