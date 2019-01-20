import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import {addPerson} from "../../actions/index";
import {genders} from "../../config/config";
import Select from "../../components/Select";

class AddPerson extends Component{
    state = {
        name: '',
        height: '',
        gender: '',
    };

    handleNameChange = e => {
        this.setState({
            name: e.currentTarget.value
        })
    };

    handleChange = e => {
        let name = e.currentTarget.name;
        let value = e.currentTarget.value;
        this.setState({
            [name]: value
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
            gender: ''
        });
        this.props.addPerson({
            name: this.state.name,
            height: this.state.height,
            gender: this.state.gender
        })
    };

    validate = () => {
        const {name, height, gender} = this.state;
        return !!(name.trim() && height && gender);
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
                    <Select
                        name="gender"
                        value={this.state.gender}
                        onChange={this.handleChange}
                        options={genders}
                        caption="Выберите пол"
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