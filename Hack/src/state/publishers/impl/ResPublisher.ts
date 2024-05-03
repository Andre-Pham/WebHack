import { configureStore, createSlice } from "@reduxjs/toolkit";

/**
 * A redux wrapper for managing application-wide state using the publisher-subscriber pattern.
 * To only be initialised within StateManager.
 */
class ResPublisher {
    private readonly slice = createSlice({
        name: "ResPublisher",
        initialState: {
            value: 0,
        },
        reducers: {
            newForm: (state) => {
                state.value = (state.value + 1) % 10;
            },
        },
    });

    private readonly publisher = configureStore({
        reducer: this.slice.reducer,
    });

    /*
    // EXAMPLE

    useEffect(() => {
        const unsubscribe = StateManager.somePublisher.subscribe(() => {
            console.log("Received!");
        });

        return () => {
            unsubscribe();
        };
    }, []);
    */
    public subscribe(callback: () => void): () => void {
        return this.publisher.subscribe(callback);
    }

    public publish() {
        this.publisher.dispatch(this.slice.actions.newForm());
    }
}

export default ResPublisher;
