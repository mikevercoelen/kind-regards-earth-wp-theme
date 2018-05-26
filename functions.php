<?php

if (!defined('KRE_VERSION')) {
  define('KRE_VERSION', '1.0.0');
}

if (!defined('KRE_APP')) {
  define('KRE_APP', 'kre');
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function kre_setup() {
	// load_theme_textdomain('kre', get_template_directory() . '/languages');

	add_theme_support('automatic-feed-links');
	add_theme_support('title-tag');
	add_theme_support('post-thumbnails');
	// This theme uses wp_nav_menu() in one location.
	// register_nav_menus( array(
	// 	'primary' => esc_html__('Primary Menu', 'kre'),
	// ));

	add_theme_support('html5', array(
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	));
}
add_action('after_setup_theme', 'kre_setup');

/**
 * Enqueue scripts and styles.
 */
function kre_scripts() {
	if (is_customize_preview()) {
		wp_enqueue_script(
      'kre-customize-preview', get_template_directory_uri() . '/build/customize-preview.js',
      array(
        'jquery',
        'customize-preview',
        'customize-preview-nav-menus',
        KRE_APP
      ),
      KRE_VERSION,
      true
    );
	}

	wp_enqueue_style('kre-style', get_template_directory_uri() . '/build/app.css', array(), KRE_VERSION);
  wp_enqueue_script('yt-player', 'https://www.youtube.com/iframe_api', array(), true);

	wp_enqueue_script(
    KRE_APP, get_template_directory_uri() . '/build/app.js',
    array(
      'jquery',
      'wp-a11y'
    ),
    KRE_VERSION,
    true
  );

	if (is_child_theme()) {
		wp_enqueue_style('kre-child-style', get_stylesheet_uri());
	}

	$url = trailingslashit(home_url());
	$path = trailingslashit(wp_parse_url( $url )['path']);

	$front_page_slug = false;
	$blog_page_slug = false;

	if ('posts' !== get_option('show_on_front')) {
		$front_page_id = get_option('page_on_front');
		$front_page = get_post( $front_page_id );

		if ( $front_page->post_name ) {
			$front_page_slug = $front_page->post_name;
		}

		$blog_page_id = get_option('page_for_posts');
		$blog_page = get_post($blog_page_id);

		if ($blog_page->post_name) {
			$blog_page_slug = $blog_page->post_name;
		}
	}

	$user_id = get_current_user_id();
	$kre_settings = sprintf(
		'var SiteSettings = %s; var WPSettings = %s;',
		wp_json_encode(array(
			'endpoint' => esc_url_raw($url),
			'nonce' => wp_create_nonce('wp_rest'),
		)),
		wp_json_encode(array(
			'user' => $user_id,
			'userDisplay' => $user_id ? get_the_author_meta('display_name', $user_id) : '',
      'templateUrl' => get_template_directory_uri(),
			'frontPage' => array(
				'page' => $front_page_slug,
				'blog' => $blog_page_slug,
			),
			'URL' => array(
				'base' => esc_url_raw($url),
				'path' => $path,
			),
			'meta' => array(
				'title' => get_bloginfo('name', 'display'),
				'description' => get_bloginfo('description', 'display'),
			),
		))
	);

	wp_add_inline_script(KRE_APP, $kre_settings, 'before');
}

add_action('wp_enqueue_scripts', 'kre_scripts');

/**
 * Add "pagename" to the accepted parameters in the query for page requests via API.
 *
 * @param array           $args    Key value array of query var to query value.
 * @param WP_REST_Request $request The request used.
 */
function kre_add_path_to_page_query($args, $request) {
	if (isset( $request['pagename']) ) {
		$args['pagename'] = $request['pagename'];
	}

	return $args;
}

add_filter('rest_page_query', 'kre_add_path_to_page_query', 10, 2);

// add_filter( 'rest_prepare_post', 'dt_use_raw_post_content', 10, 3 );
// function dt_use_raw_post_content( $data, $post, $request ) {
//     $data->data['content']['plaintext'] = $post->post_content;
//     return $data;
// }

// Add `next` and `previous` to the objects
add_filter('rest_prepare_post', function($response, $post, $request) {
  global $post;
  $nextPost = get_adjacent_post( false, '', false );
  $previousPost = get_adjacent_post( false, '', true );

  $response->data['next'] = (is_a($nextPost, 'WP_Post')) ? $nextPost->ID : null;
  $response->data['previous'] = (is_a($previousPost, 'WP_Post')) ? $previousPost->ID : null;

  return $response;
}, 10, 3);

// Allow anon comments via API when using this theme.
add_filter('rest_allow_anonymous_comments', '__return_true');

// Include extra functionality.
require get_template_directory() . '/inc/permalinks.php';
require get_template_directory() . '/inc/customizer.php';
require get_template_directory() . '/inc/short-codes.php';

// hide the admin bar, its just fugly as hell
function remove_admin_bar() {
	show_admin_bar(false);
}

add_action('after_setup_theme', 'remove_admin_bar');
