import React, { Component } from 'react'
import Headroom from 'react-headroom'
import $ from 'jquery'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'

export default class NavTopBar extends Component {

  render () {
    return (
    <Headroom>
      <div className='nav-top-bar'>
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header" style={{ 'height': '70px'}}>
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#navbar"
                aria-expanded="false"
                aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to={prefixLink('/')}>
              <a className="navbar-brand" href="#"><img style={{ "height": "45px", "margin-top": "-3px"}} src="http://www.mx7.com/i/e01/uAmpPO.png" /></a>
              </Link>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </Headroom>
    )
  }
}
