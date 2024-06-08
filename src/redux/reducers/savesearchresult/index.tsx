import { SAVE_SEARCH_RESULT } from "../../actions";

const INITIAL_STATE = {
    locations: []
}

const saveSearchResultReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_SEARCH_RESULT: {
            return {
                ...state,
                locations: [...state.locations, action.payload]
            }
        }
        default: {
            return state;
        }
    }
}

export default saveSearchResultReducer;