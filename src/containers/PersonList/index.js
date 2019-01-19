import React from 'react';
import {connect} from 'react-redux'
import {updatePerson, deletePerson, loadPersons} from '../../actions/index'
import PropTypes from 'prop-types'
import Person from "../../components/Person/index";

class PersonList extends React.Component{
    componentDidMount() {
        this.props.loadPersons();
    }

    render() {
        const {persons, updatePerson, deletePerson, isFetching, error} = this.props;
        return (
            <main>{!isFetching && !error &&
                <div className="list">
                    <div className="columnheader"><span>Имя</span><i className="material-icons up">
                        arrow_right_alt
                    </i></div>
                    <div className="columnheader"><span>Рост</span><i className="material-icons down">
                        arrow_right_alt
                    </i></div>
                    <div className="columnheader"></div>

                    {persons.map(person => (
                        <Person key={person.id} {...person} onSave={updatePerson} onDelete={deletePerson}/>
                    ))}
                </div>}
            </main>
        );
    }

}

function sortPersons(persons, order) {
    return persons;
}

const mapStateToProps = state => ({
    persons: sortPersons(state.persons.data, state.order),
    isFetching: state.persons.isFetching,
    error: state.persons.error,
});

const mapDispatchToProps = dispatch => ({
    updatePerson: data => dispatch(updatePerson(data)),
    deletePerson: id => dispatch(deletePerson(id)),
    loadPersons: () => dispatch(loadPersons())
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonList)