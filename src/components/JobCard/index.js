import './index.css'
import {BsStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import {Link} from 'react-router-dom'

const JobCard = props => {
  const {jobData} = props
  console.log(jobData)
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
    rating,
    location,
    title,
    id,
  } = jobData

  return (
    <Link to={`/jobs/${id}`} className="link_item">
      <li className="job_card_item_container">
        <div className="company_logo_container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company_logo_size"
          />
          <div className="title_rating_container">
            <h1 className="company_title">{title}</h1>
            <div className="company_rating_container">
              <BsStarFill className="icon_size" />
              <p className="company_rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="middle_container">
          <div className="company_rating_container">
            <MdLocationOn className="icon_size" />
            <p className="company_rating">{location}</p>
          </div>
          <div className="company_rating_container">
            <BsFillBriefcaseFill className="icon_size" />
            <p className="company_rating">{employmentType}</p>
          </div>
          <p className="company_rating">{packagePerAnnum}</p>
        </div>
        <h1 className="company_title">Description</h1>
        <p className="desc">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
