import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from  'axios';
import {Router, Route, Link, IndexRoute, IndexLink, hashHistory, browserHistory} from 'react-router';

class App extends Component {
    render() {
        return(
            <Router history={browserHistory}>
                <Route path="/home" component={homeContent} />
                <Route path="/add" component={addContent}/>
            </Router>
        );
    }
}

class homeContent extends Component {
    constructor(props){
        super(props);
        this.state ={
            post: ''
        };
        this.postRenderEvent =  this.postRenderEvent.bind(this);
    }

    postRenderEvent(){
        let postRenderArray = [];
        axios.get('/allPost',{
            params:{
                user_id: localStorage.getItem("user_id")
            }
        }).then(function(data) {
            this.setState({
                post: data
            })
        });

        console.log(localStorage.getItem("user_id"));

        this.state.post.map(function(_post, i){
             postRenderArray.push(
                <a href="#" className="list-group-item active" key={i}>
                    <h4 className="list-group-item-heading">_post.title</h4>
                    <p className="list-group-item-text">_post.subject</p>
                </a>
            );
        });

        return postRenderArray.length > 0 ? postRenderArray : "You haven't post anything yet.";
    }


    render(){
        return(
            <div>
                <div className="header clearfix">
                    <nav>
                        <ul className="nav nav-pills pull-right">
                            <li role="presentation" className="active"><a>Home</a></li>
                            <li role="presentation"><Link to="/add">Add</Link></li>
                            <li role="presentation"><a href="/logout">Logout</a></li>
                        </ul>
                    </nav>
                    <h3 className="text-muted">React Blog App</h3>
                </div>
                <div className="jumbotron">
                    <div className="list-group">
                        {this.postRenderEvent()}
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

class addContent extends Component{
    render() {
        return(
            <div>
                <div className="header clearfix">
                    <nav>
                        <ul className="nav nav-pills pull-right">
                            <li role="presentation"><Link to="/home">Home</Link></li>
                            <li role="presentation" className="active"><a>Add</a></li>
                            <li role="presentation"><a href="/logout">Logout</a></li>
                        </ul>
                    </nav>
                    <h3 className="text-muted">React Blog App</h3>
                </div>
                <AddPostForm />
                <Footer/>
            </div>
        )
    }
}

class AddPostForm extends Component {
    constructor(props){
        super(props);
        this.titleChangeEvent = this.titleChangeEvent.bind(this);
        this.subjectChangeEvent = this.subjectChangeEvent.bind(this);
        this.addPost = this.addPost.bind(this);
        this.state = {
            title:'',
            subject:''
        };
    }

    titleChangeEvent(e){
        this.setState({
            title: e.target.value
        });
    }

    subjectChangeEvent(e){
        this.setState({
            subject: e.target.value
        })
    }

    addPost(){
        axios.post('/addPost',{
            title: this.state.title,
            subject:this.state.subject
        }).then(function(response){
            console.log(response);
            if(response.errorCode) {
                throw response.errorMessage;
            } else if(response && response !== "Failure") {
                window.location = "home";
            } else{
                console.log("Please dont leave empty");
            }
        }).catch(function(err){
            console.log(err);
        });
    }

    render(){
        return(
            <div>
                <div className="form-group">
                    <input type="text" onChange={this.titleChangeEvent} className="form-control" id="title" name="title" placeholder="Title" required />
                </div>

                <div className="form-group">
                    <textarea className="form-control" onChange={this.subjectChangeEvent} type="textarea" id="subject" placeholder="Subject" maxlength="140" rows="7"></textarea>
                    <button className="btn btn-lg btn-primary btn-block" type="button" onClick={this.addPost}> Sign in
                    </button>
                </div>
            </div>
        );
    }
}


class Footer extends Component {
    render() {
        return(
            <footer className="footer">
                <p>&copy; 2017 KenLau, Inc.</p>
            </footer>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));