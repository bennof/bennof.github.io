/*jshint esversion:6 */
import React, {Component} from 'react';

class Header extends Component {
    render(){
        return (
            <div className="navbar">
                <a className="logo" href="/">
                    <h1 className="is-primary logo">Bennof<small className="is-secondary">.github.io</small></h1>
                </a>
                <label for="menu_switch" className="menu">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <g fill="none"  stroke-width="4" stroke-linecap="round"  >
                            <path  d="M 4,8 L 28,8" />
                            <path  d="M 4,16 L 28,16" />
                            <path  d="M 4,24 L 28,24" />
                        </g>
                    </svg>
                </label>
                <input type="checkbox" id="menu_switch" className="menu" />
                <ul className="menu">
                    <li><a href="#hash-router=/content/covid19analysis.html">Daten Analyse</a></li>
                    <li><a href="#hash-router=/content/sir_model.html">SIR Modell</a></li>
                    <li><a href="#hash-router=/content/viral_playground.html">Virus Playground</a></li>
                    <li><a href="#hash-router=/content/tr/tabularrasa.html">TabularRasa</a></li>
                    <li><a href="mailto:benno.falkner@gmail.com">Contact</a></li>
                </ul>
            </div>
        );
    }
}

export default Header;