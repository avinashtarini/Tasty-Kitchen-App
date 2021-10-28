import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <img
        src="https://res.cloudinary.com/ddrhyygst/image/upload/v1635423068/Vector_zehqa2.jpg"
        alt="website-footer-logo"
      />
      <h1 className="footer-heading">Tasty Kitchens </h1>
      <p className="footer-para">
        The only thing we are serious about is food. Contact us on
      </p>
      <div className="icons-container-footer">
        <FaPinterestSquare
          testid="pintrest-social-icon"
          className="social-icons"
        />
        <FaInstagram testid="instagram-social-icon" className="social-icons" />
        <FaTwitter testid="twitter-social-icon" className="social-icons" />
        <FaFacebookSquare
          testid="facebook-social-icon"
          className="social-icons"
        />
      </div>
    </div>
  )
}
