import {Link} from 'react-router-dom'
import './index.css'

const DisplayRestaurants = props => {
  const {displayedList} = props

  return (
    <div className="results-container-display">
      <ul className="rendered-ul-list">
        {displayedList.map(eachResult => {
          const userRatingDetails = eachResult.userRating
          const newRatings = {
            ratingText: userRatingDetails.rating_text,
            ratingColor: userRatingDetails.rating_color,
            totalReviews: userRatingDetails.total_reviews,
            rating: userRatingDetails.rating,
          }
          return (
            <Link
              className="text-link"
              to={`/restaurant/${eachResult.id}`}
              key={eachResult.id}
            >
              <li
                testid="restaurant-item"
                className="restaurant-result-container"
              >
                <img
                  src={eachResult.imgURL}
                  alt="restaurant"
                  className="restaurant-logo"
                />
                <div className="restaurant-details-container">
                  <h1 className="restaurant-name">{eachResult.name}</h1>
                  <p className="menu-type">{eachResult.menuType}</p>
                  <p className="restaurant-cuisine">{eachResult.cuisine}</p>
                  <div className="rating-container">
                    <p className="home-rating">{newRatings.rating}</p>
                    <p className="home-rating-view">
                      ({newRatings.totalReviews} rating)
                    </p>
                  </div>
                </div>
              </li>
            </Link>
          )
        })}
      </ul>
    </div>
  )
}

export default DisplayRestaurants
