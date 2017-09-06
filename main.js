import React from 'react';
import ReactDOM from 'react-dom';


class Signin extends React.Component {
    render(){
        return(
            <form className="form-signin">
                <h2 className="form-signin-heading"> Please sign in </h2>
                <label htmlFor="inputEmail" className="sr-only"> Email address
                </label>
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus />
                <label htmlFor="inputPassword" className="sr-only"> Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                <button className="btn btn-lg btn-primary btn-block" type="button"> Sign in
                </button>
            </form>
        );
    }
}

ReactDOM.render(<Signin/> ,document.getElementById('app'));