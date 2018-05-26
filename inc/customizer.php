<?php

function kre_customize_register(WP_Customize_Manager $wp_customize) {
	$wp_customize->get_setting('blogname')->transport = 'postMessage';
	add_filter('wp_get_nav_menu_items', '_kre_filter_wp_api_nav_menu_items_workaround', 20);
}

add_action('customize_register', 'kre_customize_register');

function _kre_filter_wp_api_nav_menu_items_workaround($items) {
	foreach ($items as &$item) {
		if (is_string( $item->classes)) {
			$item->classes = explode(' ', $item->classes);
		}
	}

	return $items;
}
