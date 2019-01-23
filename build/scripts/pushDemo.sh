#!/bin/sh

git remote remove origin "https://oceanxy:${GH_TOKEN}@github.com/oceanxy/react-tabllist.git"
git remote add github "https://oceanxy:${GH_TOKEN}@github.com/oceanxy/react-tabllist.git"
git remote add coding "https://oceanxy:${CODING_TOKEN}@git.dev.tencent.com/Oceanxy/react-tabllist.git"

yarn demo && yarn push-demo
