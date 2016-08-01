import React , { Component } from 'react'
import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share'

export default class PostInfo extends Component {
  render () {
    const {FacebookShareButton} = ShareButtons
    const {FacebookShareCount} = ShareCounts
    return (
    <div className='post-info'>
      <FacebookShareButton url='www.codesheep.io'>
        <a className='post-info-tag-a' href="javascript:void(0)"><i className="fa fa-facebook"></i></a>
      </FacebookShareButton>
    </div>
    )
  }
}
