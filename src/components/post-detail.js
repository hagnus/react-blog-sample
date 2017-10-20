import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { createPost } from "../actions"

class PostDetail extends Component {
    constructor(props) {
        super(props);
        
        this.onFormSubmmit = this.onFormSubmmit.bind(this);
    }

    renderField(field) {
        const formClassName = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;
        
        return (
            <div className={formClassName}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text" 
                    { ...field.input } />              
                <div 
                    hidden={!field.meta.error}
                    className="text-help"
                    role="alert">
                    { field.meta.touched ? field.meta.error : '' }
                </div>
            </div>
        );
    }

    onFormSubmmit(postValues) {
        console.log(postValues);
        this.props.createPost(postValues);
    }

    render () {
        const { handleSubmit } = this.props;
        
        return (
            <div>
                <form
                    onSubmit={ handleSubmit(this.onFormSubmmit) }> 
                    <Field 
                        label="Title" 
                        name="title" 
                        component={this.renderField}>
                    </Field>
                    <Field 
                        label="Categories"
                        name="categories" 
                        component={this.renderField}>
                    </Field>
                    <Field 
                        label="Post Content"
                        name="content" 
                        component={this.renderField}>
                    </Field>
                    <button type="submit" className="btn btn-primary">
                        Save
                    </button>
                    <Link to="/" className="btn btn-danger">
                        Cancel
                    </Link>
                </form>
            </div>
        );
    };
};

function validate(values) {
    const errors = {};

    if (!values.title) {
        errors.title = "Please, define a title to this post!"
    }

    if (!values.categories) {
        errors.categories = "Please, define a category to this post!"
    }

    if (!values.content) {
        errors.content = "Please, fill some content in this post!"

    } else if (values.content.length < 10) {
        errors.content = "The content of your post is too small"
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
}) ( connect(null, { createPost }) (PostDetail));