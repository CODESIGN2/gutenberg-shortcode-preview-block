<?php
/**
 * Plugin Name: CD2 Gutenberg Shortcode Preview Block
 * Plugin URI: https://www.codesign2.co.uk
 * Description: This is a plugin that renders shortcodes in Gutenberg
 * Version: 1.1.1
 * Author: Lewis Cowles
 */
namespace cd2\wordpress\gutenberg\visualshortcode;

if ( version_compare( PHP_VERSION, '7.0.0', '<' ) ) {
	?>
	<div id="error-page">
		<p>This plugin requires PHP 7.0.0 or higher. Please contact your hosting provider about upgrading your
			server software. Your PHP version is <b><?php echo PHP_VERSION; ?></b></p>
	</div>
	<?php
	die();
}

require 'lib/setup-functions.php';
