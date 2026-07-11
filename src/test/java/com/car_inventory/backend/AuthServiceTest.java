package com.car_inventory.backend;

import com.car_inventory.backend.entity.Role;
import com.car_inventory.backend.entity.User;
import com.car_inventory.backend.repository.UserRepository;
import com.car_inventory.backend.service.AuthService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AuthService authService;

    @Test
    void shouldRegisterUser() {

        User user = User.builder()
                .name("Eva")
                .email("eva@gmail.com")
                .password("password123")
                .role(Role.USER)
                .build();

        User savedUser = authService.register(user);

        assertNotNull(savedUser);
        assertEquals("Eva", savedUser.getName());
        assertEquals("eva@gmail.com", savedUser.getEmail());
        assertEquals(Role.USER, savedUser.getRole());
    }
}
