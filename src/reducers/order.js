import {CHANGE_SORT} from "../actions";
import {direction, type} from "../utils/sort";

const initialState = {
    by: '',
    direction: direction.asc,
    type: type.alphabetic
};

export function orderReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_SORT:
            let same = action.payload.by === state.by;
            return {
                by: same && state.direction === direction.desc ? '' : action.payload.by,
                direction: action.payload.by === state.by ? state.direction * -1 : direction.asc,
                type: action.payload.type
            };
        default:
            return state
    }
}