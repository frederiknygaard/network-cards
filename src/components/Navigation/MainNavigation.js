import React from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../context/auth-context';

const mainNavigation = props => (
    <AuthContext.Consumer>
    {(context) => {
        return (
            <header className="h-header">
                <div className="o-nav">
                    <div className="o-nav__logo">
                        <h1></h1>
                    </div>
                    <div className="o-nav__items">
                        <ul>
                            {!context.token &&
                                <li><NavLink to="/auth/">Login</NavLink></li>
                            }
                            <li><NavLink to="/events/">Events</NavLink></li>
                            {context.token && (
                                <React.Fragment>
                                    <li><NavLink to="/bookings/">Bookings</NavLink></li>
                                    <li>
                                        <button onClick={context.logout}>Logout</button>
                                    </li>
                                </React.Fragment>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </header>
        )
    }}
    </AuthContext.Consumer>
);

export default mainNavigation;