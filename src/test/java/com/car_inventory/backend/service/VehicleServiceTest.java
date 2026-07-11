package com.car_inventory.backend.service;

import com.car_inventory.backend.dto.VehicleRequest;
import com.car_inventory.backend.dto.VehicleResponse;
import com.car_inventory.backend.entity.Category;
import com.car_inventory.backend.entity.Vehicle;
import com.car_inventory.backend.repository.VehicleRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class VehicleServiceTest {

    @Mock
    private VehicleRepository vehicleRepository;

    @InjectMocks
    private VehicleService vehicleService;

    @Test
    void shouldAddVehicle() {

        VehicleRequest request = new VehicleRequest();
        request.setMake("Toyota");
        request.setModel("Fortuner");
        request.setCategory(Category.SUV);
        request.setPrice(BigDecimal.valueOf(4500000));
        request.setQuantity(10);

        when(vehicleRepository.save(any(Vehicle.class)))
                .thenAnswer(invocation -> {
                    Vehicle vehicle = invocation.getArgument(0);
                    vehicle.setId(1L);
                    return vehicle;
                });

        VehicleResponse response = vehicleService.addVehicle(request);

        assertNotNull(response);
        assertEquals("Toyota", response.getMake());
        assertEquals("Fortuner", response.getModel());

        verify(vehicleRepository).save(any(Vehicle.class));
    }

    @Test
    void shouldReturnAllVehicles() {

        Vehicle vehicle = Vehicle.builder()
                .id(1L)
                .make("Toyota")
                .model("Fortuner")
                .category(Category.SUV)
                .price(BigDecimal.valueOf(4500000))
                .quantity(10)
                .build();

        when(vehicleRepository.findAll())
                .thenReturn(List.of(vehicle));

        List<VehicleResponse> response =
                vehicleService.getAllVehicles();

        assertEquals(1, response.size());
        assertEquals("Toyota", response.get(0).getMake());
    }

    @Test
    void shouldUpdateVehicle() {

        Vehicle vehicle = Vehicle.builder()
                .id(1L)
                .make("Toyota")
                .model("Fortuner")
                .category(Category.SUV)
                .price(BigDecimal.valueOf(4500000))
                .quantity(10)
                .build();

        VehicleRequest request = new VehicleRequest();
        request.setMake("BMW");
        request.setModel("X5");
        request.setCategory(Category.SUV);
        request.setPrice(BigDecimal.valueOf(9000000));
        request.setQuantity(5);

        when(vehicleRepository.findById(1L))
                .thenReturn(Optional.of(vehicle));

        when(vehicleRepository.save(any(Vehicle.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        VehicleResponse response =
                vehicleService.updateVehicle(1L, request);

        assertEquals("BMW", response.getMake());
        assertEquals("X5", response.getModel());
    }

    @Test
    void shouldDeleteVehicle() {

        Vehicle vehicle = Vehicle.builder()
                .id(1L)
                .build();

        when(vehicleRepository.findById(1L))
                .thenReturn(Optional.of(vehicle));

        vehicleService.deleteVehicle(1L);

        verify(vehicleRepository).delete(vehicle);
    }

    @Test
    void shouldThrowWhenVehicleNotFound() {

        when(vehicleRepository.findById(1L))
                .thenReturn(Optional.empty());

        RuntimeException exception =
                assertThrows(RuntimeException.class,
                        () -> vehicleService.deleteVehicle(1L));

        assertEquals("Vehicle not found",
                exception.getMessage());
    }

    @Test
    void shouldSearchVehicleByMake() {

        Vehicle vehicle = Vehicle.builder()
                .id(1L)
                .make("Toyota")
                .model("Fortuner")
                .category(Category.SUV)
                .price(BigDecimal.valueOf(4500000))
                .quantity(5)
                .build();

        when(vehicleRepository.findByMakeContainingIgnoreCase("Toyota"))
                .thenReturn(List.of(vehicle));

        List<VehicleResponse> response =
                vehicleService.searchVehicles(
                        "Toyota",
                        null,
                        null,
                        null,
                        null
                );

        assertEquals(1, response.size());
        assertEquals("Toyota", response.get(0).getMake());
    }
}

