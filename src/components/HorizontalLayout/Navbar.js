import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Collapse } from "reactstrap"
import { Link} from "react-router-dom"
import withRouter from "components/Common/withRouter"
import classname from "classnames"

//i18n
import { withTranslation } from "react-i18next"

import { connect } from "react-redux"

const Navbar = props => {
  const [email, setemail] = useState(false)
  const [moreItem, setMoreItem] = useState(false);

  useEffect(() => {
    const pathName = process.env.PUBLIC_URL + props.router.location.pathname;

    var matchingMenuItem = null;
    var ul = document.getElementById("navigation");
    var items = ul.getElementsByTagName("a");
    removeActivation(items);
    for (var i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  });

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;
      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        if (parent.classList.contains("active")) {
          parent.classList.remove("active");
        }
      }
    }
  };

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;
    if (parent) {
      parent.classList.add("active"); // li
      const parent2 = parent.parentElement;
      parent2.classList.add("active"); // li
      const parent3 = parent2.parentElement;
      if (parent3) {
        parent3.classList.add("active"); // li
        const parent4 = parent3.parentElement;
        if (parent4) {
          parent4.classList.add("active"); // li
          const parent5 = parent4.parentElement;
          if (parent5) {
            parent5.classList.add("active"); // li
            const parent6 = parent5.parentElement;
            if (parent6) {
              parent6.classList.add("active"); // li
            }
          }
        }
      }
    }
    return false;
  }

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="topnav">
          <nav
            className="navbar navbar-light navbar-expand-lg topnav-menu"
            id="navigation"
          >
            <Collapse
              isOpen={props.leftMenu}
              className="navbar-collapse"
              id="topnav-menu-content"
            >
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    className="nav-link dropdown-toggle arrow-none"
                    onClick={e => {
                      e.preventDefault()
                      setMoreItem(!moreItem)
                    }}
                  >
                    <i className="ti-menu-alt"></i>More
                  </Link>
                  <div className={classname("dropdown-menu dropdown-menu-left", { show: moreItem })}>
                    <Link to="/calendar" className="dropdown-item">{props.t("Calendar")}</Link>
                    <Link to="/chat" className="dropdown-item">{props.t("Chat")}</Link>

                  </div>
                </li>
              </ul>
            </Collapse>
          </nav>
        </div>
      </div>
    </React.Fragment>
  )
}

Navbar.propTypes = {
  leftMenu: PropTypes.any,
  location: PropTypes.any,
  menuOpen: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  const { leftMenu } = state.Layout
  return { leftMenu }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(Navbar))
)
