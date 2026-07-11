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
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AuthService authService;

    @Mock
    private PasswordEncoder passwordEncoder;
    @Test
    void shouldRegisterUser() {

        User user = User.builder()
                .name("Eva")
                .email("eva@gmail.com")
                .password("password123")
                .role(Role.USER)
                .build();
        when(userRepository.save(any(User.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));
        User savedUser = authService.register(user);

        assertNotNull(savedUser);
        assertEquals("Eva", savedUser.getName());
        assertEquals("eva@gmail.com", savedUser.getEmail());
        assertEquals(Role.USER, savedUser.getRole());
    }

    @Test
    void shouldThrowExceptionWhenEmailAlreadyExists() {

        User user = User.builder()
                .name("Eva")
                .email("eva@gmail.com")
                .password("password123")
                .role(Role.USER)
                .build();

        when(userRepository.existsByEmail(user.getEmail())).thenReturn(true);

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            authService.register(user);
        });

        assertEquals("Email already exists", exception.getMessage());

        verify(userRepository, never()).save(any(User.class));
    }
    
    @Test
    void shouldEncodePasswordBeforeSaving() {

        User user = User.builder()
                .name("Eva")
                .email("eva@gmail.com")
                .password("password123")
                .build();

        when(userRepository.existsByEmail(user.getEmail())).thenReturn(false);

        when(passwordEncoder.encode("password123"))
                .thenReturn("encodedPassword");

        when(userRepository.save(any(User.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        User savedUser = authService.register(user);

        assertEquals("encodedPassword", savedUser.getPassword());

        verify(passwordEncoder).encode("password123");
    }
}
