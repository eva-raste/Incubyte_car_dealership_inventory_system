import { render, screen } from "@testing-library/react";
import VehicleForm from "./VehicleForm";

test("renders add vehicle form", () => {

    render(<VehicleForm />);

    expect(screen.getByText(/add vehicle/i)).toBeInTheDocument();

});