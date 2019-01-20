import {
    UPDATE_PERSON,
    DELETE_PERSON,
    ADD_PERSON,
    LOAD_PERSONS_REQUEST,
    LOAD_PERSONS_SUCCESS,
    LOAD_PERSONS_ERROR,
    CHANGE_FILTER,
    CLEAR_FILTER,
} from '../actions'

const initialState = {
    data: [],
    isFetching: false,
    error: null,
    filter: {
        gender: ''
    }
};

export function personsReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_PERSON:
            return {
                ...state,
                data: state.data.map(
                    person => (
                        action.payload.id === person.id ? {...person, ...action.payload} : person
                    )
                )
            };

        case DELETE_PERSON:
            return {...state, data: state.data.filter(person => (action.payload !== person.id))};

        case ADD_PERSON:
            let newId = state.data.reduce((max, {id}) => {
                return max > id ? max : id
            }, -1) + 1;
            return {...state, data: [...state.data, {id: newId, ...action.payload}]};

        case LOAD_PERSONS_REQUEST:
            return {...state, isFetching: true, error: null};

        case LOAD_PERSONS_SUCCESS:
            let persons = action.payload.results.map((item, index) => {
                return {
                    id: index,
                    name: item.name,
                    height: item.height,
                    gender: item.gender
                }
            });
            return {...state, data: persons, isFetching: false};

        case LOAD_PERSONS_ERROR:
            return {...state, error: action.payload, isFetching: false};

        case CHANGE_FILTER:
            let filter = {...state.filter, ...action.payload};
            return {...state, filter: filter};

        case CLEAR_FILTER:
            return {...state, filter: initialState.filter};

        default:
            return state
    }
}