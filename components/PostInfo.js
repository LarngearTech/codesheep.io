import React , { Component } from 'react'

export default class PostInfo extends Component {
  render () {
    return (
    <div className='post-info'>
      <a className='post-info-tag-a' href="javascript:void(0)"><i className="fa fa-comment-o"></i></a>
      <a className='post-info-tag-a'  href="javascript:void(0)"><i className="fa fa-share-alt"></i></a>
    </div>
    )
  }
}
 