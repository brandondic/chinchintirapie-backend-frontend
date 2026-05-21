package com.bootcamp.chinchintirapie;

import com.bootcamp.chinchintirapie.auth.dto.AuthRequestDto;
import com.bootcamp.chinchintirapie.contacto.dto.ContactoRequestDto;
import com.bootcamp.chinchintirapie.user.model.Role;
import com.bootcamp.chinchintirapie.user.model.UserEntity;
import com.bootcamp.chinchintirapie.user.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class BackendTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    void testContactoEndpointCreatesContact() throws Exception {
        ContactoRequestDto request = new ContactoRequestDto(
                "Prueba Contacto",
                "test3@test.com",
                "+56912345678",
                "Consulta workflow",
                "Este es un mensaje de prueba"
        );

        mockMvc.perform(post("/api/contacto")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.email").value("test3@test.com"))
                .andExpect(jsonPath("$.asunto").value("Consulta workflow"));
    }

    @Test
    void testAuthLoginWithRegisteredUser() throws Exception {
        String email = "test3@test.com";
        String rawPassword = "test 1234";

        UserEntity user = UserEntity.builder()
                .fullName("Usuario Test")
                .email(email)
                .password(passwordEncoder.encode(rawPassword))
                .role(Role.CLIENT)
                .enabled(true)
                .build();

        userRepository.save(user);

        AuthRequestDto loginRequest = new AuthRequestDto(email, rawPassword);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Login exitoso"))
                .andExpect(jsonPath("$.token").isString())
                .andExpect(jsonPath("$.email").value(email));
    }
}
