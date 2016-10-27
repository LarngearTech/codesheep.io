import React, { PropTypes } from 'react'

const Figure = (props) => (
  <figure>
    <img {...props} style={{ margin: 0 }} />
    <figcaption>{props.caption}</figcaption>
  </figure>
)

Figure.propTypes = {
  img: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
}

export default Figure
