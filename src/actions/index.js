export function addPerson(data) {
    return {
        type: 'ADD_PERSON',
        payload: data
    }
}

export function deletePerson(id) {
    return {
        type: 'DELETE_PERSON',
        payload: id,
    }
}

export function updatePerson(data) {
    return {
        type: 'UPDATE_PERSON',
        payload: data,
    }
}

export function loadPersons() {
    return dispatch => {
        dispatch({
            type: 'LOAD_PERSONS_REQUEST',
            payload: null
        });

        let url = 'https://swapi.co/api/people/';

        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw ('Ошибка с кодом ' + response.status);
                }
            })
            .then(data => {
                dispatch({
                    type: 'LOAD_PERSONS_SUCCESS',
                    payload: data
                });
            })
            .catch(error => {
                dispatch({
                    type: 'LOAD_PERSONS_ERROR',
                    payload: error
                })
            })
    }
}