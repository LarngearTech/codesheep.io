import React, { PropTypes } from 'react'
import DocumentTitle from 'react-document-title'
import { GoogleFont, TypographyStyle } from 'utils/typography'

const Html = (props) => {
  const { favicon, body } = props
  let title = DocumentTitle.rewind()
  if (props.title) {
    title = props.title
  }

  let cssLink
  if (process.env.NODE_ENV === 'production') {
    cssLink = <link rel="stylesheet" href={'/styles.css'} />
  }

  return (
    <html lang="en">
    <head>
      <meta name="google-site-verification" content="BDpu467SDH-R3dspBS7Otq9SonfabJLKZxCEALZH4-Q" />
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="CodeSheep.io - 2016" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="http://codesheep.io/" />
      <meta property="og:image" content="" />
      <meta property="og:site_name" content="CodeSheep" />
      <meta property="og:description" content="CodeSheep.io" />
      <meta property="fb:app_id" content="1805086963105739" />
      <title>
        {props.title}
      </title>
      <link rel="shortcut icon" href={favicon} />
      <GoogleFont />
      <TypographyStyle />
      {cssLink}
    </head>
    <body className="landing-page">
      <div id="react-mount" dangerouslySetInnerHTML={{ __html: body }} />
      <script src={'/bundle.js'} />
      {/* eslint-disable */}
      <script dangerouslySetInnerHTML={{ __html: "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=" +
    'i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElement' +
    'sByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,' +
    "'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'UA-81455356-1" +
    "', 'auto');ga('send', 'pageview');</script>",
  }}></script>
      {/* eslint-enable */}
    </body>
    </html>
  )
}

Html.propTypes = {
  body: PropTypes.string,
  favicon: PropTypes.string,
  title: PropTypes.string,
}

Html.defaultProps = {
  body: '',
}

export default Html
