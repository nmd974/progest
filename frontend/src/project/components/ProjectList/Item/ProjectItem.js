import React from 'react';
import './ProjectItem.css';
import Aux from "../../../../hoc/Auxiliary";
import TimeIcon from "../../images/time_icon.png"
import WorkingIcon from "../../images/working.png"
import MoreIcon from "../../images/more_icon.png"
import LessIcon from "../../images/less_icon.png"
import Cancel from "../../images/cancel.png"
import Done from "../../images/done.png"
import UpdateIcon from "../../images/modifier.png"

const ProjectItem = (props) => {
// console.log(props);
//-------------------------------------------------------Méthodes utilisées-------------------------------------------------------

// let dateJour = new Date();

const removeAdvancementHandler = (id) => {
    props.onRemoveAdvancementHandler(id);
}

const addAdvancementHandler = (id) => {
    props.onAddAdvancementHandler(id);
}

const validateProjectHandler = (id) => {
    props.onValidateProjectHandler(id);
}

const cancelProjectHandler = (id) => {
    props.onCancelProjectHandler(id);
}


// const onSaveChangesHandler = (id) => {
//     props.onSaveChangesHandler(id);
// }

const onUpdateProjectHandler = (id) => {
    props.onUpdateProjectHandler(id);
}

//-------------------------------------------------------Mise en forme de la barre avancement-------------------------------------------------------
const width_indicator = `${props.projectAdvancement*2.1}px`;
let style_indicator_content;
let style_indicator

if (props.projectAdvancement === "100"){

    style_indicator = {
        width: '210px',
        height: '2rem',
        background: '#297915',
        borderRadius: '15px',
        border: 'solid #ffffff',
        display: 'flex',
        alignItems: 'center'
    };

    style_indicator_content = {
        width: `${width_indicator}`,
        height: '2rem',
        background: '#297915',
        margin: 'initial',
        borderRadius: '15px',
        textAlign: 'right',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };
}else if(props.projectAdvancement === "0"){
    style_indicator = {
        width: '210px',
        height: '2rem',
        background: 'red',
        borderRadius: '15px',
        border: 'solid #ffffff',
        display: 'flex',
        padding: '0% 0% 0% 2%',
        alignItems: 'center'
    };

    style_indicator_content = {
        width: '210px',
        height: '2rem',
        background: 'red',
        margin: 'initial',
        borderRadius: '15px',
        textAlign: 'right',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };
}else{
    style_indicator = {
        width: '210px',
        height: '2rem',
        background: 'linear-gradient(.25turn, #d12424, 50%, #297915)',
        borderRadius: '15px',
        border: 'solid #ffffff',
        display: 'flex',
        padding: '0% 0% 0% 2%',
        alignItems: 'center'
    };
    
    style_indicator_content = {
        width: `${width_indicator}`,
        height: '2rem',
        background: 'linear-gradient(.25turn, #d12424, 50%, #297915)',
        margin: 'initial',
        borderRadius: '15px',
        textAlign: 'right',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };
    
}


let content = null;
if(!content){
    return (
            <Aux>
                <div>
                    <div className="block__card">
                            <div className="project_name">
                                <p>Tâche : {props.projectName}</p>
                                <p>Description : {props.description}</p>
                            </div>

                            <div className="block__indicators">
                                <div className="block__indicators__pourcentage">
                                    <div className="working_icon">
                                        <img src={WorkingIcon} alt=""/>
                                    </div>
                                    <div style={style_indicator}>
                                        <div style={style_indicator_content}>
                                            {props.projectAdvancement}%
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="block__indicators__time">
                                    <div className="time_icon">
                                        <img src={TimeIcon} alt=""/>
                                    </div>
                                    <div style={style_indicator}>
                                        <div style={style_indicator_content}>
                                            {props.previsionalEndedDate ? new Date() - props.previsionalEndedDate : "Ajoutez une date de fin previsionnelle pour accéder au temps restant"}
                                            {props.projectAdvancement}%
                                        </div>
                                    </div>
                                </div> */}


                            </div>

                            <div className="block__buttons">

                                <div>
                                    <button onClick={() => removeAdvancementHandler(props.id)} >
                                        <img src={LessIcon} alt=""/>    
                                    </button>
                                    <button onClick={() => addAdvancementHandler(props.id)}>
                                        <img src={MoreIcon} alt=""/>
                                    </button>
                                </div> 

                                <div>
                                    <button onClick={() => cancelProjectHandler(props.id)}>
                                        <img src={Cancel} alt=""/>    
                                    </button>
                                    <button onClick={() => validateProjectHandler(props.id)}>
                                        <img src={Done} alt=""/>
                                    </button>
                                </div>
                                <div>
                                    <button onClick={() => onUpdateProjectHandler(props.id)}>
                                        <img src={UpdateIcon} alt=""/>    
                                    </button>
                                </div>

                            </div>
                    </div>
        
                </div>
            </Aux>
            
    );
}else{
    return {content};
}
    
};

export default ProjectItem;
