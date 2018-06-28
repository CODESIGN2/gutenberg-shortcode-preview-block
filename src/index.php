<?php
/**
 * Plugin Name: CD2 Gutenberg Shortcode Preview Block
 * Plugin URI: https://www.codesign2.co.uk
 * Description: This is a plugin that renders shortcodes in Gutenberg
 * Version: 0.0.1
 * Author: Lewis Cowles
 *
 */
namespace cd2\wordpress\gutenberg\visualshortcode;

if ( version_compare( PHP_VERSION, '5.6.0', '<' ) ) {
    ?>
    <div id="error-page">
        <p>This plugin requires PHP 5.6.0 or higher. Please contact your hosting provider about upgrading your
            server software. Your PHP version is <b><?php echo PHP_VERSION; ?></b></p>
    </div>
    <?php
    die();
}

require_once __DIR__ . '/lib/class-wp-rest-shortcodes-controller.php';

function cd2_register_rest_routes() {
	$controller = new WP_REST_Shortcodes_Controller();
	$controller->register_routes();
}

function cd2_sc_enqueue_block_editor_assets() {
	wp_enqueue_script(
		'cd2-gutenberg-shortcode-block',
		plugins_url( 'block.build.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'block.build.js' )
	);

	wp_enqueue_style(
		'cd2-gutenberg-shortcode-block-css-editor',
		plugins_url( 'editor.css', __FILE__ ),
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' )
	);
}

if (defined('ABSPATH')) {
	add_action( 'rest_api_init', 'cd2_register_rest_routes' );
	add_action( 'enqueue_block_editor_assets', 'cd2_sc_enqueue_block_editor_assets' );
}
