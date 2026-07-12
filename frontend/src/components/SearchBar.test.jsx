import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

test("calls search when search button is clicked", async () => {

    const mockSearch = vi.fn();

    render(<SearchBar onSearch={mockSearch} />);

    await userEvent.type(
        screen.getByPlaceholderText(/make/i),
        "Toyota"
    );

    await userEvent.click(
        screen.getByRole("button", { name: /search/i })
    );

    expect(mockSearch).toHaveBeenCalled();
});