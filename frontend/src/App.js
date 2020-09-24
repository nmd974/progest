import React, { Component } from 'react';
import {Route,Switch, Redirect} from 'react-router-dom';
import './App.css'
import Project from "./project/pages/ProjectCards";
import BarreNav from "./shared/components/Naviguation/BarreNav";
import ProjectCreate from "./project/pages/ProjectCreate";
import ProjectModify from "./project/pages/ProjectModify";
import './user/pages/Auth.css';
import axios from "axios";

let pseudo;
let responseData;
let storage;
    

class App extends Component {

  state={
    pseudo: "",
    isLoggedIn: false,
    mode: "signup",
    onSignup: false,
    onLogin: false
  }

  componentDidMount () {
    storage = localStorage.getItem("pseudo");
    console.log(storage);
    if(storage){
      this.setState({isLoggedIn: true});
    }else{
      this.setState({isLoggedIn: false})
    }
  }


  async componentDidUpdate () {
      //Creation de compte
      if
        (
          this.state.password 
          && this.state.confirmPassword
          && this.state.password === this.state.confirmPassword 
          && this.state.onSignup === true
        )
        {
          let body = this.state;

          try{
            responseData = await axios.post(`https://progest.herokuapp.com/api/users/signup`, body);
            while (!responseData) {
              
            }
            pseudo = this.state.pseudo;
            localStorage.setItem("pseudo", pseudo);
            storage = localStorage.getItem("pseudo");
            this.setState({onSignup: false})
          }catch (err){
            alert("Ce pseudo est déjà utilisé");
            document.location.reload();
          }
          
          
        }

      //Connexion compte existant
      if(this.state.onLogin){

        let body = this.state;

        try{
          responseData = await axios.post(`https://progest.herokuapp.com/api/users/login`, body)
          pseudo = responseData.data.userId;          
          localStorage.setItem("pseudo", pseudo);
          this.setState({onLogin: false})

        }catch (err){
          alert("Le mot de passe ou le nom d'utilisateur est incorrect");
          document.location.reload();
        }
      }
  }

  changeModeHandler = () => {
    if(this.state.mode === "signup"){
      this.setState({mode : "login"})
    }else{
      this.setState({mode : "signup"})
    }
  }
  
  onChangePseudoHandler = (event) => {
    for (let i = 0; i < event.target.value.length; i++) {
      const caractere = event.target.value[i];
      if(caractere === " "){
        this.setState({pseudo: ""});
        alert("Le pseudo ne dois pas comporter d'espace");
      }     
      if(caractere !== " ") {
        this.setState({pseudo: event.target.value});
      }
      if(caractere !== " " && i === event.target.value.length){
        this.setState({validPseudo: true});
      }
    }
  }

  connectingTo = () => {

    if(!this.state.password){
      alert("Veuillez saisir le mot de passe");
    }

    if(!this.state.pseudo){
      alert("Veuillez saisir le pseudo enregistré");
    }

    if(this.state.password){
      this.setState({isLoggedIn: true, onLogin: true})
    }

  }

  checkPassword = () => {

    if(!this.state.password && !this.state.confirmPassword){
        alert("Veuillez saisir un mot de passe")
        document.location.reload();
    }
    if(this.state.pseudo === ""){
      alert("Veuillez saisir un pseudo")
      document.location.reload();
  }
    if(this.state.password === this.state.confirmPassword && this.state.password && this.state.confirmPassword)
      {
        this.setState({onSignup: true, isLoggedIn: true});
      }
    if(this.state.password !== this.state.confirmPassword && this.state.password && this.state.confirmPassword){
      alert("Le mot de passe de confirmation est différent du mot de passe de base...Ou alors le mot de passe de base est différent de la confirmation du mot de passe..???");
    }
  }


  render () {
    let content;
    console.log(storage);
    if(!storage && this.state.mode === "signup"){
      content=(
          <div className="block_signup">
          <form className="block__form">
            <label>Pseudo :</label>
            <input 
              className="block__input" 
              id="pseudoS" 
              type="text"
              value={this.state.pseudo}
              onChange={(event) => this.onChangePseudoHandler(event)}
            />
            <label>Mot de passe :</label>
            <input 
              className="block__input" 
              id="passwordS" 
              type="password" 
              onChange={(event) => this.setState({password: event.target.value})}
            />
            <label>Confirmer mot de passe :</label>
            <input 
              className="block__input" 
              id="confirmPassS" 
              type="password" 
              onChange={(event) => this.setState({confirmPassword: event.target.value})}
            />
            <button onClick={this.checkPassword}>Créer un nouveau compte</button>
            <button onClick={() => this.changeModeHandler()}>Compte déjà créé? Cliquez pour vous connecter</button>
          </form>
        </div>
      );
    }

    
    if(!storage && this.state.mode === "login"){
          content = (<div className="block_signup">
          <form className="block__form">
            <label>Pseudo :</label>
            <input 
              className="block__input" 
              id="pseudoL" 
              type="text"
              value={this.state.pseudo}
              onChange={(event) => this.onChangePseudoHandler(event)}
            />
            <label>Mot de passe :</label>
            <input 
              className="block__input" 
              id="passwordL" 
              type="password" 
              onChange={(event) => this.setState({password: event.target.value})}
            />
            <button onClick={this.connectingTo}>Se connecter</button>
            <button onClick={() => this.changeModeHandler()}>Créer un nouveau compte</button>
          </form>
        </div>
          );
    }
    

    if(this.state.isLoggedIn){
      return (

                <div>
                  <BarreNav/>
                  <main className="app">
                  <Switch>
                    <Route path="/" exact>
                      <Project/>
                    </Route>
                    <Route path='/project/create' exact component={ProjectCreate}/>
                    <Route path='/project/update' exact component={ProjectModify}/>
                    <Redirect to='/'/>
                  </Switch>
                  </main>
                </div>

      );
    }else{
      return (

        <div>
          <BarreNav/>
          <main className="app">          
          <Switch>
            <Redirect to='/auth'/>
          </Switch></main>
          {content}
        </div>

      );
    }
  }
    
}

export default App;