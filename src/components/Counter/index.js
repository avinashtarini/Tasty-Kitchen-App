import {Component} from 'react'
import './index.css'

class Counter extends Component {
  state = {
    displayAdd: true,
    count: 1,
  }

  addingToLocalStorage = () => {
    const {thisFoodItem} = this.props
    const {count} = this.state
    console.log(thisFoodItem.name, count)
    const valueInLocal = JSON.parse(localStorage.getItem('cartData'))
    console.log(valueInLocal)
    if (valueInLocal === null) {
      localStorage.setItem(
        'cartData',
        JSON.stringify([{...thisFoodItem, quantity: count}]),
      )
    } else {
      const newData = [...valueInLocal, {...thisFoodItem, quantity: count}]
      localStorage.setItem('cartData', JSON.stringify(newData))
    }
  }

  clicked = () => {
    console.log('clicked')
    this.setState({displayAdd: false}, this.addingToLocalStorage())
  }

  onIncrement = () => {
    this.setState(prev => ({count: prev.count + 1}))
  }

  onDecrement = () => {
    const {count} = this.state
    if (count <= 1) {
      this.setState({displayAdd: true})
    } else {
      this.setState(before => ({count: before.count - 1}))
    }
  }

  render() {
    const {displayAdd, count} = this.state
    return (
      <div>
        {displayAdd ? (
          <button className="add-button" type="button" onClick={this.clicked}>
            Add
          </button>
        ) : (
          <div>
            <button
              testid="active-count"
              type="button"
              onClick={this.onDecrement}
            >
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
        )}
      </div>
    )
  }
}

export default Counter
