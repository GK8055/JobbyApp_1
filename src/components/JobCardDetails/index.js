import {MdLocationOn} from 'react-icons/md'
import {BsStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
//import {BiLinkExternal} from 'react-icons/bi'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {Component} from 'react'
import './index.css'
import SkillCard from '../SkillCard'
import SimilarJobCard from '../SimilarJobCard'

const apiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}
class JobCardDetails extends Component {
  state = {intialStatus: apiStatus.loading, jobData: [], similarJobsData: []}

  componentDidMount() {
    this.getJobsDetailsData()
  }

  getFormattedData = data => ({
    id: data.id,
    companyLogoUrl: data.company_logo_url,
    websiteUrl: data.company_website_url,
    employementType: data.employment_type,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    rating: data.rating,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
    skills: data.skills.map(each => ({
      imageUrl: each.image_url,
      name: each.name,
    })),
    jobDescription: data.job_description,
  })

  getSimilarJobsFormatData = data => ({
    compnayLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    loaction: data.location,
    rating: data.rating,
    title: data.title,
  })

  getJobsDetailsData = async () => {
    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const updateData = this.getFormattedData(data.job_details)
      const updateSimilarJobsData = data.similar_jobs.map(each =>
        this.getSimilarJobsFormatData(each),
      )
      this.setState({
        jobData: updateData,
        similarJobsData: updateSimilarJobsData,
        intialStatus: apiStatus.success,
      })
    } else {
      this.setState({intialStatus: apiStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {jobData, similarJobsData} = this.state
    const {
      companyLogoUrl,
      websiteUrl,
      employementType,
      jobDescription,
      lifeAtCompany,
      location,
      rating,
      title,
      packagePerAnnum,
      skills,
    } = jobData
    const {description, imageUrl} = lifeAtCompany
    return (
      <div className="job_item_details_container">
        <div className="company_logo_container">
          <img
            src={companyLogoUrl}
            className="comapny_logo_size"
            alt="job details company logo"
          />
          <div className="company_title_rating_container">
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
            <p className="company_rating">{employementType}</p>
          </div>
          <p className="company_rating">{packagePerAnnum}</p>
        </div>
        <div className="description_container">
          <div className="description_text_container">
            <h1 className="heading">Description</h1>
            <p className="desc">{jobDescription}</p>
          </div>
          <a className="desc" href={websiteUrl}>
            Visit
          </a>
        </div>
        <h1 className="heading">Skills</h1>
        <ul className="skills_container">
          {skills.map(each => (
            <SkillCard data={each} key={each.name} />
          ))}
        </ul>
        <h1 className="heading">Life at Company</h1>
        <div className="life_at_company_container">
          <p className="desc">{description}</p>
          <img
            src={imageUrl}
            className="life_at_company_image_size"
            alt="life at company"
          />
        </div>
        <h1 className="heading">Similar Jobs</h1>
        <ul className="skills_container">
          {similarJobsData.map(each => (
            <SimilarJobCard data={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => {
    return (
      <div className="failure_container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          className="image_size"
          alt="failure view"
        />
        <h1 className="title">Oops! Something Went Wrong</h1>
        <p className="desc">We can't seem to find the page you looking for</p>
        <button
          type="button"
          data-testid="button"
          onClick={this.getJobsDetailsData}
          className="Retry_btn"
        >
          Retry
        </button>
      </div>
    )
  }

  renderFinalOutput = () => {
    const {intialStatus} = this.state
    switch (intialStatus) {
      case apiStatus.success:
        return this.renderSuccessView()
        break
      case apiStatus.failure:
        return this.renderFailureView()
        break
      default:
        return this.renderLoaderView()
        break
    }
  }

  render() {
    return (
      <>
        <div className="job_item_details_container">
          {this.renderFinalOutput()}
        </div>
      </>
    )
  }
}
export default JobCardDetails
