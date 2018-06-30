=== CD2 Gutenberg Shortcode Block Preview ===
Contributors: CD2Team, LewisCowles, niranjan-uma-shankar
Tags: gutenberg,shortcode,preview,block,blocks,gutenberg blocks
Requires at least: 4.9
Tested up to: 4.9.6
Requires PHP: 5.6
Stable tag: 1.0.2
License: GPL-2.0
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Enables shortcode previews using the WordPress Gutenberg UI

== Description ==
This plugin adds a block `CD2 Shortcode`, which enables previewing shortcodes using the WordPress REST API.

All work from this plugin was originally part of works to get this functionality into Gutenberg pre-core merge.

This plugin only exists because the existing shortcode block doesn't give designers or non-coders anything to go on.

Due to gutenberg being a little unstable this plugin may break from time to time, let me know via the support tab, and I'll do my best to keep on top of it.

== Changelog ==
= 1.0.2 =
**Added**

* Updated changelog entries

**Fixed**

* Added changelog from 0.0.2

= 1.0.1 =
**Added**

* Unit Testing via 10up/wp_mock
* Improved reliability

**Changed**

* Plugin code is now namespaced
* cd2 function prefix is removed as namespacing handles

**Fixed**

* Gutenberg revised their API, breaking 0.0.1 and 0.0.2 block now works again
* if the block is turned off it is converted to a classic editor block

= 0.0.2 =
**Added**

* N/A

**Changed**

* Media added so this doesn't look so bland on plugin DIR

**Fixed**

* N/A

= 0.0.1 =
**Added**

* Shortcode block with default preview mode (when not placeholder / empty)
* REST API endpoint for shortcode rendering
