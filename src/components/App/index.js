import React, {Component, Fragment} from 'react'
import './styles.scss'
import PersonList from "../../containers/PersonList";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FilterList from "../../containers/ListFilter";

class App extends Component {
    render() {
        return (
            <Fragment>
                <Header/>
                <PersonList>
                    <FilterList/>
                </PersonList>
                <Footer/>
            </Fragment>
        )
    }
}

export default App;