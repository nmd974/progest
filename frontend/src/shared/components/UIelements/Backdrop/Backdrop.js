import React from 'react';

const backdrop = (props) => {

    console.log("TEST", props);
    if(props.show){
        return <div className="backdrop" onClick={props.clicked}></div>
    }else{return null}

};

export default backdrop;