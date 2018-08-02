import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import HeaderLinks from "../Header/HeaderLinks.jsx";

import imagine from "assets/img/sidebar-3.jpg";
import logo from "assets/img/sidebar-3.jpg";

import dashboardRoutes from "routes/dashboard.jsx";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth
    };
  }
  activeRoute = (routeName) => {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  updateDimensions = () => {
    this.setState({ width: window.innerWidth });
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  render() {
    const sidebarBackground = {
      backgroundImage: "url(" + imagine + ")"
    };
    

    const logo = { logoImg: "url(" + logo + ")"};
    return (
      <div
        id="sidebar"
        className="sidebar"
        
        data-image={imagine}
        
      >
      
        <div className="sidebar-background" style={sidebarBackground} />
        
        <div className="sidebar-wrapper">
          <ul className="nav">
            
             
            {dashboardRoutes.map((prop, key) => {
              if (!prop.redirect && !prop.hidden)
                return (
                  <li
                    className={
                      prop.upgrade
                        ? "active active-pro"
                        : this.activeRoute(prop.path)
                    }
                    key={key}
                  >
                    <NavLink
                      to={prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                );
              return null;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
