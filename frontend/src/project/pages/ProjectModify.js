import React, { Component } from "react"; 
import Aux from "../../hoc/Auxiliary";
import './ProjectContentHandler.css';
import addNewProject from "../components/images/addNewProject.png";
import Accueil from "../components/images/accueil.png";
import axios from "axios";
import Trombone from "../components/images/trombone.png";

class ProjectModify extends Component {

    state={
        id: "",
        projectName: "",
        description: "",
        startingDate: "",
        previsionalEndedDate: "",
        projectAdvancement: "",
        projectManager: "",
        etat: ""

    }
    async componentDidMount () {
        const query = new URLSearchParams( this.props.location );
        let id = null;
        let params = null;
        let updatedProject = null;
        console.log(this.props.location);

        for ( let param of query.entries() ) {
            if (param[0] === "search" ){
                params = param[1]
                if (params[0] === "?"){
                    id = param[1].slice(1);
                    console.log(id);
                }
            }
        }

        try{
            await axios.get(`https://u-progest.herokuapp.com/api/project/${id}`)
            .then(response => {
                updatedProject = response.data.projects;
                console.log(updatedProject);
            })
            .catch(error => {
                this.setState({error : true});
                console.log(error);
            });

            this.setState({         
                id: updatedProject[0]._id,
                projectName: updatedProject[0].projectName,
                description: updatedProject[0].description,
                startingDate: updatedProject[0].startingDate,
                previsionalEndedDate: updatedProject[0].previsionalEndedDate,
                projectAdvancement: updatedProject[0].projectAdvancement,
                projectManager: updatedProject[0].projectManager,
                etat: updatedProject[0].etat 
            })

        }catch(err){
            console.log(err);
        }
    }

    async updateProject () {

        console.log("HERRE ??");
        try{
            await axios
                .patch(`https://u-progest.herokuapp.com/api/project/modification/content/${this.state.id}`, this.state)
                .then(res => 
                    console.log(res)
                )
                .catch(err => console.error(err));
        }catch(err){
            console.log(err);
        }
        this.props.history.push('/')
    }

    backToHome = () => {
        this.props.history.push('/');
    }

    // changeDateStartHandler = (event) => {
    //     if(this.prevState.startingDate !== this.state.startingDate){
    //         this.setState({startingDate: event.target.value});
    //     }
    // }

    // changeDateEndHandler = (event) => {
    //     if(this.prevState.previsionalEndedDate !== this.state.previsionalEndedDate){
    //         this.setState({previsionalEndedDate: event.target.value});
    //     }
    // }

  render() {
    
    return (
        <Aux>
            <div className="block__content">
                <div className="block__entete">
                    <div>
                        <img src={Trombone} alt="" />
                    </div>                    
                    <div>
                        Modification de tâche
                    </div>
                </div>

                <div className="block__name">
                    <div className="block__label__name">
                        Tâche à réaliser :
                    </div>
                    <div>
                        <textarea 
                            className="block__input__name" 
                            id="projectName" 
                            type="text"
                            value={this.state.projectName}
                            name="Tâche à réaliser"
                            onChange={(event) => this.setState({projectName: event.target.value})}    
                        />
                    </div>
                </div>

                <div className="block__description">
                    <div className="block__label__description">
                        Description :
                    </div>
                    <div>
                        <textarea 
                            className="block__input__name" 
                            id="projectDescription" 
                            type="text" 
                            value={this.state.description}
                            name="Description de la tâche à réaliser"
                            onChange={(event) => this.setState({description: event.target.value})}  
                        />
                    </div>
                </div>

                <div className="block__date">
                    <div className="block__date__start">
                        Date de début :
                        <input 
                            className="block__date_start" 
                            type="date" 
                            id="startingDate"
                            value={this.state.startingDate}
                            onChange={(event) => this.setState({startingDate: event.target.value})}
                        />
                    </div>
                    <div className="block__date__end">
                        Date de fin prévisionnelle :
                        <input 
                            type="date" 
                            id="endedPrevisionnalDate"
                            value={this.state.previsionalEndedDate}                           
                            onChange={(event) => this.setState({previsionalEndedDate: event.target.value})}
                        />
                    </div>
                </div>

                <div className="block__button">
                    <div>
                        <button onClick={() => this.backToHome()}>
                            <img src={Accueil} alt=""/>
                            Annuler
                        </button>
                    </div>
                    <div>
                        <button 
                            onClick={() => this.updateProject()}
                            disabled={this.state.projectName !== "" ? false : true}
                        >
                            <img src={addNewProject} alt=""/>
                            Ajouter
                        </button>
                    </div>
                </div>

            </div>
        </Aux>

    );
  }
}

export default ProjectModify;