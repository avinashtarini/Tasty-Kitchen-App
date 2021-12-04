import {Component} from 'react'
import Counter from '../Counter'

import './index.css'

class DisplayFoodItems extends Component {
  displayBanner = () => {
    const {foodItemsDetails} = this.props
    const {
      rating,
      name,
      costForTwo,
      cuisine,
      imageUrl,
      reviewsCount,
      opensAt,
      location,
    } = foodItemsDetails

    return (
      <div className="banner-container">
        <div className="restaurant-banner-container">
          <img src={imageUrl} alt="restaurant" className="restaurant-banner" />
          <div className="banner-details-container">
            <h1 className="restarunat-name">{name}</h1>
            <p className="restaurant-cuisine">{cuisine}</p>
            <p className="restaurant-location"> {location}</p>
            <div className="review-and-cost">
              <div className="review-container-banner">
                <p className="restaurant-ratings">{rating}</p>
                <p className="restaurant-rating-count">
                  {reviewsCount}+ Ratings
                </p>
              </div>
              <div className="cost-container-banner">
                <p className="restaurant-cost-for-two">
                  {costForTwo} Cost for two
                </p>
              </div>
              <p>{opensAt}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  displayFoodItemsList = () => {
    const {foodItemsDetails} = this.props
    const {foodItems} = foodItemsDetails
    return (
      <ul testid="foodItem" className="food-items-results-container">
        {foodItems.map(eachFoodItems => (
          <li className="each-list-container" key={eachFoodItems.id}>
            <img
              src={eachFoodItems.imageURL}
              alt={eachFoodItems.name}
              className="each-list-icon"
            />
            <div className="each-list-second-container">
              <h1 className="each-item-name">{eachFoodItems.name}</h1>
              <p className="each-item-food-type">{eachFoodItems.foodType}</p>
              <p className="each-item-food-type">{eachFoodItems.cost}</p>
              <p className="each-item-food-rating">
                {eachFoodItems.ratingFood}
              </p>
              <Counter thisFoodItem={eachFoodItems} />
            </div>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    return (
      <>
        {this.displayBanner()}
        {this.displayFoodItemsList()}
      </>
    )
  }
}

export default DisplayFoodItems
