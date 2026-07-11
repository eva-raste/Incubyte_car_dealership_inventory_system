package com.car_inventory.backend.service;

import com.car_inventory.backend.entity.Role;
import com.car_inventory.backend.entity.User;
import com.car_inventory.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;

    public User register(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        user.setRole(Role.USER);

        return userRepository.save(user);
    }
}
