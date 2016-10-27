import React, { PropTypes } from 'react'
import { ShareButtons } from 'react-share'

const PostInfo = (props) => {
  const { FacebookShareButton } = ShareButtons
  return (
    <div className="post-info">
      <FacebookShareButton url={`www.codesheep.io/${props.url}`}>
        <a className="post-info-tag-a" href="javascript:void(0)">
          <i className="fa fa-facebook"></i>
        </a>
      </FacebookShareButton>
    </div>
  )
}

PostInfo.propTypes = {
  url: PropTypes.string.isRequired,
}

export default PostInfo
