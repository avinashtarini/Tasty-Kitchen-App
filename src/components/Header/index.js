import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import './index.css'

class Header extends Component {
  state = {isMobileState: false}

  logoutButton = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  displayIcons = () => {
    this.setState(prevMode => ({
      isMobileState: !prevMode.isMobileState,
    }))
  }

  render() {
    const {isMobileState} = this.state
    console.log(isMobileState)
    return (
      <>
        <nav className="nav-container">
          <Link to="/" className="text-link">
            <div className="icon-header-container">
              <img
                src="https://res.cloudinary.com/ddrhyygst/image/upload/v1635061934/Vector_obyllp.png"
                alt="website logo"
                className="header-icon"
              />
              <h1 className="header-heading">Tasty Kitchen</h1>
            </div>
          </Link>
          <ul className="ul-header-list">
            <Link to="/" className="text-link">
              <li className="list-header-item">Home</li>
            </Link>
            <Link to="/cart" className="text-link">
              <li className="list-header-item">Cart</li>
            </Link>
            <li className="list-header-item">
              <button
                type="button"
                onClick={this.logoutButton}
                className="header-logout"
              >
                Logout
              </button>
            </li>
          </ul>
          <button
            type="button"
            onClick={this.displayIcons}
            className="icons-display"
          >
            <GiHamburgerMenu className="hamburger-icon" />
          </button>
        </nav>
        {isMobileState && (
          <ul className="ul-header-list-mobile">
            <Link to="/" className="text-link">
              <li className="list-header-item">Home</li>
            </Link>
            <Link to="/cart" className="text-link">
              <li className="list-header-item">Cart</li>
            </Link>
            <li className="list-header-item">
              <button
                type="button"
                onClick={this.logoutButton}
                className="header-logout"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </>
    )
  }
}

export default withRouter(Header)
