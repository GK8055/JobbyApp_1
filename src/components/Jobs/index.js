import './index.css'
import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import JobCard from '../JobCard'
import Loader from 'react-loader-spinner'
import FilterGroup from '../FilterGroup'
const apiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    intialStatus_1: apiStatus.loading,
    searchInput: '',
    employmentType: '',
    minPackage: '',
    intialStatus_2: apiStatus.loading,
    profileData: [],
    jobDetailsData: [],
  }

  componentDidMount() {
    this.getAllData()
  }
  getAllData = () => {
    this.getJobDetailsData()
    this.getProfileData()
  }
  getJobDetailsData = async () => {
    console.log('called1')
    const {employmentType, searchInput, minPackage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minPackage}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updateData = data.jobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))

      console.log(typeof updateData)
      this.setState({
        jobDetailsData: updateData,
        intialStatus_2: apiStatus.success,
      })
    } else {
      this.setState({intialStatus_2: apiStatus.failure})
    }
  }
  getProfileData = async () => {
    console.log('called2')
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data.profile_details)
      const updateData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({
        profileData: updateData,
        intialStatus_1: apiStatus.success,
      })
    } else {
      console.log('failed')
      this.setState({intialStatus_1: apiStatus.failure})
    }
  }
  searchType = event => {
    this.setState({searchInput: event.target.value})
  }
  searchEnter = () => {
    this.getJobDetailsData()
  }

  renderProfileSuccessView = () => {
    const {profileData} = this.state
    const {profileImageUrl, name, shortBio} = profileData
    return (
      <div className="profile_container">
        <img src={profileImageUrl} alt="profile" className="profile_size" />
        <h1 className="profile_name">{name}</h1>
        <p className="role">{shortBio}</p>
      </div>
    )
  }
  renderProfileFailureView = () => (
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
        onClick={this.getProfileData}
        className="Retry_btn"
      >
        Retry
      </button>
    </div>
  )

  renderProfileOutputView = () => {
    const {intialStatus_1} = this.state
    switch (intialStatus_1) {
      case apiStatus.success:
        return this.renderProfileSuccessView()
        break
      case apiStatus.failure:
        return this.renderProfileFailureView()
        break
      case apiStatus.loading:
        return this.renderLoaderView()
        break
    }
  }

  renderLoaderView = () => {
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  renderSuccessView = () => {
    const {jobDetailsData} = this.state
    const isNoData = jobDetailsData.length < 1
    return isNoData ? (
      <div className="failure_container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="image_size"
          alt="no jobs"
        />
        <h1 className="title">No Jobs Found</h1>
        <p className="desc">
          We cannot seem to find the page you are looking for
        </p>
      </div>
    ) : (
      <ul className="job_list_container">
        {jobDetailsData.map(each => (
          <JobCard jobData={each} key={each.id} />
        ))}
      </ul>
    )
  }

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
          onClick={this.getJobDetailsData}
          className="Retry_btn"
        >
          Retry
        </button>
      </div>
    )
  }

  renderFinalOutput = () => {
    const {intialStatus_2} = this.state
    switch (intialStatus_2) {
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
  checkboxClk = value => {
    this.setState({employmentType: value}, this.getJobDetailsData)
  }
  radioBtnClk = value => {
    this.setState({minPackage: value}, this.getJobDetailsData)
  }
  render() {
    const {jobDetailsData, searchInput} = this.state
    console.log(typeof jobDetailsData)
    return (
      <>
        <div className="job_route_details_container">
          <div className="profile_filter_container">
            {this.renderProfileOutputView()}
            <FilterGroup
              employeeData={employmentTypesList}
              salaryData={salaryRangesList}
              onCheckBoxClick={this.checkboxClk}
              onRadioBtnClk={this.radioBtnClk}
            />
          </div>
          <div className="job_details_container">
            <div className="search_container">
              <input
                type="search"
                className="search_ele"
                value={searchInput}
                onChange={this.searchType}
              />
              <button
                type="button"
                onClick={this.searchEnter}
                data-testid="searchButton"
              >
                <BsSearch className="search_icon_size" />
              </button>
            </div>
            {this.renderFinalOutput()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
