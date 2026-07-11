package com.car_inventory.backend.dto;

import com.car_inventory.backend.entity.Category;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class VehicleRequest {

    @NotBlank
    private String make;

    @NotBlank
    private String model;

    @NotNull
    private Category category;

    @NotNull
    @DecimalMin("0.1")
    private BigDecimal price;

    @NotNull
    @Min(0)
    private Integer quantity;
}