import React, {Component} from 'react'
import './App.css'
import PersonList from "../../containers/PersonList";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Header/>
                <PersonList/>
                <Footer/>
            </React.Fragment>
        )
    }
}

export default App;