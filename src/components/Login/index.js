import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', displayErrorMsg: false}

  loginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  getUserLogin = async () => {
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const fetchData = await fetch('https://apis.ccbp.in/login', options)
    const jsonLoginData = await fetchData.json()
    if (fetchData.ok === true) {
      this.loginSuccess(jsonLoginData.jwt_token)
    } else {
      this.setState({
        errorMsg: jsonLoginData.error_msg,
        displayErrorMsg: true,
      })
    }
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  updateUsername = event => {
    this.setState({username: event.target.value})
  }

  onSubmitDetails = event => {
    event.preventDefault()
    this.getUserLogin()
  }

  render() {
    const {errorMsg, displayErrorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="home-background-container">
        <div className="first-container">
          <form className="form-container" onSubmit={this.onSubmitDetails}>
            <div className="logo-container">
              <img
                src="https://res.cloudinary.com/ddrhyygst/image/upload/v1635061934/Vector_obyllp.png"
                alt="website logo"
                className="logo-style"
              />
              <h1 className="tasty-kitchen-heading">Tasty Kitchens</h1>
            </div>
            <h1 className="login-heading">Login</h1>
            <div className="input-container">
              <label htmlFor="user" className="label-input">
                Username
              </label>
              <input
                type="text"
                id="user"
                className="user-input"
                onChange={this.updateUsername}
              />
            </div>
            <div className="input-container">
              <label htmlFor="pin" className="label-input">
                Password
              </label>
              <input
                type="password"
                id="pin"
                className="user-input"
                onChange={this.updatePassword}
              />
            </div>
            {displayErrorMsg && <p className="error-message">{errorMsg}</p>}
            <button type="submit" className="login-button-style">
              Login
            </button>
          </form>
        </div>
        <div className="second-login-container">
          <img
            src="https://res.cloudinary.com/ddrhyygst/image/upload/v1634978977/Rectangle_1456_nqgvjl.png"
            alt="website login"
            className="login-picture-style"
          />
        </div>
      </div>
    )
  }
}

export default Login
