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

function WREA_print_react_root_div(){ ?>
	<style>
		.rcw-conversation-container > .rcw-header {
			/*background-color: red;*/
		}
        .rcw-full-screen .rcw-conversation-container {
            margin-bottom: 130px;
        }
		.rcw-message > .rcw-response {
			background-color: black;
			color: white;
		}

        .rcw-new-message {
            font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
            font-size: inherit;
        }
        .rcw-send {
            padding: inherit;
        }
        @media screen and (min-width: 1000px) {
            .rcw-full-screen.rcw-opened {
                height: 100%;
                width: 30%;
            }
        }
        .rwre-toggle-button {
            margin: 25px;
            right: 0;
            bottom: 0;
            position: absolute;
            max-width: 100px;
            border-radius: 75px;
        }


	</style>
	<div id="root"></div>
<?php }
add_action('wp_footer', 'WREA_print_react_root_div');

function RWRE_enqueue_scripts_styles() {
	wp_enqueue_style( 'wp-react-agent', plugin_dir_url( __FILE__ )  . 'react-create-app/build/static/css/main.css' );
	wp_enqueue_script( 'wp-react-agent', plugin_dir_url( __FILE__ ) . 'react-create-app/build/static/js/main.js' , [], '', true );
}
add_action( 'wp_enqueue_scripts', 'RWRE_enqueue_scripts_styles' );
