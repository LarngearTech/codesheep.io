import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'

const RecentPosts = (props) => {
  const loadRecentPosts = () => {
    let img = ''
    let countRecent = 1

    return props.route.pages.map((page) => {
      img = (page.data.img !== undefined && page.data.img !== '') ? <img src={page.data.img} /> : ''

      if (countRecent <= 4) {
        countRecent++
        return (
          <div className="load-recent-posts">
            <Link to={prefixLink(page.path)}>
            <div className="load-recent-posts-header">
              {img}
            </div>
            <div className="load-recent-posts-body">
              {page.data.title}
            </div>
            </Link>
          </div>
        )
      }
      return null
    })
  }

  return (
  <div className="recent-posts">
    <div className="recent-posts-title">
      <h3>Recent Posts</h3>
    </div>
    <div className="recent-posts-content">
      { loadRecentPosts() }
    </div>
  </div>
  )
}

RecentPosts.propTypes = {
  route: PropTypes.object.isRequired,
}

export default RecentPosts
