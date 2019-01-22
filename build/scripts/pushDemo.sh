#!/bin/sh

git remote remove origin git@github.com:oceanxy/react-tabllist.git
git remote add github git@github.com:oceanxy/react-tabllist.git
git remote add coding git@git.dev.tencent.com:Oceanxy/react-tabllist.git

yarn demo && yarn push-demo

