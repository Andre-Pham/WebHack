class Pet {
    // The amount of time feeding adds to the death date
    protected static readonly FOOD_DEATH_OFFSET_HOURS: number = 6;
    // The exact date and time the pet dies
    protected _deathDate: Date;
    get deathDate(): Date {
        return this._deathDate;
    }
    /// The amount of time the pet has to live
    get timeToLive(): Date {
        const difference = this._deathDate.getTime() - new Date().getTime();
        return new Date(difference);
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

    constructor(deathDate: Date) {
        this._deathDate = deathDate;
    }

    public static new(daysToLive: number): Pet {
        const pet = new Pet(new Date());
        pet.addToDeathDate(daysToLive);
        return pet;
    }

    public feed() {
        this.addToDeathDate(0, Pet.FOOD_DEATH_OFFSET_HOURS, 0);
    }

    private addToDeathDate(days: number = 0, hours: number = 0, minutes: number = 0) {
        const newDate = new Date(this._deathDate);
        newDate.setDate(newDate.getDate() + days);
        newDate.setHours(newDate.getHours() + hours);
        newDate.setMinutes(newDate.getMinutes() + minutes);
        this._deathDate = newDate;
    }
}

export default Pet;
