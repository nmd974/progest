import React, { Component } from "react"; 
// import SignIn from "../components/SignIn";

import './Auth.css';
import axios from "axios";

let avoir;
let responseData;

class Auth extends Component {
  state={
    pseudo: "",
    password: "",
    confirmPassword: "",
    validPseudo: false,
    isSignUp: false,
    data: null
  }

  componentDidUpdate () {

      // alert(responseData);


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
        console.log("HERE??");
        this.setState({validPseudo: true});
      }
    }
  }
 
  async checkPassword () {
    //alert(this.state);
    // alert("On va commencer");
    if(this.state.password === this.state.confirmPassword){
      try{
        alert("STOP");

        await axios.post("http://localhost:3100/api/users/create", this.state)
        
        this.props.history.push({
          pathname: "/",
          search: "?" + this.state.pseudo
        });

        

      }catch(err){
        console.log(err);
      }
      // this.setState({isSignUp: true});
      // this.props.history.push({
      //   pathname: "/",
      //   search: "?"
      // });
    // }

    }else{
      alert("Le mot de passe de confirmation est différent du mot de passe de base...Ou alors le mot de passe de base est différent de la confirmation du mot de passe..???");
    }
  }

    //Lors de la creation du nouveau compte on active la route vers les projets
  render() {

    // if(responseData){
    //   alert(responseData);
    // }
    return (

        <div className="block_signup">
          <form className="block__form">
            <label>Pseudo :</label>
            <input 
              className="block__input" 
              id="pseudo" 
              type="text"
              value={this.state.pseudo}
              onChange={(event) => this.onChangePseudoHandler(event)}
            />
            <label>Mot de passe :</label>
            <input 
              className="block__input" 
              id="password" 
              type="password" 
              onChange={(event) => this.setState({password: event.target.value})}
            />
            <label>Confirmer mot de passe :</label>
            <input 
              className="block__input" 
              id="confirmPass" 
              type="password" 
              onChange={(event) => this.setState({confirmPassword: event.target.value})}
            />
            <button onClick={() => this.checkPassword()}>Créer un nouveau compte</button>
          </form>
        </div>
        // <div className="block_signup">
        //   TEST ????
        // </div>

    );
  }
}

export default Auth;