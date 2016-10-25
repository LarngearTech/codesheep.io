---
layout: post
title: "reinstall: a better `daggumnpm`"
tags:
- bash
summary: "while fun, had a few rough edges. My workflow often involves running `daggumnpm` in a tmux session and working on something else while npm does it’s thing."
img: "https://eng.uber.com/wp-content/uploads/2016/07/Xchange_Leasing_header.png"
author: "Supasate Choochaisri"
---

[`daggumnpm`](/2016/02/18/daggumnpm/), while fun, had a few rough edges. My
workflow often involves running `daggumnpm` in a tmux session and working on
something else while npm does it’s thing. When everything works this is great
because I hear the friendly “**Greetings, Dustan Kasten...**” message when the
install completes. However, when `npm install` fails I completely forget about
that process for entirely too long.

Whilst this could still be done with a single line bash alias, I’ve opted to
use a more verbose implementation in the following little function `reinstall`.

``` bash
# Reinstall package.json depenendencies. Do a full reinstall to avoid issues
# with the resulting non-determinsitic tree that incremental `npm install`
# creates.
reinstall () {
  echo "Reinstalling node dependencies. Please stand by."
  rm -rf node_modules

  # if `npm install` has a positive exit code, we get our success message, but
  # in case it fails we still want to be notified.
  #
  # `say` is way cooler than `growl` for those that remember what that is.
  if npm install ; then
    say "Greetings `git config user.name`. We have finished installing your node dependencies. With love from your benevolent NPM overlords." &
  else
    say "Our sincerest apologies, `git config user.name`. It appears as we have hit an error trying to install your node dependencies." &
  fi
}
```
