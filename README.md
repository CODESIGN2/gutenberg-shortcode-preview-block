# Gutenberg Shortcode Preview Block

This is a repository for a Gutenberg preview shortcode block, supporting parity with the frontend experience
It's based on work from https://github.com/wordpress/gutenberg/pull/4710 from @LewisCowles1986 (of CODESIGN2) 
branch `new-shoes` located [here](https://github.com/Lewiscowles1986/gutenberg/tree/new-shoes)

Basic Admin experience adds a new block `CD2 Shortcode`, which encapsulates functionality 1:1 with `new-shoes` branch

* Defaults to input mode when no data available
* Defaults to preview state when has data (careful with how many shortcodes you place per-post with this as each one hits the REST API)
* If input text is not different to output text, then error message is shown
* Vertical ellipsis used to edit shortcode after content entered
* Renders as normal shortcode would in frontend

This also sends in the post context, so it should work if post meta is used or post attributes are used within the shortcode (submit issues if not)

## Using 

```
git clone https://github.com/CODESIGN2/gutenberg-shortcode-preview-block cd2-gutenberg-shortcode-preview-block
cd cd2-gutenberg-shortcode-preview-block
npm install
npm run build
./build.sh
```
