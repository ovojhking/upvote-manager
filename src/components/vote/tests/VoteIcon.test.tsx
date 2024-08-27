import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import VoteIcon from "../VoteIcon";

describe("VoteIcon Component", () => {
	it("calls handleClick with the correct subIndex when clicked", () => {
		const handleClick = jest.fn();
		const subIndex = 0;
		const data = { status: false };

		const { getByRole } = render(
			<VoteIcon
				subIndex={subIndex}
				data={data}
				handleClick={handleClick}
			/>
		);

		fireEvent.click(getByRole("button"));

		expect(handleClick).toHaveBeenCalledTimes(1);
		expect(handleClick).toHaveBeenCalledWith(subIndex);
	});

    it("VoteIcon changes colors correctly when data.status changes", async () => {
        const data = { status: false };
        const handleClick = jest.fn();
    
        const { rerender, getByRole } = render(
            <VoteIcon subIndex={0} data={data} handleClick={handleClick} />
        );
    
        const buttonElement = getByRole("button");
    
        // Initial state
        expect(buttonElement).toHaveStyle({ 'background-color': "#F4F6F8" });
        expect(buttonElement.querySelector("path")?.getAttribute("fill")).toBe("#343A40");
    
        // Simulate data.status change
        data.status = true;
        rerender(<VoteIcon subIndex={0} data={data} handleClick={handleClick} />);
    
        // Check state after data.status changes
        await waitFor(() => {
            const updatedButtonElement = getByRole("button");
            const updatedSvgPathElement = updatedButtonElement.querySelector("path");
    
            expect(updatedButtonElement).toHaveStyle({ 'background-color': "#E5E8FD" });
            expect(updatedSvgPathElement?.getAttribute("fill")).toBe("#253CF2");
        });
    });
    
});
