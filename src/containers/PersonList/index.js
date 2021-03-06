import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import ClassNames from 'classnames';
import {updatePerson, deletePerson, loadPersons, changeSort} from '../../actions/index'
import Person from "../../components/Person/index";
import ListHeader from "../../components/ListHeader";
import {direction, type} from "../../utils/sort";
import Button from "../../components/Button";
import Preloader from "../../components/Preloader";

import './styles.scss'

class PersonList extends Component {
    componentDidMount() {
        this.props.loadPersons();
    }

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
            <main>
                {!isFetching && !!!error &&
                <Fragment>
                    <div className={ClassNames("list", {'no-overflow': !persons.length})}>
                        <ListHeader
                            className="sort"
                            text="Имя"
                            isActive={order.by === 'name'}
                            direction={order.direction === direction.asc ? 'up' : 'down'}
                            onClick={() => changeSort({by: 'name', type: type.alphabetic})}
                        />
                        <ListHeader
                            className="sort"
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
                        {!!persons.length &&
                            persons.map(person => (
                            <Person key={person.id} {...person} onSave={updatePerson} onDelete={deletePerson}/>
                        ))}
                    </div>
                </Fragment>}
                {!isFetching && !!!error && this.props.children}
                {isFetching && <Preloader/>}
                {!!error &&
                <div className="error-load">
                    {error}
                    <Button onClick={loadPersons}>Перезарузить</Button>
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