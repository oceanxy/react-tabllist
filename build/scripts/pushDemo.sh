#!/bin/sh

git remote remove origin "https://github.com/oceanxy/react-tabllist.git"

git remote add -f github "https://oceanxy:${GH_TOKEN}@github.com/oceanxy/react-tabllist.git"
git remote add coding "https://oceanxy:${CODING_TOKEN}@git.dev.tencent.com/Oceanxy/react-tabllist.git"

yarn demo

git subtree add -P examples github gh-pages --squash

git fetch github gh-pages

git pull github master

git subtree pull -P examples github gh-pages --squash

yarn push-demo
