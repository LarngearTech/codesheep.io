import React, { PropTypes } from 'react'
import { Container } from 'react-responsive-grid'
import { rhythm, fontSizeToMS } from 'utils/typography'
import NavTopBar from '../components/NavTopBar'

import '../css/styles.css'
import '../css/bootstrap/css/bootstrap.min.css'
import '../css/font-awesome/css/font-awesome.min.css'
import '../styles'

const Template = (props) => {
  const { children } = props

  return (
    <Container style={{ padding: `${rhythm(2)} ${rhythm(1 / 2)}` }}>
      <NavTopBar />
      <div className="template-header-blog" />
      {children}
      <footer
        className="footer-template"
        style={{
          color: '#999',
          fontSize: fontSizeToMS(-1).fontSize,
          textAlign: 'right',
        }}
      />
    </Container>
  )
}

Template.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
  route: PropTypes.object,
}

export default Template
