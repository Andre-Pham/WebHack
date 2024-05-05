import Student from "../model/Student";
import DataObject from "./DataObject";

export enum StudentField {
    food = "food",
}

class StudentDataObject {
    public static create(student: Student): DataObject {
        return new DataObject().addNumber(StudentField.food, student.food);
    }

    public static restore(data: DataObject): Student {
        const food = data.getNumber(StudentField.food, 0);
        return new Student(food);
    }
}

export default StudentDataObject;
