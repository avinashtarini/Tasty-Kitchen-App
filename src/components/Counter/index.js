import {Component} from 'react'

import './index.css'

class Counter extends Component {
  state = {count: 0, displayAdd: true}

  onIncrement = () => {
    const {cartItem, incrementCartCount} = this.props
    const {id} = cartItem
    incrementCartCount(cartItem)
  }

  onDecrement = () => {
    const {cartItem, decrementCartCount} = this.props
    const {id} = cartItem
    decrementCartCount(cartItem)
  }

  render() {
    const {count} = this.state
    const {cartItem} = this.props
    return (
      <div>
        <button testid="active-count" type="button" onClick={this.onDecrement}>
          -
        </button>
        <div testid="active-count">{count}</div>
        <button
          testid="decrement-count"
          type="button"
          onClick={this.onIncrement}
        >
          +
        </button>
      </div>
    )
  }
}

export default Counter
