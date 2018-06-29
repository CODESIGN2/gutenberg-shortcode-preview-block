<?php

namespace cd2\wordpress\gutenberg\visualshortcode;

use function cd2\wordpress\gutenberg\visualshortcode\init as InitPlugin;

/**
 * Unit Tests for the Main Plugin File
 */
class Main extends \BaseWPMockTestCase
{

    public function test_sanity()
    {
       $this->assertTrue( true );
    }

    public function test_init_hooks_fired() {
        \WP_Mock::expectActionAdded(
          'rest_api_init',
          'cd2_register_rest_routes'
        );
      	\WP_Mock::expectActionAdded(
          'enqueue_block_editor_assets',
          'cd2_sc_enqueue_block_editor_assets'
        );
        InitPlugin();

        \WP_Mock::assertHooksAdded();
    }

    public function test_call_enqueue_loads_css_and_js()
    {

      \WP_Mock::wpFunction( 'plugins_url' );
      \WP_Mock::wpFunction( 'plugin_dir_path', [
          'return' => __DIR__ . '/../src/',
      ]);

      cd2_sc_enqueue_block_editor_assets();

      $this->enqueue_script->once();
      $this->enqueue_style->once();

      \WP_Mock::assertHooksAdded();
    }

    public function test_registering_rest_route_without_wp()
    {
      cd2_register_rest_routes();
    }

    public function test_registering_rest_route_with_mock_wp()
    {
      $controller = \Mockery::Mock( '\WP_REST_Controller' );

      \WP_Mock::wpFunction( 'register_rest_route' )->once();

      cd2_register_rest_routes();
    }
}
