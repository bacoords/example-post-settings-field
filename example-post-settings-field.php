<?php
/**
 * Plugin Name:       Example Post Settings Field
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       example-post-settings-field
 *
 * @package           wpdev
 */

namespace WPDev\ExamplePostSettingsField;

/**
 * Register meta settings for pages
 */
function register_page_meta_settings() {
	register_meta(
		'post',
		'wpdev_has_custom_setting',
		array(
			'show_in_rest' => true,
			'single'       => true,
			'type'         => 'boolean',
		)
	);
}
add_action( 'init', __NAMESPACE__ . '\register_page_meta_settings' );




/**
 * Add body class if post has custom setting.
 *
 * @param array $classes The body classes.
 * @return array
 */
function filter_body_class_for_header( $classes ) {
	if ( is_singular( 'post' ) ) {
		$has_custom_setting = get_post_meta( get_the_ID(), 'wpdev_has_custom_setting', true );
		if ( $has_custom_setting ) {
			$classes[] = 'has-custom-setting';
		}
	}
	return $classes;
}
add_filter( 'body_class', __NAMESPACE__ . '\filter_body_class_for_header' );


/**
 * Enqueue block editor script.
 *
 * @return void
 */
function enqueue_block_editor_script() {
	$asset_file = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

	wp_enqueue_script(
		'wpdev-example-post-settings-field',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version'],
		true
	);
}
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_block_editor_script' );
