import React from 'react';
import ProjectItem from "./Item/ProjectItem";

const ProjectList = (props) => {
    
    // console.log("ProjectList", props);

    if(!props.items){
        return(
            <div>
                <h1>Aucun projets en cours</h1>
            </div>
        );
    }



    if(props.items)
    {
        return( 
            <div>
            {props.items.map(project => (
                    <ProjectItem
                        key={project._id}
                        id={project._id}
                        projectName={project.projectName}
                        projectManager={project.projectManager}
                        description={project.description}
                        stratingDate={project.stratingDate}
                        projectAdvancement={project.projectAdvancement}
                        previsionalEndedDate={project.previsionalEndedDate}
                        onAddAdvancementHandler={props.onAddAdvancementHandler}
                        onRemoveAdvancementHandler={props.onRemoveAdvancementHandler}
                        onValidateProjectHandler={props.onValidateProjectHandler}
                        onCancelProjectHandler={props.onCancelProjectHandler}
                        onSaveChangesHandler={props.onSaveChangesHandler}
                        onUpdateProjectHandler={props.onUpdateProjectHandler}

                    />
            ))}
            </div>
        )
    }
};

export default ProjectList;