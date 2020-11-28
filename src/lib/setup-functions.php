<?php

namespace cd2\wordpress\gutenberg\visualshortcode;

define( 'BLOCK_JS_FILE', defined( 'ABSPATH' ) ? 'block.build.js' : 'block.js' );

/**
 * Enqueues the necessary REST API controller, then ask it to register it's routes.
 *
 * @since  1.0.0
 * @access public
 */
function register_rest_routes() {
	if ( class_exists( '\WP_REST_Controller' ) ) {
		include_once __DIR__ . '/wprest-shortcodes-controller.php';
		$controller = new rest\WPREST_Shortcodes_Controller();
		$controller->register_routes();
	}
}

/**
 * Enqueues the block editor assets
 *
 * @since  1.0.0
 * @access public
 */
function sc_enqueue_block_editor_assets() {
	\wp_enqueue_script(
		'cd2-gutenberg-shortcode-block',
		\plugins_url( 'block.build.js', __FILE__ ),
		[ 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ],
		filemtime( \plugin_dir_path( __FILE__ ) . BLOCK_JS_FILE ),
		true
	);

	\wp_enqueue_style(
		'cd2-gutenberg-shortcode-block-css-editor',
		\plugins_url( 'editor.css', __FILE__ ),
		[ 'wp-edit-blocks' ],
		filemtime( \plugin_dir_path( __FILE__ ) . 'editor.css' )
	);
}

/**
 * Initializes the hook callbacks required
 *
 * @since  1.0.0
 * @access public
 */
function init() {
	\add_action(
		'rest_api_init',
		__NAMESPACE__ . '\register_rest_routes'
	);
	\add_action(
		'enqueue_block_editor_assets',
		__NAMESPACE__ . '\sc_enqueue_block_editor_assets'
	);
}

if ( defined( 'ABSPATH' ) ) {
	init();
}
