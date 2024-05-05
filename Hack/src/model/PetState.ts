export enum PetState {
    healthy = 0, // >= 4 days left
    tired1 = 1, // < 4 days left
    tired2 = 2, // < 3 days left
    tired3 = 3, // < 2 days left
    tired4 = 4, // < 1 day left
    dead = 5, // no time left
}
