import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get(`https://practiceapi.devmountain.com/api/posts`)
    .then(res => {
      // console.log(res)
      this.setState({posts: res.data})

    })
    .catch(err => console.log(err))
  }
  
  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, { text })//finds id number then replaces text with new text.
    .then(res => {
      this.setState({ posts: res.data})//it then assigns new data to this.state.posts
    })
    .catch(err => console.log(err))
  
  }
 
  deletePost( id ) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
    .then(res => {
      this.setState({posts: res.data})
    })
    .catch(err => console.log(err))
  }

  createPost(text) {
    axios.post('https://practiceapi.devmountain.com/api/posts', {text})
    .then( res => {
      this.setState({posts: res.data})
    })
    .catch(err => console.log(err))
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost} />
          {
            posts.map( e => (
              <Post key={ e.id } 
                    text={ e.text }
                    date={ e.date }
                    id={ e.id }
                    updatePostFn={this.updatePost}
                    deletePostFn={this.deletePost}/>
            ))
          }
          
        </section>
      </div>
    );
  }
}

export default App;
