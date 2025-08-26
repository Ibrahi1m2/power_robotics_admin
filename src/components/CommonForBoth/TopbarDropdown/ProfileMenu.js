import React, { useState } from "react"
import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
// Redux
import { connect } from "react-redux"
import {  Link } from "react-router-dom";
import withRouter from "components/Common/withRouter"

const ProfileMenu = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)


  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item waves-effect"
          id="page-header-user-dropdown"
          tag="button"
        >
          <div
            className="rounded-circle header-profile-user"
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#1e3a8a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #60a5fa'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="#60a5fa"/>
              <path d="M8 8C8 6.9 8.9 6 10 6H14C15.1 6 16 6.9 16 8V10C16 11.1 15.1 12 14 12H10C8.9 12 8 11.1 8 10V8Z" fill="#60a5fa"/>
              <circle cx="9" cy="9" r="1" fill="#ef4444"/>
              <circle cx="15" cy="9" r="1" fill="#ef4444"/>
              <path d="M6 14C6 12.9 6.9 12 8 12H16C17.1 12 18 12.9 18 14V16C18 17.1 17.1 18 16 18H8C6.9 18 6 17.1 6 16V14Z" fill="#60a5fa"/>
              <rect x="10" y="16" width="4" height="2" fill="#60a5fa"/>
            </svg>
          </div>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <Link to="/logout" className="dropdown-item text-danger">
            <i className="mdi mdi-power font-size-17 text-muted align-middle me-1 text-danger"/>
            <span>{props.t("Logout")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
)