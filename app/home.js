import React, { Component } from 'react';
import ReactDOM from 'react-dom';




class App extends Component {
    render() {
        return(
            <div className="container">
                <Content/>
                <Footer />
            </div>
        );
    }
}

class Content extends Component {
    render() {
        return(
            <div>
                <div className="header clearfix">
                    <nav>
                        <ul className="nav nav-pills pull-right">
                            <li role="presentation" className="active"><a href="#">Home</a></li>
                            <li role="presentation"><a href="#">Add</a></li>
                            <li role="presentation"><a href="#">Logout</a></li>
                        </ul>
                    </nav>
                    <h3 className="text-muted">React Blog App</h3>
                </div>

                <div className="jumbotron">
                    <div className="list-group"> <a href="#" className="list-group-item active"> <h4 className="list-group-item-heading">List group item heading</h4> <p className="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p> </a> <a href="#" className="list-group-item"> <h4 className="list-group-item-heading">List group item heading</h4> <p className="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p> </a> <a href="#" className="list-group-item"> <h4 className="list-group-item-heading">List group item heading</h4> <p className="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p> </a> </div>
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