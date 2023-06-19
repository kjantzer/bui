#!/bin/bash
# based on: https://stackoverflow.com/a/7716868/484780

#change to whichever directory this lives in
cd "$( dirname "$0" )/public"

#create new git repository and add everything
git init
git add -A
git commit -m"publish docs"
git remote add githubpages git@github.com:kjantzer/bui.git > /dev/null 2>&1
git push githubpages HEAD:gh-pages --force

echo "DONE"