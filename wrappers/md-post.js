import React, { PropTypes } from 'react'
import { pathToDate } from '../utils'
import DocumentTitle from 'react-document-title'
import { prefixLink } from 'gatsby-helpers'
import ReadNext from '../components/ReadNext'
import { rhythm } from 'utils/typography'
import { config } from 'config'


const Post = ({ post, path, route }) => (
  <DocumentTitle title={`${post.title} | ${config.blogTitle}`}>
    <div className="markdown">

      <h1>{post.title}</h1>
      <em
        style={{
          display: 'block',
          marginBottom: rhythm(2),
        }}
      >
        Posted {pathToDate(path)}
      </em>
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
      <hr
        style={{
          marginBottom: rhythm(2),
        }}
      />
      <ReadNext post={post} pages={route.pages} />
    </div>
  </DocumentTitle>
)

Post.propTypes = {
  post: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  route: PropTypes.object.isRequired,
}

export default Post
