#!/bin/bash
VERSION="minor"
TAGMSG="$2"

checkSemver() {
  [[ "$1" == "patch" || "$1" == "minor" || "$1" == "major" ]]
}
runRelease() {
  if checkSemver $VERSION;then
    git config user.name "DaveJump"
    git config user.email "davejump@foxmail.com"
    # if [ $TAGMSG ];then
    #   git tag $VERSION -m "$TAGMSG"
    # else
    #   git tag $VERSION
    # fi
    nrm use npm
    npm version $VERSION
    npm publish --access public
    git push --follow-tags origin main
  else
    echo "version is invalid !"
    exit
  fi
}
if [ -n "$1" ];then
  if checkSemver "$1";then
    VERSION="$1"
  fi
else
  read -p "Enter the version in \"patch\", \"minor\", \"major\": " VER
  if checkSemver $VER;then
    VERSION=$VER
  fi
fi
runRelease
