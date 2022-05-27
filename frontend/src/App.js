//djangoreactapi/frontend/src/App.js

import React, { Component } from 'react';

class App extends Component {
    state = {
        posts: []
    };

    async componentDidMount() {
        try {
            const res = await fetch('http://127.0.0.1:8000/api/');
            const posts = await res.json();
            this.setState({
                posts
            });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div>
                {this.state.posts.map(item => (
                    <div key={item.student_number}>
                        <h1>{item.student_name}</h1>
                        <span>{item.password}</span>
                    </div>
                ))}
            </div>
        );
    }
}

export default App;