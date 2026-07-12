package com.car_inventory.backend.service;

import com.car_inventory.backend.dto.AuthResponse;
import com.car_inventory.backend.dto.LoginRequest;
import com.car_inventory.backend.dto.RegisterRequest;
import com.car_inventory.backend.entity.Role;
import com.car_inventory.backend.entity.User;
import com.car_inventory.backend.repository.UserRepository;
import com.car_inventory.backend.security.JwtService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.junit.jupiter.api.BeforeEach;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthService authService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        authService = new AuthService(userRepository, passwordEncoder, jwtService);
    }

    @Test
    public void shouldRegisterUser() {

        RegisterRequest request = new RegisterRequest();
        request.setName("Eva");
        request.setEmail("eva@gmail.com");
        request.setPassword("password123");

        when(userRepository.existsByEmail(request.getEmail()))
                .thenReturn(false);

        when(passwordEncoder.encode("password123"))
                .thenReturn("encodedPassword");

        when(jwtService.generateToken(anyString(), any()))
                .thenReturn("dummy-token");

        when(userRepository.save(any(User.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        AuthResponse savedUser = authService.register(request);

        assertNotNull(savedUser);
        assertEquals("Eva", savedUser.getName());
        assertEquals("eva@gmail.com", savedUser.getEmail());
        assertEquals(Role.USER, savedUser.getRole());
    }

    @Test
    void shouldThrowExceptionWhenEmailAlreadyExists() {

        RegisterRequest request = new RegisterRequest();
        request.setName("Eva");
        request.setEmail("eva@gmail.com");
        request.setPassword("password123");

        when(userRepository.existsByEmail(request.getEmail()))
                .thenReturn(true);

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> authService.register(request)
        );

        assertEquals("Email already exists", exception.getMessage());

        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void shouldEncodePasswordBeforeSaving() {

        RegisterRequest request = new RegisterRequest();
        request.setName("Eva");
        request.setEmail("eva@gmail.com");
        request.setPassword("password123");

        when(userRepository.existsByEmail(request.getEmail()))
                .thenReturn(false);

        when(passwordEncoder.encode("password123"))
                .thenReturn("encodedPassword");

        when(jwtService.generateToken(anyString(), any()))
                .thenReturn("dummy-token");

        when(userRepository.save(any(User.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        authService.register(request);

        verify(passwordEncoder).encode("password123");

        verify(userRepository).save(argThat(user ->
                user.getPassword().equals("encodedPassword")
        ));
    }

    @Test
    void shouldLoginSuccessfully() {

        User user = User.builder()
                .name("Eva")
                .email("eva@gmail.com")
                .password("encodedPassword")
                .role(Role.USER)
                .build();

        LoginRequest request = new LoginRequest();
        request.setEmail("eva@gmail.com");
        request.setPassword("password123");

        when(userRepository.findByEmail("eva@gmail.com"))
                .thenReturn(Optional.of(user));

        when(passwordEncoder.matches("password123", "encodedPassword"))
                .thenReturn(true);

        when(jwtService.generateToken(anyString(), any()))
                .thenReturn("dummy-token");

        AuthResponse loggedInUser = authService.login(request);

        assertNotNull(loggedInUser);
        assertEquals("eva@gmail.com", loggedInUser.getEmail());
    }

    @Test
    void shouldThrowExceptionWhenEmailDoesNotExist() {

        LoginRequest request = new LoginRequest();
        request.setEmail("abc@gmail.com");
        request.setPassword("password123");

        when(userRepository.findByEmail("abc@gmail.com"))
                .thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> authService.login(request)
        );

        assertEquals("Invalid email or password", exception.getMessage());
    }

    @Test
    void shouldThrowExceptionWhenPasswordIsIncorrect() {

        User user = User.builder()
                .email("eva@gmail.com")
                .password("encodedPassword")
                .role(Role.USER)
                .build();

        LoginRequest request = new LoginRequest();
        request.setEmail("eva@gmail.com");
        request.setPassword("wrongPassword");

        when(userRepository.findByEmail("eva@gmail.com"))
                .thenReturn(Optional.of(user));

        when(passwordEncoder.matches("wrongPassword", "encodedPassword"))
                .thenReturn(false);

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> authService.login(request)
        );

        assertEquals("Invalid email or password", exception.getMessage());
    }
}
