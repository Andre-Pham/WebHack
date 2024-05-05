import Pet from "../model/Pet";
import Student from "../model/Student";
import StudySession from "../model/StudySession";
import DataObject from "../persistance/DataObject";
import PetDataObject from "../persistance/PetDataObject";
import StudentDataObject from "../persistance/StudentDataObject";
import StudySessionDataObject from "../persistance/StudySessionDataObject";
import { ColorScheme } from "./../state/publishers/types/ColorScheme";

class LocalStorageManager {
    public static readonly inst = new LocalStorageManager();

    private static readonly DARKMODE_KEY = "darkmode";
    private static readonly PET_KEY = "pet";
    private static readonly STUDENT_KEY = "student";
    private static readonly STUDY_SESSION_KEY = "studySession";

    private constructor() {}

    public reset() {
        localStorage.clear();
    }

    public writeColorTheme(theme: ColorScheme) {
        localStorage.setItem(LocalStorageManager.DARKMODE_KEY, theme == ColorScheme.dark ? "true" : "false");
    }

    public writePet(pet: Pet | null) {
        if (pet === null) {
            localStorage.removeItem(LocalStorageManager.PET_KEY);
            return;
        }
        const dataObject = PetDataObject.create(pet);
        localStorage.setItem(LocalStorageManager.PET_KEY, dataObject.str);
    }

    public writeStudent(student: Student | null) {
        if (student === null) {
            localStorage.removeItem(LocalStorageManager.STUDENT_KEY);
            return;
        }
        const dataObject = StudentDataObject.create(student);
        localStorage.setItem(LocalStorageManager.STUDENT_KEY, dataObject.str);
    }

    public writeStudySession(studySesson: StudySession | null) {
        if (studySesson === null) {
            localStorage.removeItem(LocalStorageManager.STUDY_SESSION_KEY);
            return;
        }
        const dataObject = StudySessionDataObject.create(studySesson);
        localStorage.setItem(LocalStorageManager.STUDY_SESSION_KEY, dataObject.str);
    }

    public readColorTheme(): ColorScheme {
        const read = localStorage.getItem(LocalStorageManager.DARKMODE_KEY);
        if (read === null) {
            // Default to light
            return ColorScheme.light;
        }
        return read === "true" ? ColorScheme.dark : ColorScheme.light;
    }

    public readPet(): Pet | null {
        const dataObject = this.readDataObject(LocalStorageManager.PET_KEY);
        if (!dataObject) {
            console.log("[LocalStorageManager] Pet was not restored");
            return null;
        }
        return PetDataObject.restore(dataObject);
    }

    public readStudent(): Student | null {
        const dataObject = this.readDataObject(LocalStorageManager.STUDENT_KEY);
        if (!dataObject) {
            console.log("[LocalStorageManager] Student was not restored");
            return null;
        }
        return StudentDataObject.restore(dataObject);
    }

    public readStudySession(): StudySession | null {
        const dataObject = this.readDataObject(LocalStorageManager.STUDY_SESSION_KEY);
        if (!dataObject) {
            console.log("[LocalStorageManager] StudySession was not restored");
            return null;
        }
        return StudySessionDataObject.restore(dataObject);
    }

    private readDataObject(key: string): DataObject | null {
        const jsonString = localStorage.getItem(key);
        if (!jsonString) {
            return null;
        }
        return DataObject.fromStr(jsonString);
    }
}

export default LocalStorageManager;
