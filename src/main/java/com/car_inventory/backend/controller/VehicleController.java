package com.car_inventory.backend.controller;
import com.car_inventory.backend.dto.RestockRequest;
import com.car_inventory.backend.dto.VehicleRequest;
import com.car_inventory.backend.dto.VehicleResponse;
import com.car_inventory.backend.entity.Category;
import com.car_inventory.backend.service.VehicleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
public class VehicleController {

    private final VehicleService vehicleService;

    @PostMapping
    public ResponseEntity<VehicleResponse> addVehicle(
            @Valid @RequestBody VehicleRequest request) {

        VehicleResponse response = vehicleService.addVehicle(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<VehicleResponse>> getAllVehicles() {

        return ResponseEntity.ok(
                vehicleService.getAllVehicles()
        );
    }

    @GetMapping("/search")
    public ResponseEntity<List<VehicleResponse>> searchVehicles(

            @RequestParam(required = false) String make,

            @RequestParam(required = false) String model,

            @RequestParam(required = false) Category category,

            @RequestParam(required = false) BigDecimal minPrice,

            @RequestParam(required = false) BigDecimal maxPrice
    ) {

        return ResponseEntity.ok(
                vehicleService.searchVehicles(
                        make,
                        model,
                        category,
                        minPrice,
                        maxPrice
                )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<VehicleResponse> updateVehicle(
            @PathVariable Long id,
            @Valid @RequestBody VehicleRequest request) {

        return ResponseEntity.ok(
                vehicleService.updateVehicle(id, request)
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteVehicle(
            @PathVariable Long id) {

        vehicleService.deleteVehicle(id);

        return ResponseEntity.ok("Vehicle deleted successfully");
    }

    @PostMapping("/{id}/purchase")
    public ResponseEntity<VehicleResponse> purchaseVehicle(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                vehicleService.purchaseVehicle(id)
        );
    }

    @PostMapping("/{id}/restock")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<VehicleResponse> restockVehicle(

            @PathVariable Long id,

            @Valid @RequestBody RestockRequest request) {

        return ResponseEntity.ok(
                vehicleService.restockVehicle(id, request)
        );
    }

}