import React, { Component } from 'react'
import Post from './Post'
import SearchBox from './SearchBox';
class HomePage extends Component {
    constructor() {
        super()

        this.state = { posts: [],searchfield: ''}
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
                .then((response) => this.setState({
                    posts : response
                }))
    }
    onSearchChange = (event) => {
        console.log("calling")
        this.setState({ searchfield: event.target.value })
      }
    

    render() {
        let searchedPosts = this.state.posts.filter(post =>{
            return post.title.toLowerCase().includes(this.state.searchfield.toLowerCase());
          })
        let posts = searchedPosts && searchedPosts.map((element, key) => 
            <Post key={key} id={element.id} title={element.title} description={element.body}/>
        )
        return (
                <div className='tc'>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <div className="container articles-container">
                        { posts }
                    </div>
                </div>
        )
    }
}

export default HomePage