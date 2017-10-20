import { combineReducers } from 'redux';
import PostReducer from './post-reducer';
import { reducer as formReducer } from 'redux-form';

const store = combineReducers({
  posts: PostReducer,
  form: formReducer
});

export default store;
