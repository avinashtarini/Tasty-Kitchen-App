import {Link} from 'react-router-dom'
import './index.css'

const NotFound = props => (
  <div className="not-found-container">
    <img
      src="https://image.freepik.com/free-photo/3d-word-oops_58466-5983.jpg"
      alt="not found"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="para-not-found">
      we are sorry, the page you requested could not be found Please go back to
      the homepage
    </p>
    <Link to="/">
      <button type="button" className="not-found-btn">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
