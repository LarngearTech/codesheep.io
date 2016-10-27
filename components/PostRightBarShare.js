import React, { PropTypes } from 'react'
import { ShareButtons } from 'react-share'

const PostRightBarShare = (props) => {
  const { FacebookShareButton } = ShareButtons
  return (
  <div className="post-right-bar-share">
    <FacebookShareButton url={`www.codesheep.io/${props.url}`}>
      <div className="btn-group" style={{ width: '100%', cursor: 'pointer' }}>
        <a className="btn btn-primary disabled">
          <i className="fa fa-facebook" style={{ width: '20%' }}></i>
        </a>
        <a className="btn btn-primary" style={{ width: '80%' }}>Share</a>
      </div>
    </FacebookShareButton>
  </div>
  )
}

PostRightBarShare.propTypes = {
  url: PropTypes.string.isRequired,
}

export default PostRightBarShare
