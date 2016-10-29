#!/usr/bin/env bash
#
# A quick and dirty script to deploy publish the website to github’s gh-pages
# branch. This is a destructive action.
#

git checkout -b tmp-build
gatsby build
cp CNAME public/CNAME
git add public -f
git commit -m 'build'
git push origin --delete gh-pages
git subtree push --prefix public origin gh-pages
git checkout master
git branch -D tmp-build
