#!/bin/sh

zip -r ../shortcode-block$1.zip . -x "*node_modules*" -x "*webpack.config.js" -x "*package-lock.json" -x "*package.json" -x "*preview.js" -x "*block.js" -x "*sandbox-custom.js" -x "*index.js" -x "*.babelrc" -x "*.zip" -x "*.git*" -x "*media*"
