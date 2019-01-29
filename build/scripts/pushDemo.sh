#!/bin/sh

yarn demo

git remote rm origin
git remote add github "https://${GH_TOKEN}@github.com/oceanxy/react-tabllist.git" --quiet
git remote add coding "https://${CODING_TOKEN}@git.dev.tencent.com/Oceanxy/react-tabllist.git" --quiet

git remote -v

git push github `git subtree split --prefix examples master`:gh-pages --force
git push coding `git subtree split --prefix examples master`:coding-pages --force
