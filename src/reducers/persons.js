const initialState = {
    data: [],
    isFetching: false,
    error: null,
};

export function personsReducer(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_PERSON':
            return {
                ...state,
                data: state.data.map(person => (action.payload.id === person.id ? action.payload : person))
            };

        case 'DELETE_PERSON':
            return {...state, data: state.data.filter(person => (action.payload !== person.id))};

        case 'ADD_PERSON':
            let newId = state.data.reduce((max, {id}) => {
                return max > id ? max : id
            }, -1) + 1;
            return {...state, data: [...state.data, {id: newId, ...action.payload}]};

        case 'LOAD_PERSONS_REQUEST':
            return {...state, isFetching: true};

        case 'LOAD_PERSONS_SUCCESS':
            let persons = action.payload.results.map((item, index) => {
                return {
                    id: index,
                    name: item.name,
                    height: item.height
                }
            });
            return {...state, data: persons, isFetching: false};

        case 'LOAD_PERSONS_ERROR':
            return {...state, error: action.payload};

        default:
            return state
    }
}