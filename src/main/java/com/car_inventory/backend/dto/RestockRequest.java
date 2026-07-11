package com.car_inventory.backend.dto;

import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RestockRequest {

    @Min(1)
    private Integer quantity;
}