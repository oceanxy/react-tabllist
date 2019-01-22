#!/bin/sh

git remote remove origin git@github.com:oceanxy/react-tabllist.git
git remote add github "https://${GH_TOKEN}@github.com/oceanxy/react-tabllist.git"
git remote add coding "https://oceanxy:${CODING_TOKEN}@git.dev.tencent.com/Oceanxy/react-tabllist.git"

git fetch
git pull github master

yarn demo && yarn push-demo
