import React, { Component } from 'react';
//import {Link} from 'react-router-dom';
import '../css/bootstrap.css';
import '../css/NavBar.css';


export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  setNavBar(logged){
    if (logged) {
        return <a onClick={()=>this.setNavBar(true)} className="nav-link topicos title active" href="/">Sair</a>
    } else {
        return <a className="nav-link topicos title active" href="/LoginPage">Login</a>

    }
  }
    render(){
	return(
      <nav className="navbar navbar-expand-sm navbar-dark new-bg-dark fixed-top">
       <a className=" navbar-right" href="#">Gerencia Mais</a>
       <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
         <span className="navbar-toggler-icon"></span>
       </button>

       <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav mr-auto">
           <li className="nav-item active divider-vertical">
             <a className="nav-link topicos active title" href="/">Home</a>
           </li>
           <li className="nav-item divider-vertical">
             {this.setNavBar(false)}
           </li>
         </ul>
       </div>
      </nav>








	);
    }
}
