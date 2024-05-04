class StudySession {
    // The amount of time you have to study to get one food
    protected static readonly MINUTES_TO_FOOD_CONVERSION: number = 2;
    // When the study session started
    protected _start: Date;
    // When the study session ended (or null if ongoing)
    protected _end: Date | null;
    // The amount of food the student can right now receive from this session
    protected _foodToCollect: number;
    // The amount of food the student has collected from this session thus far
    protected _foodCollected: number;
    get start(): Date {
        return this._start;
    }
    get end(): Date | null {
        return this._end;
    }
    // True if the study session is going
    get isOngoing(): boolean {
        return this._end === null;
    }
    // The duration of the study session (thus far, if incomplete)
    get duration(): Date {
        if (this._end === null) {
            const difference = new Date().getTime() - this._start.getTime();
            return new Date(difference);
        }
        const difference = this._end.getTime() - this._start.getTime();
        return new Date(difference);
    }
    // The duration of the study session (thus far, if incomplete) in minutes
    get durationMinutes(): number {
        const millisecondsInMinute = 60000;
        return Math.floor(this.duration.getTime() / millisecondsInMinute);
    }
    // Description of the duration of the study session
    get durationDescription(): string {
        const durationMinutes = this.durationMinutes;
        const hours = Math.floor(durationMinutes / 60);
        const minutes = durationMinutes % 60;
        let result = "";
        if (hours > 0) {
            result += `${hours} hour${hours !== 1 ? "s" : ""} `;
        }
        result += `${minutes} minute${minutes !== 1 ? "s" : ""}`;
        return result.trim();
    }

    constructor(start: Date, end: Date | null, foodToCollect: number, foodCollected: number) {
        this._start = start;
        this._end = end;
        this._foodToCollect = foodToCollect;
        this._foodCollected = foodCollected;
    }

    public static new(): StudySession {
        return new StudySession(new Date(), null, 0, 0);
    }

    public recalculateFoodToCollect() {
        const totalFoods = Math.floor(this.durationMinutes / StudySession.MINUTES_TO_FOOD_CONVERSION);
        const totalFoodsOwed = totalFoods - this._foodCollected;
        this._foodToCollect = totalFoodsOwed;
    }

    public collectFood(): number {
        const collected = this._foodToCollect;
        this._foodCollected += this._foodToCollect;
        this._foodToCollect = 0;
        return collected;
    }
}

export default StudySession;
