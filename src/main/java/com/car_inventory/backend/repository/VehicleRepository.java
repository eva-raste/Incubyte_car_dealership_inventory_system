package com.car_inventory.backend.repository;

import com.car_inventory.backend.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface VehicleRepository extends
        JpaRepository<Vehicle, Long>,
        JpaSpecificationExecutor<Vehicle> {
}
