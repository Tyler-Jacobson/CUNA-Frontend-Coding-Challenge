import { fireEvent, screen } from "@testing-library/react";
import Signup from "../Components/Signup";
import userEvent from '@testing-library/user-event';
import { renderWithRedux } from "./testSetup";


describe("with valid inputs", () => {
    const mockOnSubmit = jest.fn()

    it("correctly fills 'username' field", () => {
        renderWithRedux(<Signup />, { initialState: { qualified: { isQualified: "qualified", message: "" } } })

        expect(screen.queryByDisplayValue("test@gmail.com")).not.toBeInTheDocument()
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "test@gmail.com" } })
        expect(screen.getByDisplayValue("test@gmail.com")).toBeInTheDocument()
    })

    it("correctly fills 'password' field", () => {
        renderWithRedux(<Signup />, { initialState: { qualified: { isQualified: "qualified", message: "" } } })

        expect(screen.queryByDisplayValue("password#3")).not.toBeInTheDocument()
        fireEvent.change(screen.getAllByLabelText(/password/i)[0], { target: { value: "password#3" } })
        expect(screen.getByDisplayValue("password#3")).toBeInTheDocument()
    })

    it("correctly fills 'confirm password' field", () => {
        renderWithRedux(<Signup />, { initialState: { qualified: { isQualified: "qualified", message: "" } } })

        expect(screen.queryByDisplayValue("password#3")).not.toBeInTheDocument()
        fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: "password#3" } })
        expect(screen.getByDisplayValue("password#3")).toBeInTheDocument()
    })

    it("correctly displays errors for invalid form fields", async () => {
        renderWithRedux(<Signup testClick={mockOnSubmit()}/>, { initialState: { qualified: { isQualified: "qualified", message: "" } } })

        expect(screen.queryByText(/username is required/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/needs one special character and one number/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/confirm Password is required/i)).not.toBeInTheDocument()

        userEvent.click(screen.getByText(/submit/i))

        expect(mockOnSubmit).toHaveBeenCalled()

        expect(await screen.findByText(/username is required/i)).toBeInTheDocument()
        expect(await screen.findByText(/needs one special character and one number/i)).toBeInTheDocument()
        expect(await screen.findByText(/confirm Password is required/i)).toBeInTheDocument()
    })

    it("allows the user to submit the form when all fields are correct", async () => {
        renderWithRedux(<Signup testClick={mockOnSubmit()}/>, { initialState: { qualified: { isQualified: "qualified", message: "" } } })

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "test@gmail.com" } })
        fireEvent.change(screen.getAllByLabelText(/password/i)[0], { target: { value: "password#3" } })
        fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: "password#3" } })

        userEvent.click(screen.getByText(/submit/i))

        expect(mockOnSubmit).toHaveBeenCalled()
    })
})