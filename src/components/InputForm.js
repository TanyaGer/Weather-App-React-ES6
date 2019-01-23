import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputForm extends Component {

    static propTypes = {
        homeNavigation: PropTypes.string.isRequired,
        headerContainer: PropTypes.string.isRequired,
        headerTitle: PropTypes.string.isRequired,
        headerForm: PropTypes.string.isRequired,
        inputForm: PropTypes.string.isRequired,
        button: PropTypes.string.isRequired,
        history: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired
    };
    
    state = {
            city: ''
        };


    handleChange = (event) => {
        const value = event.target.value;
        this.setState(() => ({city: value}));
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const cityFromState = this.state.city;
        const cityToLowerCase = cityFromState.toLowerCase();
        const city = cityToLowerCase[0].toUpperCase() + cityToLowerCase.slice(1);
        console.log('handle submit is called from HOME');
        this.props.history.push({
            pathname: '/forecast',
            search: '?city=' + city
        });
    };

    render () {

        const city = this.state.city;
        const {homeNavigation, headerContainer, headerTitle, title, headerForm, inputForm, button} = this.props;

        return (
            <div className={homeNavigation}>
                <div className={headerContainer}>
                    <h2 className={headerTitle}>{title}</h2>
                    <form className={headerForm} onSubmit={(e)=>this.handleSubmit(e)}>
                        <input 
                            className={inputForm}
                            value={city} 
                            onChange={(e)=>this.handleChange(e)} 
                            autoComplete='off'
                            type='text' 
                            placeholder=' Enter a city...'  
                            required
                        />
 
                        <button
                            className={button}
                            disabled={!city}
                            type='submit' >
                            Get Weather
                        </button>               

                    </form>
                </div>
            </div>
        );
    }

};


export default InputForm;