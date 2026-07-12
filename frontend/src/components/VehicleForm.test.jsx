import { render, screen } from "@testing-library/react";
import VehicleForm from "./VehicleForm";

test("renders add vehicle form", () => {

    render(<VehicleForm />);

    expect(screen.getByText(/add vehicle/i)).toBeInTheDocument();

});

test("loads vehicle details in update mode", async () => {

    render(
        <VehicleForm
            isEdit={true}
            vehicle={{
                id: 1,
                make: "Toyota",
                model: "Fortuner",
                category: "SUV",
                price: 4500000,
                quantity: 10
            }}
            onVehicleAdded={vi.fn()}
        />
    );

    expect(screen.getByDisplayValue("Toyota")).toBeInTheDocument();

});