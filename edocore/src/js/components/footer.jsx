/*jshint esversion:6 */
import React, {Component} from 'react';

class Footer extends Component {
    render(){
        return (
            <div className="content">
                <div className="columns">
                    <div className="column id-6">
                    <p>Copyright &copy; 2018-2020 <a href="mailto:bennof@edo365.de">Benjamin 'Benno' Falkner</a></p>
                    </div> 
                    <div className="column id-6 align-right">
                        <p>Impress | License</p>
                    </div> 
                </div>
                
            </div>
        );
    }
}

export default Footer;