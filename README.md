# Gutenberg Shortcode Preview Block

[![Build Status](https://travis-ci.org/CODESIGN2/gutenberg-shortcode-preview-block.svg?branch=main)](https://travis-ci.org/CODESIGN2/gutenberg-shortcode-preview-block)
[![Coverage Status](https://coveralls.io/repos/github/CODESIGN2/gutenberg-shortcode-preview-block/badge.svg?branch=main)](https://coveralls.io/github/CODESIGN2/gutenberg-shortcode-preview-block?branch=main)


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
cd src
npm install
npm run build
../build.sh
```

## Testing

after cloning the repo and cd'ing into the directory (from using above)

### PHP

```
composer install
mkdir -p tests/reports
phpunit --verbose --coverage-html tests/reports
```

### JavaScript

```
cd src
npm install
```

#### StorybookJS (manual QA)

```
npm run storybook
```

#### Jest

Care should be taken when testing to take note of higher order components. Really this means the project likely needs re-factoring to a functional modular approach. For now this "breaks" encapsulation, but works.

```
npm run jest
```

Coverage can be found using the following command.

```
npm run jest:coverage
```

The only missing coverage is an error state from the HTTP call and on{X} event listeners. Rather than test DOM event listeners, existing tests go straight to the effects caused by those listeners.

### Future

I would very much like to break out the `onComponentDidMount` to be a named action, which is simple enough, but also might avoid mocking of fetch and pass-through of an alternative resolver.

I'm also interested to find out how to using just JS enqueue blocks. This is building on the Gutenberg team work with StorybookJS integration and seems to differ from other ReactJS testing and JS testing I've done using jest.
