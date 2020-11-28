<?php

namespace cd2\wordpress\gutenberg\visualshortcode\rest;

/**
 * Shortcode Blocks REST API: WPREST_Shortcodes_Controller class
 *
 * @package gutenberg
 * @since   1.0.0
 */

/**
 * Controller which provides a REST endpoint for Gutenberg to preview shortcode blocks.
 *
 * @since 1.0.0
 *
 * @see WP_REST_Controller
 */
class WPREST_Shortcodes_Controller extends \WP_REST_Controller {

	/**
	 * Constructs the controller.
	 *
	 * @since  1.0.0
	 * @access public
	 */
	public function __construct() {
        // @codingStandardsIgnoreLine - PHPCS mistakes $this->namespace for the namespace keyword
        $this->namespace = 'gutenberg/v1';
		$this->rest_base = 'shortcodes';
	}

	/**
	 * Registers the necessary REST API routes.
	 *
	 * @since  1.0.0
	 * @access public
	 */
	public function register_routes() {
        // @codingStandardsIgnoreLine - PHPCS mistakes $this->namespace for the namespace keyword
        $namespace = $this->namespace;

		\register_rest_route(
			$namespace,
			'/' . $this->rest_base,
			[
				[
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => [ $this, 'get_shortcode_output' ],
					'permission_callback' => [ $this, 'get_shortcode_output_permissions_check' ],
				],
				'schema' => [ $this, 'get_public_item_schema' ],
			]
		);
	}

	/**
	 * Checks if a given request has access to read shortcode blocks.
	 *
	 * @since  1.0.0
	 * @access public
	 *
	 * @param  \WP_REST_Request $request Full details about the request.
	 * @return true|\WP_Error True if the request has read access, WP_Error object otherwise.
	 */
	public function get_shortcode_output_permissions_check( $request ) {
		if ( ! \current_user_can( 'edit_posts' ) ) {
			return new \WP_Error(
				'gutenberg_shortcode_block_cannot_read',
				__(
					'Sorry, you are not allowed to read shortcode blocks as this user.',
					'gutenberg'
				),
				[
					'status' => \rest_authorization_required_code(),
				]
			);
		}

		return true;
	}

	/**
	 * Filters shortcode content through their hooks.
	 *
	 * @since  1.0.0
	 * @access public
	 *
	 * @param  \WP_REST_Request $request Full details about the request.
	 * @return \WP_REST_Response|\WP_Error Response object on success, or WP_Error object on failure.
	 */
	public function get_shortcode_output( $request ) {
		global $post;
		global $wp_embed;

		$style     = '';
		$js        = '';
		$type      = 'html';
		$output    = '';
		$args      = $request->get_params();
		$post_id   = isset( $args['postId'] ) ? \get_post( $args['postId'] ) : null;
		$shortcode = isset( $args['shortcode'] ) ? trim( $args['shortcode'] ) : '';

		// Initialize $data.
		$data = [
			'html'  => $output,
			'type'  => $type,
			'style' => $style,
			'js'    => $js,
		];

		if ( empty( $shortcode ) ) {
			$data['html'] = __( 'Enter something to preview', 'gutenberg' );
			return \rest_ensure_response( $data );
		}

		if ( ! empty( $post_id ) ) {
			\setup_postdata( $post_id );
		}

		if ( \has_shortcode( $shortcode, 'embed' ) ) {
			$output = $wp_embed->run_shortcode( $shortcode );
		}
		else {
			$output = $shortcode;
		}

		$output = \do_shortcode( $output );

		if ( empty( $output ) || ( $output === $shortcode ) ) {
			$data['html'] = __( 'Sorry, couldn\'t render a preview', 'gutenberg' );
			return \rest_ensure_response( $data );
		}

		ob_start();
		\wp_head();
		$style = ob_get_clean();

		ob_start();
		\wp_footer();
		$js = ob_get_clean();

		$data = [
			'html'  => $output,
			'type'  => $type,
			'style' => $style,
			'js'    => $js,
		];

		return \rest_ensure_response( $data );
	}

	/**
	 * Retrieves a shortcode block's schema, conforming to JSON Schema.
	 *
	 * @since              1.0.0
	 * @access             public
	 * @codeCoverageIgnore
	 *
	 * @return array Item schema data.
	 */
	public function get_item_schema() {
		return [
			'$schema'    => 'http://json-schema.org/schema#',
			'title'      => 'shortcode-block',
			'type'       => 'object',
			'properties' => [
				'html'  => [
					'description' => __(
						'The block\'s content with shortcodes filtered through hooks.',
						'gutenberg'
					),
					'type'        => 'string',
					'required'    => true,
				],
				'type'  => [
					'description' => __(
						'The filtered content type - video or otherwise',
						'gutenberg'
					),
					'type'        => 'string',
					'required'    => true,
				],
				'style' => [
					'description' => __(
						'Links to external style sheets needed to render the shortcode',
						'gutenberg'
					),
					'type'        => 'string',
					'required'    => true,
				],
				'js'    => [
					'description' => __(
						'Links to JS and CSS needed to render the shortcode',
						'gutenberg'
					),
					'type'        => 'string',
					'required'    => true,
				],
			],
		];
	}
}
