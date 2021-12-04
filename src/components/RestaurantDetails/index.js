import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import DisplayFoodItems from '../DisplayFoodItems'

const renderStatusPage = {
  success: 'S',
  fail: 'F',
  loading: 'L',
  starting: 'I',
}

class RestaurantDetails extends Component {
  state = {
    foodPageSate: renderStatusPage.starting,
    foodList: [],
  }

  componentDidMount() {
    this.getRestaurantDetailsCall()
  }

  getRestaurantDetailsCall = async () => {
    this.setState({foodPageSate: renderStatusPage.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const accessToken = Cookies.get('jwt_token')
    const tokenDetails = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    }

    const fetchSingleRestaurantData = await fetch(
      `https://apis.ccbp.in/restaurants-list/${id}`,
      tokenDetails,
    )
    const responseSingleRestaurant = await fetchSingleRestaurantData.json()
    console.log(responseSingleRestaurant)
    if (fetchSingleRestaurantData.ok === true) {
      const updatedResponseItems = {
        rating: responseSingleRestaurant.rating,
        id: responseSingleRestaurant.id,
        name: responseSingleRestaurant.name,
        costForTwo: responseSingleRestaurant.cost_for_two,
        cuisine: responseSingleRestaurant.cuisine,
        imageUrl: responseSingleRestaurant.image_url,
        reviewsCount: responseSingleRestaurant.reviews_count,
        opensAt: responseSingleRestaurant.opens_at,
        location: responseSingleRestaurant.location,
        itemsCount: responseSingleRestaurant.items_count,
        foodItems: responseSingleRestaurant.food_items.map(eachFood => ({
          name: eachFood.name,
          cost: eachFood.cost,
          foodType: eachFood.food_type,
          imageURL: eachFood.image_url,
          id: eachFood.id,
          ratingFood: eachFood.rating,
        })),
      }
      console.log(updatedResponseItems)
      this.setState({
        foodPageSate: renderStatusPage.success,
        foodList: updatedResponseItems,
      })
    } else {
      this.setState({
        foodPageSate: renderStatusPage.fail,
      })
    }
  }

  foodItemsSuccessView = () => {
    const {foodList} = this.state

    return <DisplayFoodItems foodItemsDetails={foodList} />
  }

  renderLoader = () => (
    <div testid="restaurant-details-loader" className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
    </div>
  )

  checkRenderStatusFoodItems = () => {
    const {foodPageSate} = this.state
    switch (foodPageSate) {
      case renderStatusPage.success:
        return this.foodItemsSuccessView()
      case renderStatusPage.fail:
        return <h1>Fail</h1>
      case renderStatusPage.loading:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.checkRenderStatusFoodItems()}
        <Footer />
      </>
    )
  }
}

export default RestaurantDetails
