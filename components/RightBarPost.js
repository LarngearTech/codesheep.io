import React, { PropTypes } from 'react'
import RecentPosts from './RecentPosts'
import PostRightBarShare from './PostRightBarShare'

const RightBarPost = (props) => (
  <div className="right-bar-post">
    <div className="frame-right-bar-post">
      <PostRightBarShare url={props.path} />
      <RecentPosts route={props.route} />
    </div>
  </div>
)

RightBarPost.propTypes = {
  path: PropTypes.string.isRequired,
  route: PropTypes.object.isRequired,
}

export default RightBarPost
