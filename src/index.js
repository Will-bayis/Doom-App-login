import React from "react";
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.scss';

// Redux
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// Ajoutez ces imports pour résoudre les erreurs
import { composeWithDevTools } from 'redux-devtools-extension';
import { getUsers } from "./actions/users.actions";
import { getPosts } from "./actions/post.actions";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)) // Utilisez composeWithDevTools pour activer Redux DevTools
);

store.dispatch(getUsers());
store.dispatch(getPosts());

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
