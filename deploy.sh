#!/usr/bin/env bash
#
# A quick and dirty script to deploy publish the website to github’s gh-pages
# branch. This is a destructive action.
#

git checkout -b gh-pages
gatsby build
cp CNAME public/CNAME
git add public -f
git commit -m 'gatsby auto build to branch gh-pages'
git push origin :master
git subtree push --prefix public origin master
git checkout master
git branch -D gh-pages

