import React, { Component } from 'react'
import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share'

export default class PostRightBarShare extends Component {
  render () {
    const {FacebookShareButton} = ShareButtons
    const {FacebookShareCount} = ShareCounts
    return (
    <div className='post-right-bar-share'>
      <FacebookShareButton url={`www.codesheep.io/${this.props.url}`}>
        <div className="btn-group" style={{width: '100%', cursor: 'pointer'}}>
          <a className='btn btn-primary disabled'><i className="fa fa-facebook" style={{width: '20%'}}></i></a>
          <a className='btn btn-primary ' href='' style={{width: '80%'}}>แชร์</a>
        </div>
      </FacebookShareButton>
    </div>
    )
  }
}
