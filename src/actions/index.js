import {peopleUrl} from "../config/config";

export const ADD_PERSON = 'ADD_PERSON';
export const DELETE_PERSON = 'DELETE_PERSON';
export const UPDATE_PERSON = 'UPDATE_PERSON';
export const LOAD_PERSONS_REQUEST = 'LOAD_PERSONS_REQUEST';
export const LOAD_PERSONS_SUCCESS = 'LOAD_PERSONS_SUCCESS';
export const LOAD_PERSONS_ERROR = 'LOAD_PERSONS_ERROR';
export const CHANGE_SORT = 'CHANGE_SORT';
export const CHANGE_FILTER = 'CHANGE_FILTER';
export const CLEAR_FILTER = 'CLEAR_FILTER';

export function addPerson(data) {
    return {
        type: ADD_PERSON,
        payload: data
    }
}

export function deletePerson(id) {
    return {
        type: DELETE_PERSON,
        payload: id,
    }
}

export function updatePerson(data) {
    return {
        type: UPDATE_PERSON,
        payload: data,
    }
}

export function loadPersons() {
    return dispatch => {
        dispatch({
            type: LOAD_PERSONS_REQUEST,
            payload: null
        });

        fetch(peopleUrl)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Произошла ошибка при загрузке данных');
                }
            })
            .then(data => {
                dispatch({
                    type: LOAD_PERSONS_SUCCESS,
                    payload: data
                });
            })
            .catch(error => {
                dispatch({
                    type: LOAD_PERSONS_ERROR,
                    payload: error.message
                })
            })
    }
}

export function changeSort(data) {
    return {
        type: CHANGE_SORT,
        payload: data
    }
}

export function changeFilter(data) {
    return {
        type: CHANGE_FILTER,
        payload: data
    }
}

export function clearFilter() {
    return {
        type: CLEAR_FILTER
    }
}