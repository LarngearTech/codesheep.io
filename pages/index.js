import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import sortBy from 'lodash/sortBy'
import DocumentTitle from 'react-document-title'
import { prefixLink } from 'gatsby-helpers'
import { rhythm } from 'utils/typography'
import { pathToDate } from 'utils'
import access from 'safe-access'
import { config } from 'config'
import PostInfo from '../components/PostInfo'

class BlogIndex extends Component {
  render () {
    // Sorted pages.
    let img = ''
    let author = ''
    const pages = this.props.route.pages.filter((page) => page.data.layout === 'post')
    const pageLinks = sortBy(pages, (page) => access(page, 'data.date')

    ).reverse().map((page) => {
      if (access(page, 'file.ext') === 'md') {
        const title = access(page, 'data.title') || page.path
        img = (page.data.img !== undefined && page.data.img !== '') ? <img src={page.data.img} /> : ''
        author = (page.data.author !== undefined && page.data.author !== '') ? `By ${page.data.author}` : ''
        return (
        <li key={page.path} style={{
  marginBottom: rhythm(1 / 4),
}}>
          <div className='col-lg-10 col-centered'>
            <div className='frame-blog-content'>
              <Link to={prefixLink(page.path)}>
              {img}
              <div className='frame-blog-content-detail'>
                <div className='main-blog-title'>
                  {title}
                </div>
                <div className='main-blog-summary'>
                  {page.data.summary}
                  <div className='frame-blog-author'>
                    {author}
                  </div>
                  <PostInfo />
                </div>
              </div>
              </Link>
            </div>
          </div>
        </li>
        )
      }
    })
    return (
    <DocumentTitle title={config.blogTitle}>
      <div>
        <ul>
          {pageLinks}
        </ul>
      </div>
    </DocumentTitle>
    )
  }
}

BlogIndex.propTypes = {
  route: PropTypes.object,
}

export default BlogIndex
