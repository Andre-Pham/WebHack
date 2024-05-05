import Pet from "../model/Pet";
import DataObject from "./DataObject";

export enum PetField {
    deathDate = "deathDate",
    state = "state",
}

class PetDataObject {
    public static create(pet: Pet): DataObject {
        return new DataObject().addDate(PetField.deathDate, pet.deathDate).addNumber(PetField.state, pet.state);
    }

    public static restore(data: DataObject): Pet | null {
        const deathDate = data.getDateOrNull(PetField.deathDate);
        const state = data.getNumber(PetField.state, 0);
        if (deathDate === null) {
            console.error("[PetDataObject] Failed to restore Pet");
            return null;
        }
        return new Pet(deathDate, state);
    }
}

export default PetDataObject;
