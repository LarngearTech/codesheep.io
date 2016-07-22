import React, { Component } from 'react'
import sortBy from 'lodash/sortBy'
import access from 'safe-access'
import { rhythm } from 'utils/typography'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'

export default class RecentPosts extends Component {

  loadRecentPosts () {
    let img = ''
    let countRecent = 1
    return this.props.route.pages.map((page) => {
      img = (page.data.img !== undefined && page.data.img !== '') ? <img src={page.data.img} /> : ''

      if (countRecent <= 4) {
        countRecent++
        return (
        <div className='load-recent-posts'>
          <Link to={prefixLink(page.path)}>
          <div className='load-recent-posts-header'>
            {img}
          </div>
          <div className='load-recent-posts-body'>
            {page.data.title}
          </div>
          </Link>
        </div>
        )
      } else {
      }
    })
  }

  render () {
    // console.log(this.props.route.pages)
    return (
    <div className='recent-posts'>
      <div className='recent-posts-title'>
        <h3>Recent Posts</h3>
      </div>
      <div className='recent-posts-content'>
        {this.loadRecentPosts()}
      </div>
    </div>
    )
  }
}
