import React, { Component } from 'react'
import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share'

export default class PostRightBarShare extends Component {
  render () {
    return (
    <div className='post-right-bar-share'>
      <FacebookShareButton url={`www.codesheep.io/${this.props.url}`}>
        <a class="btn btn-block btn-social btn-dropbox" onclick="_gaq.push(['_trackEvent', 'btn-social', 'click', 'btn-dropbox']);"><span class="fa fa-dropbox"></span> Sign in with Dropbox</a>
      </FacebookShareButton>
    </div>
    )
  }
}
