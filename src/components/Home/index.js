import {Component} from 'react'
import Slider from 'react-slick'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BiChevronLeft, BiChevronRight} from 'react-icons/bi'
import {MdSort} from 'react-icons/md'
import Header from '../Header'
import Footer from '../Footer'
import DisplayRestaurants from '../DisplayRestaurants'
import './index.css'
import './styles.css'

const pageStatus = {
  success: 'S',
  fail: 'F',
  loading: 'L',
  starting: 'I',
}
const restaurantsState = {
  success: 'S',
  fail: 'F',
  loading: 'L',
  starting: 'I',
}

class Home extends Component {
  state = {
    offset: 0,
    limits: 9,
    activePageNo: 1,
    offersList: [],
    responseState: pageStatus.starting,
    selectedSortByValue: 'Lowest',
    searchInput: '',
    restaurantsList: [],
    restaurantsStatus: restaurantsState.starting,
  }

  componentDidMount() {
    this.getOfferDetails()
    this.getRestaurantDetails()
  }

  getOfferDetails = async () => {
    this.setState({
      responseState: pageStatus.loading,
    })
    const accessToken = Cookies.get('jwt_token')
    const tokenDetails = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    }
    const fetchOffers = await fetch(
      'https://apis.ccbp.in/restaurants-list/offers',
      tokenDetails,
    )
    const responseOffers = await fetchOffers.json()
    console.log(responseOffers)
    if (fetchOffers.ok === true) {
      const updatedOffersList = responseOffers.offers.map(eachOffer => ({
        imageUrl: eachOffer.image_url,
        id: eachOffer.id,
      }))

      console.log(updatedOffersList)
      this.setState({
        responseState: pageStatus.success,
        offersList: updatedOffersList,
      })
    } else {
      this.setState({
        responseState: pageStatus.fail,
      })
    }
  }

  getRestaurantDetails = async () => {
    this.setState({
      restaurantsStatus: restaurantsState.loading,
    })
    const accessKey = Cookies.get('jwt_token')
    const keyDetails = {
      headers: {
        Authorization: `Bearer ${accessKey}`,
      },
      method: 'GET',
    }
    const {offset, limits, selectedSortByValue, searchInput} = this.state
    const fetchRestaurantList = await fetch(
      `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limits}&sort_by_rating=${selectedSortByValue}&search=${searchInput}`,
      keyDetails,
    )
    const jsonRestaurantDetails = await fetchRestaurantList.json()
    console.log(jsonRestaurantDetails)
    if (fetchRestaurantList.ok === true) {
      const updatedDetails = jsonRestaurantDetails.restaurants.map(
        eachRestaurant => ({
          hasOnlineDelivery: eachRestaurant.has_online_delivery,
          userRating: eachRestaurant.user_rating,
          name: eachRestaurant.name,
          hasTableBooking: eachRestaurant.has_table_booking,
          isDeliveringNow: eachRestaurant.is_delivering_now,
          costForTwo: eachRestaurant.cost_for_two,
          cuisine: eachRestaurant.cuisine,
          imgURL: eachRestaurant.image_url,
          id: eachRestaurant.id,
          menuType: eachRestaurant.menu_type,
          location: eachRestaurant.location,
          opensAt: eachRestaurant.opens_at,
          groupByTime: eachRestaurant.group_by_time,
        }),
      )

      this.setState({
        restaurantsList: updatedDetails,
        restaurantsStatus: restaurantsState.success,
      })
    } else {
      this.setState({
        restaurantsStatus: restaurantsState.fail,
      })
    }
  }

  renderReactSlider = () => {
    const {offersList} = this.state
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: true,
    }

    return (
      <div className="container">
        <Slider {...settings}>
          {offersList.map(eachOLists => (
            <img
              src={eachOLists.imageUrl}
              alt="offer"
              className="offer-class"
              key={eachOLists.id}
            />
          ))}
        </Slider>
      </div>
    )
  }

  renderHomeLoader = () => (
    <div testid="restaurants-offers-loader" className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
    </div>
  )

  renderHomeListLoader = () => (
    <div testid="restaurants-list-loader" className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
    </div>
  )

  checkRenderOfferStatus = () => {
    const {responseState} = this.state
    switch (responseState) {
      case pageStatus.success:
        return this.renderReactSlider()
      case pageStatus.loading:
        return this.renderHomeLoader()
      default:
        return null
    }
  }

  renderPageNumber = () => {
    const {limits, activePageNo} = this.state
    if (activePageNo < 4) {
      this.setState(prevPageNo => ({activePageNo: prevPageNo.activePageNo + 1}))

      this.setState(
        prevOffset => ({
          offset: prevOffset.offset + 9,
        }),
        this.getRestaurantDetails,
      )
    }
  }

  renderPreviousPageNumber = () => {
    const {limits, activePageNo} = this.state
    if (activePageNo > 1) {
      this.setState(prevPageNo => ({activePageNo: prevPageNo.activePageNo - 1}))

      this.setState(
        prevOffset => ({
          offset: prevOffset.offset - 9,
        }),
        this.getRestaurantDetails,
      )
    }
  }

  updateRange = event => {
    console.log(event.target.value)
    this.setState(
      {selectedSortByValue: event.target.value},
      this.getRestaurantDetails,
    )
  }

  checkRenderedRestaurants = () => {
    const {restaurantsStatus, restaurantsList, activePageNo} = this.state
    switch (restaurantsStatus) {
      case restaurantsState.success:
        return (
          <>
            <DisplayRestaurants displayedList={restaurantsList} />
            <div className="pagination-container">
              <button
                onClick={this.renderPreviousPageNumber}
                type="button"
                className="pagination-btn"
                testid="pagination-left-button"
              >
                <BiChevronLeft className="pagination-icon" />
              </button>
              <p className="pagination-status">
                <span testid="active-page-number">{activePageNo}</span> of 4
              </p>
              <button
                onClick={this.renderPageNumber}
                type="button"
                className="pagination-btn"
                testid="pagination-right-button"
              >
                <BiChevronRight className="pagination-icon" />
              </button>
            </div>
          </>
        )
      case restaurantsState.loading:
        return this.renderHomeListLoader()
      default:
        return null
    }
  }

  render() {
    const {sortingOptionsList} = this.props
    return (
      <>
        <Header />
        <div className="home-background-container">
          {this.checkRenderOfferStatus()}
          <div className="popular-restaurants-container">
            <div className="sorting-container">
              <div className="heading-container">
                <h1 className="restaurants-heading">Popular Restaurants</h1>
                <p className="desc">
                  Select Your favourite restaurant special dish and make your
                  day happy...
                </p>
              </div>
              <div className="sorting">
                <MdSort />
                <p>Sort By</p>
                <select onClick="select-options" onChange={this.updateRange}>
                  {sortingOptionsList.map(eachOption => (
                    <option
                      className="option-class"
                      key={eachOption.id}
                      value={eachOption.value}
                    >
                      {eachOption.displayText}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {this.checkRenderedRestaurants()}
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
