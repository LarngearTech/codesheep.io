import React, { Component } from 'react'
import RecentPosts from './RecentPosts'
import PostRightBarShare from './PostRightBarShare'


export default class RightBarPost extends Component {
  render () {

    return (
    <div className='right-bar-post'>
      <div className='frame-right-bar-post'>
        <PostRightBarShare url={this.props.path} />
        <RecentPosts route={this.props.route} />
      </div>
    </div>
    )
  }
}
