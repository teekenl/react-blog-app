import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Router, Route, Link, IndexRoute, IndexLink, hashHistory, browserHistory} from 'react-router';

class Signin extends Component {
    constructor(props){
        super(props);
        this.state = {
            email : "",
            password: ""
        };

        this.formSignIn = this.formSignIn.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleEmailChange(e){
        this.setState({ email: e.target.value });
    }

    handlePasswordChange(e){
        this.setState({ password: e.target.value});
    }

    formSignIn(){
        axios.post('/login',{
            email: this.state.email,
            password: this.state.password
        }).then(function(response) {
            console.log(response);
            if(response.errorCode) {
                throw response.errorMessage;
            } else if(response && response !== "Failure") {
                localStorage.setItem("userid",response._id);
                localStorage.setItem("username",response.name);
                window.location="home";
            } else{
                console.log("Please don't leave username or password blank");
            }
        }).catch(function(err) {
            if(err) console.log(err);
        });
         // alert(this.state.email + " " + this.state.password);*/
    }

    render(){
        return(
            <div>
                <form className="form-signin">
                    <h2 className="form-signin-heading"> Please sign in </h2>
                    <label htmlFor="inputEmail" className="sr-only"> Email address
                    </label>
                    <input type="email" id="inputEmail" className="form-control" onChange={this.handleEmailChange} placeholder="Email address" required/>
                    <label htmlFor="inputPassword" className="sr-only"> Password</label>
                    <input type="password" id="inputPassword" className="form-control" onChange={this.handlePasswordChange} placeholder="Password" required />
                    <button className="btn btn-lg btn-primary btn-block" type="button" onClick={this.formSignIn}> Sign in
                    </button>
                </form>
                <div><Link to="/signup">{'Signup'}</Link></div>
            </div>
        );
    }
}

class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email : "",
            password: ""
        };

        this.formSignUp = this.formSignUp.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleEmailChange(e){
        this.setState({ email: e.target.value });
    }

    handlePasswordChange(e){
        this.setState({ password: e.target.value});
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value});
    }

    formSignUp() {
        axios.post('/register',{
            'name': this.state.name,
            'email': this.state.email,
            'password': this.state.password
        }).then(function(response) {
            if(response.errorCode) {
                throw response.errorMessage;
            } else if(response && response !== "Failure"){
                localStorage.setItem("user_id",response._id);
                localStorage.setItem("username",response.name);
                window.location="home";
            } else{
                console.log("Please don't leave username, email or password blank");
            }
        }).catch(function(err) {
            if (err) console.log(err); // error prompt message
        });
        //alert(this.state.email + " " + this.state.password );
    }

    render() {
        return(
            <div>
                <form className="form-signin">
                    <h2 className="form-signin-heading">Please sign up</h2>
                    <label htmlFor="inputName" className="sr-only">Name</label>
                    <input type="name" onChange={this.handleNameChange} id="inputName" className="form-control" placeholder="Name" required />
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="email" onChange={this.handleEmailChange} id="inputEmail" className="form-control" placeholder="Email address" required  />
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" onChange={this.handlePasswordChange} id="inputPassword" className="form-control" placeholder="Password" required />
                    <button className="btn btn-lg btn-primary btn-block" onClick={this.formSignUp} type="button">Sign up</button>
                </form>
                <div><Link to="/">{'Signin'}</Link></div>
            </div>
        );
    }
}


class App extends Component {
    render(){
        return(
            <Router history={browserHistory}>
                <Route path="/" component={Signin} />
                <Route path="/sigin" component={Signin} />
                <Route path='/signup' component={Signup}/>
            </Router>
        );
    }
}

ReactDOM.render(<App/>,document.getElementById('app'));