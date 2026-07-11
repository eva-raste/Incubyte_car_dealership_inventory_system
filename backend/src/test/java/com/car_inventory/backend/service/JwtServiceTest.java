package com.car_inventory.backend.service;

import com.car_inventory.backend.entity.Role;
import com.car_inventory.backend.security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class JwtServiceTest {

    private JwtService jwtService;

    @BeforeEach
    void setup() {

        jwtService = new JwtService();

        ReflectionTestUtils.setField(
                jwtService,
                "secret",
                "MzIxNjU0OTg3MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTA="
        );

        ReflectionTestUtils.setField(
                jwtService,
                "expiration",
                86400000L
        );
    }

    @Test
    void shouldGenerateTokenContainingUsername() {

        String token = jwtService.generateToken("eva@gmail.com", Role.USER);

        String username = jwtService.extractUsername(token);

        assertEquals("eva@gmail.com", username);
    }

    @Test
    void shouldContainRoleClaim() {

        String token = jwtService.generateToken(
                "eva@gmail.com",
                Role.ADMIN
        );

        String role = jwtService.extractRole(token);

        assertEquals("ADMIN", role);
    }

    @Test
    void shouldValidateToken() {

        String token =
                jwtService.generateToken(
                        "eva@gmail.com",
                        Role.USER);

        assertTrue(
                jwtService.isTokenValid(
                        token,
                        "eva@gmail.com"
                )
        );
    }
}
