package ba.edu.ibu.frent.rest.controllers;

import ba.edu.ibu.frent.core.service.JwtService;
import ba.edu.ibu.frent.core.service.MovieService;
import ba.edu.ibu.frent.core.service.UserService;
import ba.edu.ibu.frent.rest.configuration.SecurityConfiguration;
import com.jayway.jsonpath.JsonPath;
import ba.edu.ibu.frent.rest.dto.MovieDTO;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@AutoConfigureMockMvc
@WebMvcTest(MovieController.class)
@Import(SecurityConfiguration.class)
class MovieControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    MovieService movieService;

    @MockBean
    JwtService jwtService;

    @MockBean
    UserService userService;

    @MockBean
    AuthenticationProvider authenticationProvider;

    @Test
    void shouldReturnAllMovies() throws Exception {
        MovieDTO movie = new MovieDTO();
        movie.setId("id");
        movie.setTitle("Title");
        movie.setDirector("Director");
        movie.setYear(2023);
        int page = 1;
        int size = 10;

        Mockito.when(movieService.getMovies(page, size)).thenReturn(List.of(movie));

        MvcResult result = mockMvc.perform(
                MockMvcRequestBuilders
                        .get("/api/movies/")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andReturn();

        String response = result.getResponse().getContentAsString();
        assertEquals(1, (Integer) JsonPath.read(response, "$.length()"));
        assertEquals("Title", JsonPath.read(response, "$.[0].title"));

    }
}