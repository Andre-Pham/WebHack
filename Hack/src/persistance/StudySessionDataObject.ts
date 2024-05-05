import StudySession from "../model/StudySession";
import DataObject from "./DataObject";

export enum StudySessionField {
    start = "start",
    end = "end",
    foodToCollect = "foodToCollect",
    foodCollected = "foodCollected",
}

class StudySessionDataObject {
    public static create(studySession: StudySession): DataObject {
        return new DataObject()
            .addDate(StudySessionField.start, studySession.start)
            .addDate(StudySessionField.end, studySession.end)
            .addNumber(StudySessionField.foodToCollect, studySession.foodToCollect)
            .addNumber(StudySessionField.foodCollected, studySession.foodCollected);
    }

    public static restore(data: DataObject): StudySession | null {
        const start = data.getDateOrNull(StudySessionField.start);
        const end = data.getDateOrNull(StudySessionField.end);
        const foodToCollect = data.getNumberOrNull(StudySessionField.foodToCollect);
        const foodCollected = data.getNumberOrNull(StudySessionField.foodCollected);
        if (start === null || foodToCollect === null || foodCollected === null) {
            console.error("[StudySessionDataObject] Failed to restore StudySession");
            return null;
        }
        return new StudySession(start, end, foodToCollect, foodCollected);
    }
}

export default StudySessionDataObject;
