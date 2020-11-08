/*jshint esversion: 6 */
import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './js/components/footer';
import Header from './js/components/header';


ReactDOM.render(<Header />,document.getElementById('header'));
ReactDOM.render(<Footer />,document.getElementById('footer'));

/*
if (module.hot) {
    module.hot.accept();
}
*/

