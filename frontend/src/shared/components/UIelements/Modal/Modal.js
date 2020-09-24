import React from 'react';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {

    console.log("HERE WE GO", props);
    return(
        <div>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div 
            className="modal"
                    style={{
                        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: props.show ? '1' : '0'
                    }}>
            TEST MODAL
            {props.children}
        </div>
        </div>
);
}
    



export default modal;