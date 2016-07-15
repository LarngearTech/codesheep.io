import React, { Component, PropTypes } from 'react'
import Page from './md-page'
import Post from './md-post'
import RightBarPost from '../components/RightBarPost'

import '../css/zenburn.css'

class MarkdownWrapper extends Component {
  render () {
    const {route} = this.props
    const {path} = route
    const post = route.page.data
    const layout = post.layout
    if (layout === 'post') {
      return (
      <div className='md-post'>
        <div className='col-lg-9'>
          <Post {...{post, path, route}} />
        </div>
        <div className='col-lg-3'>
          <RightBarPost />
        </div>
      </div>)
    } else if (layout === 'page') {
      return <Page {...{post, path, route}} />
    } else {
      return (
      <div>
        <h1>Unknown layout {layout}</h1>
      </div>
      )
    }
  }
}

MarkdownWrapper.propTypes = {
  route: PropTypes.object,
}

export default MarkdownWrapper
