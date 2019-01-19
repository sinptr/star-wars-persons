import React, {Component, Fragment} from 'react'
import './App.css'
import PersonList from "../../containers/PersonList";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

class App extends Component {
    render() {
        return (
            <Fragment>
                <Header/>
                <PersonList/>
                <Footer/>
            </Fragment>
        )
    }
}

export default App;