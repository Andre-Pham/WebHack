import StateManager from "../state/publishers/StateManager";
import Pet from "./Pet";
import Student from "./Student";
import StudySession from "./StudySession";

class Session {
    public static readonly inst = new Session();

    private _loggedInStudent: Student | null = null;
    private _pet: Pet | null = null;
    private _activeStudySession: StudySession | null = null;

    private constructor() {
        // TEMP: create new objects
        this._loggedInStudent = Student.new();
        this._pet = Pet.new(10);
    }

    public refreshState() {
        if (this._loggedInStudent && this._activeStudySession) {
            this._loggedInStudent.collectFoodFrom(this._activeStudySession);
        }
        StateManager.timeToLiveDescription.publish(this._pet?.timeToLiveDescription ?? null);
        StateManager.foodRemaining.publish(this._loggedInStudent?.food ?? 0);
        StateManager.studySessionDurationDescription.publish(this._activeStudySession?.durationDescription ?? null);
    }

    public feedPet() {
        if (this._loggedInStudent && this._pet) {
            this._loggedInStudent.feedPet(this._pet);
        }
        this.refreshState();
    }

    public startStudySession() {
        if (this._activeStudySession) {
            // Study session already active
            return;
        }
        this._activeStudySession = StudySession.new();
        this.refreshState();
    }

    public endStudySession() {
        if (this._activeStudySession) {
            if (this._loggedInStudent && this._activeStudySession) {
                this._loggedInStudent.collectFoodFrom(this._activeStudySession);
            }
            this._activeStudySession = null;
        }
        this.refreshState();
    }
}

export default Session;