import './index.css'
import {Link} from 'react-router-dom'

const Home = () => (
  <>
    <div className="home_container">
      <h1 className="home_title">Find The Job That Fits Your Life</h1>
      <p className="home_desc">Millions of people are searching for jobs</p>
      <Link to="/jobs">
        <button className="find_jobs_btn">Find Jobs</button>
      </Link>
    </div>
  </>
)

export default Home
