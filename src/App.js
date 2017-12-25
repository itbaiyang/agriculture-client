import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import logo from './logo.svg';
import './css/App.css';
import LoginControl from './components/Login.jsx';
import MainPage from './components/Main.jsx';

const PrimaryLayout = () => (
  <div className="App">
      <Route path="/" exact component={LoginControl} />
      <Route path="/register" component={RegisterPage} />
    <Route path="/main" component={MainPage} />
  </div>
)

const RegisterPage = () => <div>Register Page</div>
// const HomePage = () => <div>Home Page</div>

const App = () => (
  <BrowserRouter>
    <PrimaryLayout />
  </BrowserRouter>
)

export default App;
