import { UnreachableCaseError } from "../language/errors/UnreachableCaseError";
import { PetState } from "../model/BunnyState";

class AnimationFrames {
    public static readonly eating = ["eating-1.png", "eating-2.png"];

    public static readonly eatingSpeed = 160;
    public static readonly sleepingSpeed = 600;
    public static readonly studyingSpeed = 600;

    public static getSleepingFrames(petState: PetState): string[] {
        switch (petState) {
            case PetState.healthy:
                return ["sleeping-1.png", "sleeping-2.png"];
            case PetState.tired1:
                return ["sleeping-1-tired-1.png", "sleeping-2-tired-1.png"];
            case PetState.tired2:
                return ["sleeping-1-tired-2.png", "sleeping-2-tired-2.png"];
            case PetState.tired3:
                return ["sleeping-1-tired-3.png", "sleeping-2-tired-3.png"];
            case PetState.tired4:
                return ["sleeping-1-tired-4.png", "sleeping-2-tired-4.png"];
            case PetState.dead:
                return ["dead.png"];
            default:
                throw new UnreachableCaseError(petState);
        }
    }

    public static getStudyingFrames(petState: PetState): string[] {
        switch (petState) {
            case PetState.healthy:
                return ["study-1.png", "study-2.png"];
            case PetState.tired1:
                return ["study-1-tired-1.png", "study-2-tired-1.png"];
            case PetState.tired2:
                return ["study-1-tired-2.png", "study-2-tired-2.png"];
            case PetState.tired3:
                return ["study-1-tired-3.png", "study-2-tired-3.png"];
            case PetState.tired4:
                return ["study-1-tired-4.png", "study-2-tired-4.png"];
            case PetState.dead:
                return ["dead.png"];
            default:
                throw new UnreachableCaseError(petState);
        }
    }
}

export default AnimationFrames;
