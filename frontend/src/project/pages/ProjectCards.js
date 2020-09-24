import React, { Component } from "react"; 
import Aux from "../../hoc/Auxiliary";
import ProjectList from "../components/ProjectList/ProjectList";
import axios from "axios";
import Spinner from "../../shared/components/Spinner/Spinner";
import AddNewProject from "../components/images/valider.png";
import Show from "../components/images/show.png";
import {withRouter} from "react-router-dom";

let responseData;
class ProjectUser extends Component {

    state = {
        projects: [],
        loading: true,
        userID: null,
        error: false
    }



    async componentDidMount () {
        // console.log("JE PASSE LA ??");
        let pseudo;
        // while (!pseudo) {
        //     pseudo = localStorage.getItem("pseudo");
        // }
        pseudo = localStorage.getItem("pseudo");
        // console.log(pseudo);
        if(pseudo){
            try{
                responseData = await axios.get(`https://u-progest.herokuapp.com/api/project/user/${pseudo}`)
                this.setState({projects : responseData.data.projects, loading : false});
            }catch(err){
                this.setState({error : true});
                console.log(err);
            }
            
            // .then(response => {
            //     this.setState({projects : response.data.projects, loading : false});
            // })
            // .catch(error => {
            //     this.setState({error : true});
            //     console.log(error);
            // });
        }else{
            this.setState({loading : false});
        }

    }

    createNewProject = () => {
        this.props.history.push('/project/create');
    }

    updateProjectHandler = (id) => {
 
        this.props.history.push({
            pathname: '/project/update',
            search: "?" + id
        });
    }
//https://progest.herokuapp.com
    removeAdvancementHandler = (id) => {
        const updatedProject = [...this.state.projects];
        const index = updatedProject.findIndex(project => project._id === id);
        const oldAvancement = Number(updatedProject[index].projectAdvancement);
        const updatedAvancement = oldAvancement - 10;
        updatedProject[index].projectAdvancement = updatedAvancement.toString();
        try{
            axios.patch(`https://u-progest.herokuapp.com/api/project/modification/${id}`, updatedProject[index])
            .then(response => {
                console.log("Modification effectuée", response.data);
            })
            .catch(error => {
                this.setState({error : true});
                console.log(error);
            });
        }catch(err){
            console.log(err);
        }
        this.setState({projects: updatedProject})
    }

    addAdvancementHandler = (id) => {
        const updatedProject = [...this.state.projects];
        const index = updatedProject.findIndex(project => project._id === id);
        const oldAvancement = Number(updatedProject[index].projectAdvancement);
        const updatedAvancement = oldAvancement + 10;
        updatedProject[index].projectAdvancement = updatedAvancement.toString();
        try{
            axios.patch(`https://u-progest.herokuapp.com/api/project/modification/${id}`, updatedProject[index])
            .then(response => {
                console.log("Modification effectuée", response.data);
            })
            .catch(error => {
                this.setState({error : true});
                console.log(error);
            });
        }catch(err){
            console.log(err);
        }
        this.setState({projects: updatedProject})
    }

    validateProjectHandler = (id) => {

        // console.log("ENTREE FONCTION", this.state.projects);
        const updatedProject = [...this.state.projects];
        const index = updatedProject.findIndex(project => project._id === id);
        const updatedAvancement = 100;
        updatedProject[index].projectAdvancement = updatedAvancement.toString();
        console.log(updatedProject[index]);

        try{
            axios.patch(`https://u-progest.herokuapp.com/api/project/validation/${id}`, updatedProject[index])
            .then(response => {
                console.log("Modification effectuée", response.data);
            })
            .catch(error => {
                this.setState({error : true});
                console.log(error);
            });
        }catch(err){
            console.log(err);
        }

        this.setState({projects: updatedProject})

    }

    onCancelProjectHandler = (id) => {

        let updatedProject = [...this.state.projects];
        const index = updatedProject.findIndex(project => project._id === id);
        updatedProject.splice(index, 1);

        axios.delete(`https://u-progest.herokuapp.com/api/project/${id}`)
        .then(response => {
            console.log("Suppression effectuée", response.data);
        })
        .catch(error => {
            this.setState({error : true});
            console.log(error);
        });

        this.setState({projects : updatedProject});
    }
   

  render() {
    
    let content = this.state.error ? <Aux><p>Les projets ne peuvent pas être chargés</p></Aux> : <Spinner/>;

    if (this.state.loading) {
        // console.log("LOADING");
        content = (
            <Aux>
                <Spinner/>
            </Aux>
        )
    }

    if (this.state.projects && !this.state.loading){
        // console.log("CHARGEMENT");
        content = (
            <Aux>
                <div className="block__button__entete">
                <button 
                    onClick={this.createNewProject}
                    className="boutonAdd"
                >
                    <img src={AddNewProject} alt="Ajouter un nouveau projet"/>

                </button>
                <div className="show__button">
                <button 
                    onClick={() => document.location.reload()}
                    className="boutonAdd"
                >
                    <img src={Show} alt="Ajouter un nouveau projet"/>

                </button>
                </div>
                </div>
                <ProjectList 
                    items={this.state.projects}
                    onRemoveAdvancementHandler={this.removeAdvancementHandler}
                    onAddAdvancementHandler={this.addAdvancementHandler}
                    onValidateProjectHandler={this.validateProjectHandler}
                    onCancelProjectHandler={this.onCancelProjectHandler}
                    onUpdateProjectHandler={this.updateProjectHandler}
                />
            </Aux>
            
        )
    }
    if (!this.state.projects && this.state.loading){
        // console.log("CHARGEMENT");
        content = (
            <Aux>
                <button 
                    onClick={this.createNewProject}
                    className="boutonAdd"
                >
                    <img src={AddNewProject} alt="Ajouter un nouveau projet"/>
                </button>
                <h1 style={{color: 'white', marginTop: '250px'}}>Welcome on my new project, please add some new tasks to manage</h1>
            </Aux>
            
        )
    }


    return (
        <Aux>
            {content}
        </Aux>
    );
  }
}

export default withRouter(ProjectUser);