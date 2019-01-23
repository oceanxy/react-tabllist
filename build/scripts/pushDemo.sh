#!/bin/sh

git remote set-url github "https://oceanxy:${GH_TOKEN}@github.com/oceanxy/react-tabllist.git"
git remote add coding "https://oceanxy:${CODING_TOKEN}@git.dev.tencent.com/Oceanxy/react-tabllist.git"

git remote -v

#yarn demo
#
#git subtree add -P examples github gh-pages --squash
#
#git fetch github gh-pages
#
#git pull github master
#
#git subtree pull -P examples github gh-pages --squash

yarn demo && yarn push-demo
