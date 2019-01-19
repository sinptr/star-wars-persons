import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import {addPerson} from "../../actions/index";

class AddPerson extends Component{
    state = {
        name: '',
        height: ''
    };

    handleNameChange = e => {
        this.setState({
            name: e.currentTarget.value
        })
    };

    handleHeightChange = e => {
        let value = e.currentTarget.value;
        if (/^\d*$/.test(value)) {
            this.setState({
                height: value
            })
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            name: '',
            height: '',
        });
        this.props.addPerson({
            name: this.state.name,
            height: this.state.height
        })
    };

    validate = () => {
        const {name, height} = this.state;
        return !!(name.trim() && height);
    };

    render() {
        const {isFetching, error} = this.props;
        return (
            <Fragment>
                {!isFetching && !!!error && <form className="add-form" onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Имя"
                        value={this.state.name}
                        onChange={this.handleNameChange}
                    />
                    <input
                        type="text"
                        name="height"
                        placeholder="Рост"
                        value={this.state.height}
                        onChange={this.handleHeightChange}
                    />
                    <button type="submit" disabled={!this.validate()}>Добавить</button>
                </form>}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isFetching: state.persons.isFetching,
    error: state.persons.error
});

const mapDispatchToProps = (dispatch) => ({
    addPerson: data => dispatch(addPerson(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPerson)