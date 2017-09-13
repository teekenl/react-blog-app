import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Router, Route, Link, IndexRoute, IndexLink, hashHistory, browserHistory} from 'react-router';

const myStyle = {
    cursor: 'pointer'
};

class App extends Component {
    render() {
        return(
            <Router history={browserHistory}>
                <Route path="/home" component={homeContent} />
                <Route path="/add" component={addContent}/>
                <Route path="/edit" component={editContent}/>
            </Router>
        );
    }
}

class homeContent extends Component {
    constructor(props){
        super(props);
        this.state ={
            post: []
        };
    }

    componentDidMount(){
        let self = this;
        axios.get('/allPost').then(function(response) {
            let postRenderResult = response.data;
            return new Promise(function(resolve, reject){
                resolve(postRenderResult);
            })
        }).then(function(post) {
            self.setState({
                post: post
            });
        });
    }

    editPostHandlerEvent(_id){
        // INSERT TODO HERE
        axios.post('/editPost',{post_id: _id},
            function(response){
            if(response.data.errorCode) {
                return new Promise(function(resolve, reject){
                    console.log("error");
                    reject(response.data.message);
                }).catch(function(err){
                    console.log(err);
                });
            } else{
                return new Promise(function(resolve, reject) {
                    resolve(response.data);
                });
            }
        }).then(function (success) {
            if(success) {
                this.props.history.push('/edit');
            }
        }) ;

    }

    deletePostHandlerEvent(_id){

        axios.post('/deletePost',{
           post_id: _id
        },function(response){
            if(response.data.errorCode) {
                return new Promise(function(resolve, reject){
                    console.log("error");
                    reject(response.data.message);
                }).catch(function(err){
                    console.log(err);
                });
            } else{
                return new Promise(function(resolve, reject) {
                    resolve(response.data);
                })
            }
        }).then(function(success){
            if(success) console.log("success");
        }).catch(function(err){
            if(err) throw err;
        });
    }

    render(){
            return(
                <div className="container">
                    <div className="header clearfix">
                        <nav>
                            <ul className="nav nav-pills pull-right">
                                <li role="presentation" className="active"><a>Home</a></li>
                                <li role="presentation"><Link to="/add">Add</Link></li>
                                <li role="presentation"><a href="/logout">Logout</a></li>
                            </ul>
                        </nav>
                        <h3 className="text-muted">Blogging Application</h3>
                    </div>

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>.</th>
                                <th>Title</th>
                                <th>Subject</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.post.map(function(_post, index) {
                                    return <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{_post.title}</td>
                                                <td>{_post.subject}</td>
                                                <td >
                                                    <span style={myStyle} onClick={this.editPostHandlerEvent.bind(this,_post._id)} className="glyphicon glyphicon-pencil"></span>
                                                </td>
                                                <td>
                                                    <span style={myStyle} onClick={this.deletePostHandlerEvent.bind(this,_post._id)} className="glyphicon glyphicon-remove"></span>
                                                </td>
                                             </tr>
                                }.bind(this))
                            }
                        </tbody>
                    </table>
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
                    <h3 className="text-muted">Blogging Application</h3>
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

class editContent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render(){
        return(
            <div>s</div>
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