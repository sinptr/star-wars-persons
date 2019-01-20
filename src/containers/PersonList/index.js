import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import {updatePerson, deletePerson, loadPersons, changeSort} from '../../actions/index'
import PropTypes from 'prop-types'
import Person from "../../components/Person/index";
import ListHeader from "../../components/ListHeader";
import {direction, type} from "../../utils/sort";
import FilterBlock from "../../components/FilterBlock";
import Filter from "../../components/Filter";
import {genders} from "../../config/config";

class PersonList extends Component {
    componentDidMount() {
        this.props.loadPersons();
    }

    filterPersons = (filter) => {

    };

    render() {
        const {
            persons,
            updatePerson,
            deletePerson,
            changeSort,
            isFetching,
            error,
            order,
            loadPersons
        } = this.props;

        return (
            <main>{!!persons.length &&
                <Fragment>
                    <div className="list">
                        <ListHeader
                            text="Имя"
                            isActive={order.by === 'name'}
                            direction={order.direction === direction.asc ? 'up' : 'down'}
                            onClick={() => changeSort({by: 'name', type: type.alphabetic})}
                        />
                        <ListHeader
                            text="Рост"
                            isActive={order.by === 'height'}
                            direction={order.direction === direction.asc ? 'up' : 'down'}
                            onClick={() => changeSort({by: 'height', type: type.numeric})}
                        />
                        <ListHeader
                            text="Пол"
                            isActive={false}
                            direction=""
                            onClick={() => {}}
                        />
                        <ListHeader
                            text=""
                            isActive={false}
                            direction=""
                            onClick={() => {}}
                        />
                        {persons.map(person => (
                            <Person key={person.id} {...person} onSave={updatePerson} onDelete={deletePerson}/>
                        ))}
                    </div>
                </Fragment>}
                {!isFetching && !!!error && this.props.children}
                {isFetching && <div className="spinner"></div>}
                {!!error &&
                <div className="error-load">
                    {error}
                    <button onClick={loadPersons}>Перезарузить</button>
                </div>}
            </main>
        );
    }
}

function sortPersons(persons, order, filter = {}) {
    let result = [...persons];
    result = result.filter((person) => {
        return Object.keys(filter).every((key) => {
            return filter[key] ? filter[key] === person[key] : true
        })
    });
    if (order.by) {
        try {
            if (order.type === type.numeric) {
                result.sort((a, b) => {
                    return (a[order.by] - b[order.by]) * order.direction
                });
            } else {
                result.sort((a, b) => {
                    return (a[order.by].localeCompare(b[order.by]) * order.direction)
                });
            }
        } catch (e) {
            console.log(e);
        }
    }
    return result;
}

const mapStateToProps = state => ({
    persons: sortPersons(state.persons.data, state.order, state.persons.filter),
    isFetching: state.persons.isFetching,
    error: state.persons.error,
    order: state.order,
    filter: state.persons.filter
});

const mapDispatchToProps = dispatch => ({
    updatePerson: data => dispatch(updatePerson(data)),
    deletePerson: id => dispatch(deletePerson(id)),
    loadPersons: () => dispatch(loadPersons()),
    changeSort: data => dispatch(changeSort(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonList)