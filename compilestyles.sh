#! /bin/bash

rm -f quicksettings.css
rm -f quicksettings_black.css
rm -f quicksettings_white.css
rm -f quicksettings_tiny.css;
rm -f quicksettings_tiny_white.css;
rm -f quicksettings_tiny_black.css;

lessc src/quicksettings.less quicksettings.css --clean-css="--s0"
lessc src/quicksettings_black.less quicksettings_black.css --clean-css="--s0"
lessc src/quicksettings_white.less quicksettings_white.css --clean-css="--s0"
lessc src/quicksettings_tiny.less quicksettings_tiny.css --clean-css="--s0"
lessc src/quicksettings_tiny_white.less quicksettings_tiny_white.css --clean-css="--s0"
lessc src/quicksettings_tiny_black.less quicksettings_tiny_black.css --clean-css="--s0"
