import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './BarreNav.css';
import Aux from "../../../hoc/Auxiliary";
import logout from "../../../project/components/images/logout.png";
import gestion from "../../../project/components/images/gestion.png";


const BarreNav = () => {

    
    const logoutHandler = () => {
        localStorage.clear();
        document.location.reload();
    }
    
    return (
        <Aux>


        <div className="main_barre_nav">
            <div>
                <h1>
                    <Link className="nav__link" to="/">ProGest</Link>

                </h1>
            </div>

            <nav >
                <ul className="main_ul">
                    <li className="main_li">
                        <NavLink
                            to="/project/create" exact
                        >
                            {/* <img src={gestion} alt=""/> */}
                            Nouvelle tâche
                        </NavLink>
                    </li>

                    {/* <li className="main_li">
                        <NavLink
                            to="/auth" exact
                        >
                            SignUp
                        </NavLink>
                    </li> */}
                

                    <li className="main_li">
                        <button
                            onClick={() => logoutHandler()}
                        >
                            {/* <img src={logout} alt="" onClick={() => logoutHandler()} /> */}
                            Se déconnecter
                        </button>
                    </li>

                </ul>
            </nav>
        </div>
        </Aux>
    );
};

export default BarreNav;