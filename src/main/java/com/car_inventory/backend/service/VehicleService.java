package com.car_inventory.backend.service;

import com.car_inventory.backend.dto.RestockRequest;
import com.car_inventory.backend.dto.VehicleRequest;
import com.car_inventory.backend.dto.VehicleResponse;
import com.car_inventory.backend.entity.Category;
import com.car_inventory.backend.entity.Vehicle;
import com.car_inventory.backend.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleService {
    private final VehicleRepository vehicleRepository;

    public VehicleResponse addVehicle(VehicleRequest request) {

        Vehicle vehicle = Vehicle.builder()
                .make(request.getMake())
                .model(request.getModel())
                .category(request.getCategory())
                .price(request.getPrice())
                .quantity(request.getQuantity())
                .build();

        Vehicle savedVehicle = vehicleRepository.save(vehicle);

        return mapToResponse(savedVehicle);
    }

    public List<VehicleResponse> getAllVehicles() {

        List<Vehicle> vehicles = vehicleRepository.findAll();

        return vehicles.stream()
                .map(this::mapToResponse)
                .toList();
    }

    public VehicleResponse updateVehicle(Long id, VehicleRequest request) {

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        vehicle.setMake(request.getMake());
        vehicle.setModel(request.getModel());
        vehicle.setCategory(request.getCategory());
        vehicle.setPrice(request.getPrice());
        vehicle.setQuantity(request.getQuantity());

        Vehicle updatedVehicle = vehicleRepository.save(vehicle);

        return mapToResponse(updatedVehicle);
    }

    public void deleteVehicle(Long id) {

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        vehicleRepository.delete(vehicle);
    }

    public List<VehicleResponse> searchVehicles(String make,
                                                String model,
                                                Category category,
                                                BigDecimal minPrice,
                                                BigDecimal maxPrice) {

        List<Vehicle> vehicles;

        if (make != null) {
            vehicles = vehicleRepository.findByMakeContainingIgnoreCase(make);
        } else if (model != null) {
            vehicles = vehicleRepository.findByModelContainingIgnoreCase(model);
        } else if (category != null) {
            vehicles = vehicleRepository.findByCategory(category);
        } else if (minPrice != null && maxPrice != null) {
            vehicles = vehicleRepository.findByPriceBetween(minPrice, maxPrice);
        } else {
            vehicles = vehicleRepository.findAll();
        }

        return vehicles.stream()
                .map(this::mapToResponse)
                .toList();
    }

    public VehicleResponse purchaseVehicle(Long id) {

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Vehicle not found"));

        if (vehicle.getQuantity() == 0) {
            throw new RuntimeException("Vehicle is out of stock");
        }

        vehicle.setQuantity(vehicle.getQuantity() - 1);

        Vehicle updatedVehicle = vehicleRepository.save(vehicle);

        return mapToResponse(updatedVehicle);
    }

    public VehicleResponse restockVehicle(
            Long id,
            RestockRequest request) {

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Vehicle not found"));

        vehicle.setQuantity(
                vehicle.getQuantity() + request.getQuantity());

        Vehicle updatedVehicle = vehicleRepository.save(vehicle);

        return mapToResponse(updatedVehicle);
    }
    
    private VehicleResponse mapToResponse(Vehicle vehicle) {

        return VehicleResponse.builder()
                .id(vehicle.getId())
                .make(vehicle.getMake())
                .model(vehicle.getModel())
                .category(vehicle.getCategory())
                .price(vehicle.getPrice())
                .quantity(vehicle.getQuantity())
                .build();
    }
}
