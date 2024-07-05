import './index.css'

import {BsStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

const SimilarJobCard = props => {
  const {data} = props
  const {
    compnayLogoUrl,
    employmentType,
    jobDescription,
    loaction,
    rating,
    title,
  } = data

  return (
    <div className="similar_jobs_container">
      <div className="company_logo_container">
        <img
          src={compnayLogoUrl}
          alt="similar job company logo"
          className="compnay_logo_size"
        />
        <div className="compnay_title_rating_container">
          <h1 className="company_title">{title}</h1>
          <div className="company_rating_container">
            <BsStarFill className="icon_size" />
            <p className="company_rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="heading">Description</h1>
      <p className="desc">{jobDescription}</p>
      <div className="middle_container">
        <div className="company_rating_container">
          <MdLocationOn className="icon_size" />
          <p className="company_rating">{loaction}</p>
        </div>
        <div className="company_rating_container">
          <BsFillBriefcaseFill className="icon_size" />
          <p className="company_rating">{employmentType}</p>
        </div>
      </div>
    </div>
  )
}

export default SimilarJobCard
