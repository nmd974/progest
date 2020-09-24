import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';
const Button = (props) => {

    if (props.to) {
        return (
          <Link
            to={props.to}
            exact={props.exact}
            className={`button button--${props.size || 'default'} ${props.approved &&
              'button--approved'} ${props.disapproved && 'button--disapproved'}`}
          >
            {props.children}
          </Link>
        );
      }

    return (
        <button
        className={`button button--${props.size || 'default'} ${props.approved &&
            'button--approved'} ${props.disapproved && 'button--disapproved'}`}
          type={props.type}
          title={props.title}
          onClick={props.onClick}
          disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};

export default Button;