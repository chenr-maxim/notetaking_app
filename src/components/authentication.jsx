import React from "react";
import * as api from "../api/index";
import {authenticateUser} from './util/auth_user';

export class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value});
    console.log(this.state);
  }

  signup = () => {
    const { username, password } = this.state;
    const payload = {username,password};
    api.signup(payload)
      .then((res) => {
        console.log(res);
        authenticateUser(res);
      })
      .catch((err) => {
        console.log(err.response.data);
      })
  }

  login = () => {
    const { username, password } = this.state;
    const payload = {username,password};
    api.login(payload)
      .then((res) => {
        console.log(res);
        authenticateUser(res);
      })
      .catch((err) => {
        console.log(err.response.data);
      })
  }

  render() {
    return (
      <div>
        <form>
          <input type="text" placeholder="username" name="username" value={this.state.username} onChange={this.handleChange}></input>
          <input type="password" placeholder="password" name="password" value={this.state.password} onChange={this.handleChange}></input>
        </form>
        <div>
          <button onClick={this.signup}> sign up </button>
          <button onClick={this.login}> login </button>
        </div>
      </div>
    );
  }
}