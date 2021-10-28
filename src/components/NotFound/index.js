import './index.css'

const NotFound = props => {
  const onclickNotFound = () => {
    const {history} = props
    history.push('/')
  }
  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="para-not-found">
        we are sorry, the page you requested could not be found Please go back
        to the homepage
      </p>
      <button onClick={onclickNotFound} type="button" className="not-found-btn">
        Home Page
      </button>
    </div>
  )
}

export default NotFound
