import Header from '../Header'
import Footer from '../Footer'

const Cart = () => {
  const details = localStorage.getItem('cartList')
  console.log(details)
  return (
    <>
      <Header />
      <h1>Cart</h1>
      <Footer />
    </>
  )
}

export default Cart
