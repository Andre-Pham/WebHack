import Pet from "./Pet";
import StudySession from "./StudySession";

class Student {
    protected _food: number;
    get food(): number {
        return this._food;
    }

    constructor(food: number) {
        this._food = food;
    }

    public static new(): Student {
        return new Student(0);
    }

    public collectFoodFrom(studySession: StudySession) {
        studySession.recalculateFoodToCollect();
        this._food += studySession.collectFood();
    }

    public feedPet(pet: Pet) {
        if (this._food == 0) {
            return;
        }
        this._food -= 1;
        pet.feed();
    }
}

export default Student;
