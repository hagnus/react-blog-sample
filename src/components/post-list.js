import React, { Component } from "react";
import { fetchPosts } from "../actions"
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

class Post extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    renderPost() {
        return this.props.posts.map((post) => {
            return (
                <li key={ post.title } className="list-group-item">
                    { post.title }
                </li>
            );
        })
    }

    render () {
        return (
            <div>
                <div className="text-xs-right">
                    <Link className="btn btn-primary" to="/posts/new">
                        Add a Post
                    </Link>
                </div> 
                <h3>Post</h3>
                <ul className="list-group">
                    { this.renderPost() }
                </ul>
            </div>
        );
    }
}

function mapStatesToProps( state ) {
    return { posts: state.posts };
}

export default connect(mapStatesToProps, { fetchPosts })(Post);