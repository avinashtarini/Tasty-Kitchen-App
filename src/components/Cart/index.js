import Header from '../Header'
import Footer from '../Footer'
import EmptyCart from '../EmptyCart'
import DisplayCartList from '../DisplayCartList'

const Cart = () => {
  const checkCartCondition = () => {
    const cartDataInLocalStorage = JSON.parse(localStorage.getItem('cartData'))
    if (
      cartDataInLocalStorage === null ||
      cartDataInLocalStorage.length === 0
    ) {
      return <EmptyCart />
    }
    return <DisplayCartList />
  }

  return (
    <>
      <Header />
      {checkCartCondition()}
      <Footer />
    </>
  )
}

export default Cart
