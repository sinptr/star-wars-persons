import React from 'react';
import PropTypes from 'prop-types';

export default class Person extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            name: props.name,
            height: props.height,
        }
    }

    handleEdit = () => {
        this.setState({
            edit: true
        })
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

    validate = () => {
        const {name, height} = this.state;
        return !!(name.trim() && height);
    };

    handleSave = () => {
        this.setState({
            edit: false
        });
        this.props.onSave({
            id: this.props.id,
            name: this.state.name,
            height: this.state.height
        })
    };

    renderTemplate = () => {
        let personTemplate;
        if (this.state.edit) {
            personTemplate =
                <React.Fragment>
                    <input
                        type={'text'}
                        name={'name'}
                        placeholder="Имя"
                        value={this.state.name}
                        onChange={this.handleNameChange}
                    />
                    <input
                        type={'text'}
                        name={'height'}
                        placeholder="Рост"
                        value={this.state.height}
                        onChange={this.handleHeightChange}
                    />
                    <div className="buttons">
                        <button onClick={this.handleSave} disabled={!this.validate()}>
                            <i className="material-icons">
                                save
                            </i>
                        </button>
                    </div>
                </React.Fragment>
        } else {
            personTemplate =
                <React.Fragment>
                    <span>{this.props.name}</span>
                    <span>{this.props.height}</span>
                    <div className="buttons">
                        <button onClick={this.handleEdit}>
                            <i className="material-icons">
                                edit
                            </i>
                        </button>
                        <button onClick={() => this.props.onDelete(this.props.id)}>
                            <i className="material-icons">
                                delete
                            </i>
                        </button>
                    </div>
                </React.Fragment>
        }
        return personTemplate;
    };

    render() {
        return (
            this.renderTemplate()
        );
    }
}