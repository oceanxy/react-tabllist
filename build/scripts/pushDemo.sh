#!/bin/sh

yarn demo
# 删除项目源 （为了自定义源）
git remote rm origin
# 重新添加源
git remote add github "https://${GH_TOKEN}@github.com/oceanxy/react-tabllist.git"
git remote add coding "https://lVDBMonyCz:${CODING_TOKEN}@e.coding.net/Oceanxy/react-tabllist.git"
# push master分支的examples内的文件到gh-pages分支和coding-pages分支
git push github `git subtree split --prefix examples master`:gh-pages --force --quiet
git push coding `git subtree split --prefix examples master`:coding-pages --force --quiet
