#!/bin/sh

git remote remove origin "https://github.com/oceanxy/react-tabllist.git"

git remote add -f github "https://oceanxy:${GH_TOKEN}@github.com/oceanxy/react-tabllist.git"
git remote add -f coding "https://oceanxy:${CODING_TOKEN}@git.dev.tencent.com/Oceanxy/react-tabllist.git"

git subtree add -P examples github gh-pages --squash
git subtree add -P examples github coding-pages --squash

git fetch github master
git fetch coding master
git subtree pull -P github gh-pages --squash
git subtree pull -P coding coding-pages --squash

yarn demo && yarn push-demo
