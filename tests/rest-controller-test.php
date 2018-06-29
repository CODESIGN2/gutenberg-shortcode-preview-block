<?php

namespace cd2\wordpress\gutenberg\visualshortcode;

require_once __DIR__ . '/includes/class-wp-http-response.php';
require_once __DIR__ . '/includes/wp-embed.php';

/**
 * Unit Tests for the WP_REST_Controller implementation
 */
class RestController extends \BaseWPMockTestCase
{

  function setUp()
  {
    parent::setUp();
    \Mockery::Mock( '\WP_REST_Controller' );
    \Mockery::Mock( '\WP_Error' );
    \Mockery::Mock( '\WP_Request' );
    $this->controller = new rest\WP_REST_Shortcodes_Controller();
  }

  public function test_we_get_WP_Error_if_user_cannot_edit_post()
  {
    \WP_Mock::wpFunction( 'current_user_can' )
      ->with( 'edit_posts' )
      ->andReturn( false );

    \WP_Mock::wpFunction( 'register_rest_route' );
    \WP_Mock::wpFunction( 'rest_authorization_required_code' );

    $result = $this->controller->get_shortcode_output_permissions_check(
      new \WP_Request
    );
    $this->assertTrue(
      get_class($result) == "WP_Error"
    );
  }

  public function test_we_get_true_if_user_can_edit_post()
  {

    \WP_Mock::wpFunction( 'current_user_can' )
      ->with( 'edit_posts' )
      ->andReturn( true );

    \WP_Mock::wpFunction( 'register_rest_route' );
    \WP_Mock::wpFunction( 'rest_authorization_required_code' );

    $this->assertTrue(
      $this->controller->get_shortcode_output_permissions_check(
        new \WP_Request
      )
    );
  }

  /**
   * @dataProvider restInputProvider
   */
  public function test_stubbed_get_output( $post_id, $shortcode_in,
    $shortcode_out, $embed_out, $json_out )
  {
    global $wp_embed;
    $wp_embed->setResult( $embed_out );

    \WP_Mock::wpFunction( 'get_post' )
      ->andReturn( 'notempty' );
    \WP_Mock::wpFunction( 'setup_postdata' );
    \WP_Mock::wpFunction( 'has_shortcode' )
      ->andReturn( !empty( $embed_out ) );
    \WP_Mock::wpFunction( 'wp_head' )
      ->andReturn( '' );
    \WP_Mock::wpFunction( 'wp_footer' )
      ->andReturn( '' );
    \WP_Mock::wpFunction( 'setup_postdata' );
    \WP_Mock::wpFunction( 'do_shortcode' )->andReturnUsing(
      function () use ( $shortcode_out ) {
        return $shortcode_out;
      }
    );

    $request = \Mockery::Mock( '\WP_REST_Response' );

    \WP_Mock::wpFunction( 'rest_ensure_response' )->andReturnUsing(
      function ($in) { return new \WP_HTTP_Response( json_encode( $in ) ); }
    );

    $request = \Mockery::Mock( '\WP_REST_Request' );
    $request->shouldReceive( 'get_params' )
      ->andReturn( [
          'postId'    => $post_id,
          'shortcode' => $shortcode_in,
      ] );

    $result = $this->controller->get_shortcode_output( $request );
    $this->assertEquals(
      $json_out,
      $result->get_data()
    );
  }

  public static function restInputProvider() {
    return [
      [
        null,
        '',
        '',
        '',
        '{"html":"Enter something to preview","type":"html","style":"","js":""}'
      ],
      [
        545,
        'this is just regular text yeah!',
        'this is just regular text yeah!',
        '',
        '{"html":"Sorry, couldn\'t render a preview","type":"html","style":"","js":""}'
      ],
      [
        42,
        '[embed width="500" height="281"]https://www.youtube.com/watch?v=8OBfr46Y0cQ[/embed]',
        '<iframe width="500" height="281" src="https://www.youtube.com/embed/8OBfr46Y0cQ?feature=oembed" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
        '<iframe width="500" height="281" src="https://www.youtube.com/embed/8OBfr46Y0cQ?feature=oembed" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
        '{"html":"<iframe width=\"500\" height=\"281\" src=\"https:\/\/www.youtube.com\/embed\/8OBfr46Y0cQ?feature=oembed\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen><\/iframe>","type":"html","style":"","js":""}'
      ],
      [
        42,
        '[fakeshortcode][/fakeshortcode]',
        '<div class="something vague">Because You\'re worth it</div>',
        '',
        '{"html":"<div class=\"something vague\">Because You\'re worth it<\/div>","type":"html","style":"","js":""}'
      ]
    ];
  }
}
