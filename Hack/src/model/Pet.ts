import { PetState } from "./BunnyState";

class Pet {
    // The amount of time feeding adds to the death date
    protected static readonly FOOD_DEATH_OFFSET_HOURS: number = 6;
    // The exact date and time the pet dies
    protected _deathDate: Date;
    protected _state: PetState;
    get deathDate(): Date {
        return this._deathDate;
    }
    get state(): PetState {
        return this._state;
    }
    /// The amount of time the pet has to live
    get timeToLive(): Date {
        const difference = this._deathDate.getTime() - new Date().getTime();
        return new Date(difference);
    }
    // The amount of time the pet has to live in milliseconds
    get timeToLiveMilliseconds(): number {
        return this.timeToLive.getTime();
    }
    // The amount of time the pet has to live in seconds
    get timeToLiveSeconds(): number {
        const millisecondsInSecond = 1000;
        return Math.floor(this.timeToLiveMilliseconds / millisecondsInSecond);
    }
    // The amount of time the pet has to live in minutes
    get timeToLiveMinutes(): number {
        const millisecondsInMinute = 60000;
        return Math.floor(this.timeToLiveMilliseconds / millisecondsInMinute);
    }
    // The string description of the amount of time the pet has to live
    get timeToLiveDescription(): string {
        const totalMilliseconds = this.timeToLive.getTime();
        const totalSeconds = Math.floor(totalMilliseconds / 1000);
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const dayPart = `${days} day${days !== 1 ? "s" : ""}`;
        const hourPart = `${hours} hour${hours !== 1 ? "s" : ""}`;
        const minutePart = `${minutes} minute${minutes !== 1 ? "s" : ""}`;
        return `${dayPart} ${hourPart} ${minutePart}`;
    }

    constructor(deathDate: Date, petState: PetState) {
        this._deathDate = deathDate;
        this._state = petState;
        this.refreshState();
    }

    public static new(daysToLive: number): Pet {
        const pet = new Pet(new Date(), PetState.healthy);
        pet.addToDeathDate(daysToLive);
        return pet;
    }

    public feed() {
        this.addToDeathDate(0, Pet.FOOD_DEATH_OFFSET_HOURS, 0);
    }

    public refreshState() {
        const timeToLiveMinutes = this.timeToLiveMinutes;
        if (this.timeToLiveMilliseconds <= 0) {
            this._state = PetState.dead;
        } else if (timeToLiveMinutes < 60 * 24) {
            this._state = PetState.tired4;
        } else if (timeToLiveMinutes < 60 * 24 * 2) {
            this._state = PetState.tired3;
        } else if (timeToLiveMinutes < 60 * 24 * 3) {
            this._state = PetState.tired2;
        } else if (timeToLiveMinutes < 60 * 24 * 3) {
            this._state = PetState.tired1;
        } else {
            this._state = PetState.healthy;
        }
    }

    public addToDeathDate(days: number = 0, hours: number = 0, minutes: number = 0) {
        const newDate = new Date(this._deathDate);
        newDate.setDate(newDate.getDate() + days);
        newDate.setHours(newDate.getHours() + hours);
        newDate.setMinutes(newDate.getMinutes() + minutes);
        this._deathDate = newDate;
        this.refreshState();
    }
}

export default Pet;
