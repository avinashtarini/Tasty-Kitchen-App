const Add = props => {
  const {cartDetails, addToCart} = props

  const addFoodItemsToCart = () => {
    addToCart(cartDetails)
  }

  return (
    <button onClick={addFoodItemsToCart} type="button" className="add-btn">
      Add
    </button>
  )
}

export default Add
