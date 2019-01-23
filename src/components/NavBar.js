import React, { Component } from 'react';
import InputForm from './InputForm';


class NavBar extends Component {
    render () {
        const history = this.props.history;
        //history object from router
        return (
            <InputForm
             history={history} 
             homeNavigation='navigation-bar' 
             headerContainer='header-container'
             headerTitle='header-title'
             headerForm='header-form'
             inputForm='input-form'
             button='button'
             title='Weatherish' />
        )
    }

};

export default NavBar;

