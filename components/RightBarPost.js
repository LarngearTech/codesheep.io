import React, { Component } from 'react'
import RecentPosts from './RecentPosts'

export default class RightBarPost extends Component {
  render() {
    return(
      <div className='right-bar-post'>
        <div className='frame-right-bar-post'>
          <RecentPosts route={this.props.route} />
        </div>
      </div>
    )
  }
}