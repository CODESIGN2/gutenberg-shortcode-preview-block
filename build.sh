#!/bin/sh

cd ../
zip -r shortcode-block.zip shortcode-block -x "*node_modules*" -x "*package.json" -x "*preview.js" -x "*block.js" -x "*sandbox-custom.js" -x "*index.js" -x "*.babelrc" -x "*.zip" -x "*.git*" -x "*media*"

