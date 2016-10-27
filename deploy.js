const ghpages = require('gh-pages');
const path = require('path');

const publishedPath = path.join(__dirname, 'public')

ghpages.publish(publishedPath, (err) => { console.log(err) });
