#!/bin/sh

git remote remove origin git@github.com:oceanxy/react-tabllist.git
git remote add github "https://${GH_TOKEN}@github.com/oceanxy/react-tabllist.git"
git remote add coding "https://${CODING_TOKEN}@git.dev.tencent.com/Oceanxy/react-tabllist.git"

yarn demo && yarn push-demo

