import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {Container} from 'react-responsive-grid'
import {prefixLink} from 'gatsby-helpers'
import {rhythm, fontSizeToMS} from 'utils/typography'
import {config} from 'config'
import NavTopBar from '../components/NavTopBar'

//
import '../css/styles.css'
import '../css/bootstrap/css/bootstrap.min.css'
// import '../css/font-awesome/css/font-awesome.min.css'
import '../css/font-awesome/css/font-awesome.css'
import '../styles'

class Template extends Component {
  render() {
    const {location, children} = this.props
    let header
    if (location.pathname === prefixLink('/')) {
      header = (
        <h1
          style={{
            display: 'inline-block',
            fontSize: fontSizeToMS(2.5).fontSize,
            lineHeight: fontSizeToMS(2.5).lineHeight,
            marginBottom: rhythm(1.5),
          }}
        >
          <Link
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={prefixLink('/')}
          >
            {config.blogTitle}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3 style={{display: 'inline-block'}}>
          <Link
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={prefixLink('/')}
          >
            {config.blogTitle}
          </Link>
        </h3>
      )
    }
    return (
      <Container
        style={{
          
          padding: `${rhythm(2)} ${rhythm(1/2)}`,
        }}
      >
      <NavTopBar />
        <div className='template-header-blog'>
        </div>
        {children}
        <footer
          className='footer-template'
          style={{
            color: '#999',
            fontSize: fontSizeToMS(-1).fontSize,
            textAlign: 'right',
          }}
        >
        </footer>
      </Container>
    )
  }
}

Template.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
  route: PropTypes.object,
}

export default Template
