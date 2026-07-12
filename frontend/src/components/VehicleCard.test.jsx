import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VehicleCard from "./VehicleCard";
import { vi } from "vitest";

test("calls purchase handler when purchase button is clicked", async () => {

    const onPurchase = vi.fn();

    render(
        <VehicleCard
            vehicle={{
                id: 1,
                make: "Toyota",
                model: "Fortuner",
                category: "SUV",
                price: 1000000,
                quantity: 5
            }}
            onPurchase={onPurchase}
        />
    );

    await userEvent.click(
        screen.getByRole("button", { name: /purchase/i })
    );

    expect(onPurchase).toHaveBeenCalledWith(1);
});

test("shows admin actions for admin user", () => {

    render(

        <VehicleCard

            vehicle={{
                id:1,
                make:"Toyota",
                model:"Fortuner",
                category:"SUV",
                price:4500000,
                quantity:5
            }}

            role="ADMIN"

        />

    );

    expect(screen.getByText("Delete")).toBeInTheDocument();

    expect(screen.getByText("Restock")).toBeInTheDocument();

});