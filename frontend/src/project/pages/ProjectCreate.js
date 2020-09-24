import React, { Component } from "react"; 
import Aux from "../../hoc/Auxiliary";
import './ProjectContentHandler.css';
import addNewProject from "../components/images/addNewProject.png";
import Accueil from "../components/images/accueil.png";
import axios from "axios";
import Trombone from "../components/images/trombone.png";

class ProjectCreate extends Component {

    state={
        projectName: null,
        description: "",
        startingDate: new Date(),
        previsionalEndedDate: "",
        projectAdvancement: "0",
        projectManager: "",
        etat: "En cours"

    }

    componentDidMount () {
        this.setState({projectManager: localStorage.getItem("pseudo")})
    }

    async addNewProject () {
        try{
            await axios
                .post(`https://progest.herokuapp.com/api/project/create`, this.state)
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

  render() {

    return (
        <Aux>
            <div className="block__content">
                <div className="block__entete">
                    <div>
                        <img src={Trombone} alt="" />
                    </div>                    
                    <div>
                        Ajout d'une nouvelle tâche
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
                            onChange={(event) => this.setState({startingDate: event.target.value})}  
                        />
                    </div>
                    <div className="block__date__end">
                        Date de fin prévisionnelle :
                        <input 
                            type="date" 
                            id="endedPrevisionnalDate"                            
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
                            onClick={() => this.addNewProject()}
                            disabled={this.state.projectName !== null ? false : true}
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

export default ProjectCreate;