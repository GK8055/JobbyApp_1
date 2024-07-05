import './index.css'

import Cookies from 'js-cookie'

import {Link, withRouter} from 'react-router-dom'

const Header = props => {
  const logoutBtn = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className='top_container'>
      <div className='logo_container'>
        <Link to='/'>
          <img
            src='https://assets.ccbp.in/frontend/react-js/logo-img.png'
            alt='website logo'
            className='logo_size'
          />
        </Link>
        <h1 className='company_name'>Jobby</h1>
      </div>
      <ul className='link_container'>
        <li className='link_item'>
          <Link className='link_item' to='/'>
            Home{' '}
          </Link>
        </li>

        <li className='link_item'>
          <Link className='link_item' to='/jobs'>
            Jobs
          </Link>
        </li>
      </ul>
      <button className='logout_btn' type='button' onClick={logoutBtn}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
