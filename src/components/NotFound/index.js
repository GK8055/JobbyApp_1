import './index.css'

const NotFound = () => (
  <div className="not_found_container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      className="image_size"
      alt="not found"
    />
    <h1 className="title">Page Not Found</h1>
    <p className="desc">
      we're sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
