package com.car_inventory.backend.repository;

import com.car_inventory.backend.entity.Category;
import com.car_inventory.backend.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.math.BigDecimal;
import java.util.List;

public interface VehicleRepository extends
        JpaRepository<Vehicle, Long>{
    List<Vehicle> findByMakeContainingIgnoreCase(String make);

    List<Vehicle> findByModelContainingIgnoreCase(String model);

    List<Vehicle> findByCategory(Category category);

    List<Vehicle> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);
}
