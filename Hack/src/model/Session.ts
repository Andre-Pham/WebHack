import StateManager from "../state/publishers/StateManager";
import { PetState } from "./PetState";
import Pet from "./Pet";
import Student from "./Student";
import StudySession from "./StudySession";
import LocalStorageManager from "../services/LocalStorageManager";

class Session {
    public static readonly inst = new Session();

    private _loggedInStudent: Student | null = null;
    private _pet: Pet | null = null;
    private _activeStudySession: StudySession | null = null;

    private constructor() {
        this._loggedInStudent = LocalStorageManager.inst.readStudent() ?? Student.new();
        this._pet = LocalStorageManager.inst.readPet() ?? Pet.new(7);
        this._activeStudySession = LocalStorageManager.inst.readStudySession();
        this.refreshState();
        this.persistState(false);
    }

    public refreshState() {
        this.refreshModel();
        StateManager.timeToLiveDescription.publish(this._pet?.timeToLiveDescription ?? null);
        StateManager.foodRemaining.publish(this._loggedInStudent?.food ?? 0);
        StateManager.studySessionDurationDescription.publish(this._activeStudySession?.durationDescription ?? null);
        if (this._pet) {
            if (this._pet.state !== StateManager.petState.read()) {
                StateManager.petState.publish(this._pet.state);
            }
        }
    }

    public persistState(refreshModel: boolean = true) {
        if (refreshModel) {
            this.refreshModel();
        }
        if (this._loggedInStudent) {
            LocalStorageManager.inst.writeStudent(this._loggedInStudent);
        }
        if (this._pet) {
            LocalStorageManager.inst.writePet(this._pet);
        }
        // It's fine to write null to study session - it means there is no active study session
        LocalStorageManager.inst.writeStudySession(this._activeStudySession);
        console.log("[Session] Persisted state");
    }

    public resetStateAndPersistance() {
        LocalStorageManager.inst.reset();
        this._loggedInStudent = Student.new();
        this._pet = Pet.new(7);
        this._activeStudySession = null;
        this.refreshState();
        console.log("[Session] Reset state and persistance");
    }

    public getPetState(): PetState {
        this._pet?.refreshState();
        return this._pet?.state ?? PetState.healthy;
    }

    public timeTravel(days: number = 0, hours: number = 0, minutes: number = 0) {
        this._pet?.addToDeathDate(-days, -hours, -minutes);
        this._activeStudySession?.addToStart(-days, -hours, -minutes);
        this.refreshState();
        this.persistState(false);
    }

    public feedPet() {
        if (this._loggedInStudent && this._pet) {
            this._loggedInStudent.feedPet(this._pet);
        }
        this.refreshState();
        this.persistState(false);
    }

    public startStudySession() {
        if (this._activeStudySession) {
            // Study session already active
            return;
        }
        this._activeStudySession = StudySession.new();
        this.refreshState();
        this.persistState(false);
    }

    public endStudySession() {
        if (this._activeStudySession) {
            if (this._loggedInStudent && this._activeStudySession) {
                this._loggedInStudent.collectFoodFrom(this._activeStudySession);
            }
            this._activeStudySession = null;
        }
        this.refreshState();
        this.persistState(false);
    }

    private refreshModel() {
        if (this._loggedInStudent && this._activeStudySession) {
            this._loggedInStudent.collectFoodFrom(this._activeStudySession);
        }
        if (this._pet) {
            this._pet.refreshState();
        }
    }
}

export default Session;
