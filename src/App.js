import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import logo from './logo.svg';
import './css/App.css';
import LoginControl from './components/setting/Login.jsx';
import Register from './components/setting/Register.jsx';
import MainPage from './components/Main.jsx';

const PrimaryLayout = () => (
  <div className="App">
      <Route path="/" exact component={LoginControl} />
      <Route path="/register" component={Register} />
    <Route path="/main" component={MainPage} />
  </div>
)

// const RegisterPage = () => <div>Register Page</div>
// const HomePage = () => <div>Home Page</div>

const App = () => (
  <BrowserRouter>
    <PrimaryLayout />
  </BrowserRouter>
)

export default App;
