package com.car_inventory.backend.dto;

import com.car_inventory.backend.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class AuthResponse {

    private Long id;
    private String name;
    private String email;
    private Role role;
}