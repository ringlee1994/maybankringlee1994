import { SAVE_SEARCH_RESULT } from "..";

export const saveSearchResult = (payload: string) => {
    return async (dispatch) => {
        dispatch({ type: SAVE_SEARCH_RESULT, payload })
    }
}