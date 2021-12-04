import {Link} from 'react-router-dom'

const EmptyCart = () => (
  <div className="empty-cart-container">
    <img
      src="https://image.freepik.com/free-vector/realistic-plastic-shopping-cart-concept_109313-148.jpg"
      alt="empty cart"
    />
    <h1>No Order Yet!</h1>
    <p>Your cart is empty. Add something from the menu.</p>
    <Link to="/">
      <button type="button">Order Now</button>
    </Link>
  </div>
)
export default EmptyCart
