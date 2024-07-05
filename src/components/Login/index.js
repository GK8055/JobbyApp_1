import './index.css'

import Cookies from 'js-cookie'

import {Component} from 'react'

import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorState: false,
    errMsg: '',
  }

  userNameChange = event => {
    this.setState({username: event.target.value})
  }
  passworChange = event => {
    this.setState({password: event.target.value})
  }

  submitSuccess = token => {
    const {history} = this.props
    const jwtToken = Cookies.set('jwt_token', token, {expires: 20})
    history.replace('/')
  }
  submitFailure = msg => {
    this.setState({errMsg: msg})
  }
  getCropDetails = async () => {
    console.log('called_crop_details')
    const url = 'https://google.com'
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
    }
  }
  SubmitFormDataWithApi = async () => {
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      console.log(data)
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }
  submitFormData = event => {
    event.preventDefault()
    console.log('called')
    this.SubmitFormDataWithApi()
    this.getCropDetails()
  }
  render() {
    const {username, password, errMsg} = this.state
    console.log(errMsg)
    const jwttoken = Cookies.get('jwt_token')
    if (jwttoken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login_container">
        <div className="logo_container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="logo_size"
            alt="website logo"
          />
          <h1 className="company_name">Jobby</h1>
        </div>
        <form className="form_container" onSubmit={this.submitFormData}>
          <label className="label_text" htmlFor="username">
            USERNAME
          </label>
          <br />
          <input
            type="text"
            className="input_ele"
            id="username"
            onChange={this.userNameChange}
            value={username}
            placeholder="Username"
          />
          <br />
          <label className="label_text" htmlFor="password">
            PASSWORD
          </label>
          <br />
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="input_ele"
            value={password}
            onChange={this.passworChange}
          />
          <br />
          <button className="login_btn" type="submit">
            Login
          </button>
          <p className="error_msg">{errMsg}</p>
        </form>
      </div>
    )
  }
}

export default Login
