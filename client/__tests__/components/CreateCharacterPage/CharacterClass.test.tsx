import { describe, it } from "vitest";
import CharacterClass from "../../../src/components/CreateCharacterPage/CharacterClass";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { characterClasses } from "../../seedData/characterClasses";
import renderWithStore from "../../renderOptions/renderWithStore";


describe("CharacterAbilityScores component", () => {
    beforeEach(() => {
        renderWithStore(<CharacterClass />, { preloadedState: { dmTools: { characterClasses } }})
    });
    
    it("renders with the default class displayed", () => {
        expect(screen.getByRole("heading", { name: /class/i })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /barbarian/i })).toBeInTheDocument();
    });

    it("allows the user to select from a list of classes, displaying more information on select", async () => {
        const classComboBox = screen.getByLabelText(/select a class/i);
       
        await userEvent.selectOptions(classComboBox, characterClasses[1].id);
        
        expect(screen.getByRole("heading", { name: /wizard/i })).toBeInTheDocument();
        expect(screen.getByText(/shit from their hands/i)).toBeInTheDocument();
    });
});