import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Home from "./Home";

vi.mock("../api/vehicleApi", () => ({
    getAllVehicles: vi.fn().mockResolvedValue([]),
    purchaseVehicle: vi.fn()
}));

describe("Home Component", () => {

    test("renders available vehicles heading", async () => {

        render(<Home />);

        expect(
            screen.getByText("Available Vehicles")
        ).toBeInTheDocument();

    });

});