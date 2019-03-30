<?php
/**
 * Plugin Name:     React Wp Real Estate Agent
 * Plugin URI:      https://github.com
 * Description:     WordPress React Real Estate Agent
 * Author:          Ben Broide
 * Author URI:      https://benbroide.com
 * Text Domain:     react-wp-real-estate-agent
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         React_Wp_Real_Estate_Agent
 */

function WREA_print_react_root_div(){
	echo '<div class=""></div>';
}
add_action('wp_footer', 'WREA_print_react_root_div');
