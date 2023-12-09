package ba.edu.ibu.frent.core.service;

import ba.edu.ibu.frent.rest.websockets.MainSocketHandler;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class NotificationService {
    private final MainSocketHandler mainSocketHandler;

    public NotificationService(MainSocketHandler mainSocketHandler) {
        this.mainSocketHandler = mainSocketHandler;
    }

    public void broadcastMessage(String message) throws IOException {
        mainSocketHandler.broadcastMessage(message);
    }

    public void sendMessage(String userName, String message) {
        mainSocketHandler.sendMessage(userName, message);
    }
}
