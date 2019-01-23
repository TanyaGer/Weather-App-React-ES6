import React, { Component } from 'react';
import InputForm from './InputForm';

class Home extends Component {

    render () {
        const history = this.props.history;
        //history object from router
        return (
            <InputForm
             history={history} 
             homeNavigation='home-navigation' 
             headerContainer='home-header-container'
             headerTitle='home-header-title'
             headerForm='home-header-form'
             inputForm='home-input-form'
             button='home button'
             title='Enter a city' />
        )
    }

};

export default Home;