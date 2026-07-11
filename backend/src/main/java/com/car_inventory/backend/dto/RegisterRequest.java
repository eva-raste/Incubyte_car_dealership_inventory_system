package com.car_inventory.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
    private String name;

    private String email;

    private String password;
}
