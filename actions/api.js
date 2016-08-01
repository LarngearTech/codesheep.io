// var og = require('open-graph')
import openGraphMeta from 'open-graph-meta'
import DocumentMeta from 'react-document-meta';


const ogUrl = (url) => {
  og(url, function (err, meta) {
    console.log(meta)
  })
}

const ogFacebook = (url) => {
  const meta = {
    title: 'Some Meta Title',
    description: 'I am a description, and I can create multiple tags',
    canonical: 'http://example.com/path/to/page',
    meta: {
      charset: 'utf-8',
      name: {
        keywords: 'react,meta,document,html,tags'
      }
    }
  }
  return meta
}

export { ogUrl, ogFacebook }
