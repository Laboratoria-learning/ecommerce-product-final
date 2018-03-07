import React from 'react';
import {render} from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './components/App';
// import MercadoLibreApp from './components/Global/MercadoLibreApp';
import registerServiceWorker from './registerServiceWorker';

firebase.initializeApp({
  apiKey: "AIzaSyDQ0HfeDf7nMVWa4SsJU3eQGHlhmN4UX5E",
  authDomain: "pretabajo-react.firebaseapp.com",
  databaseURL: "https://pretabajo-react.firebaseio.com",
  projectId: "pretabajo-react",
  storageBucket: "",
  messagingSenderId: "797792105313"
});

render(<App />, document.getElementById('root'));
registerServiceWorker();
