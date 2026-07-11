package com.car_inventory.backend.dto;
import com.car_inventory.backend.entity.Category;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VehicleResponse {

    private Long id;

    private String make;

    private String model;

    private Category category;

    private BigDecimal price;

    private Integer quantity;
}
