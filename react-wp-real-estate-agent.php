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

function WREA_print_react_root_div() { ?>
    <style>
        @import url('https://fonts.googleapis.com/css?family=Roboto');

        .rcw-widget-container {
            font-family: 'Roboto', sans-serif;
        }

        .rcw-conversation-container > .rcw-header {
            /*background-color: red; */
        }

        input[type="text"].rcw-new-message {
            font-size: 11px;
            width: 100%;
            border: 0;
            background-color: #f4f7f9;
            height: 30px;
            padding-left: 15px;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        .rcw-full-screen .rcw-conversation-container {
            margin-bottom: 130px;
        }

        .rcw-message > .rcw-response {
            background-color: blue;
            color: white;

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
            /*max-width: 100px;*/
            /*border-radius: 75px;*/
        }


    </style>
    <div id="root"></div>
<?php }

add_action( 'wp_footer', 'WREA_print_react_root_div' );

function RWRE_enqueue_scripts_styles() {
	wp_enqueue_style( 'wp-react-agent', plugin_dir_url( __FILE__ ) . 'react-create-app/build/static/css/main.css' );
	wp_enqueue_style( 'material-ui', 'https://fonts.googleapis.com/icon?family=Material+Icons' );


	wp_enqueue_script( 'wp-react-agent', plugin_dir_url( __FILE__ ) . 'react-create-app/build/static/js/main.js', [], '', true );

	wp_register_script( 'some_handle', 'path/to/myscript.js' );

	wp_localize_script( 'some_handle', 'bot_data',
		[
			'listing_category' => get_terms( [ 'hide_empty' => false, 'taxonomy' => 'listing_category' ] ),
			'amenities'        => get_terms( [ 'hide_empty' => false, 'taxonomy' => 'amenities' ] ),
			'area'             => get_terms( [ 'hide_empty' => false, 'taxonomy' => 'area' ] ),
			'ajax_url'         => admin_url( 'admin-ajax.php' )
		]
	);

// Enqueued script with localized data.
	wp_enqueue_script( 'some_handle' );
}

add_action( 'wp_enqueue_scripts', 'RWRE_enqueue_scripts_styles' );

function remove_unwanted_css() {
	wp_dequeue_style( 'twentynineteen-style' );
	wp_deregister_style( 'twentynineteen-style' );

}

add_action( 'wp_enqueue_scripts', 'remove_unwanted_css', 20 );

// Register Custom Post Type
function lead_post_type() {

	$labels = array(
		'name'                  => _x( 'Leads', 'Post Type General Name', 'text_domain' ),
		'singular_name'         => _x( 'Lead', 'Post Type Singular Name', 'text_domain' ),
		'menu_name'             => __( 'Leads', 'text_domain' ),
		'name_admin_bar'        => __( 'Lead', 'text_domain' ),
		'archives'              => __( 'Item Archives', 'text_domain' ),
		'attributes'            => __( 'Item Attributes', 'text_domain' ),
		'parent_item_colon'     => __( 'Parent Item:', 'text_domain' ),
		'all_items'             => __( 'All Items', 'text_domain' ),
		'add_new_item'          => __( 'Add New Item', 'text_domain' ),
		'add_new'               => __( 'Add New', 'text_domain' ),
		'new_item'              => __( 'New Item', 'text_domain' ),
		'edit_item'             => __( 'Edit Item', 'text_domain' ),
		'update_item'           => __( 'Update Item', 'text_domain' ),
		'view_item'             => __( 'View Item', 'text_domain' ),
		'view_items'            => __( 'View Items', 'text_domain' ),
		'search_items'          => __( 'Search Item', 'text_domain' ),
		'not_found'             => __( 'Not found', 'text_domain' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'text_domain' ),
		'featured_image'        => __( 'Featured Image', 'text_domain' ),
		'set_featured_image'    => __( 'Set featured image', 'text_domain' ),
		'remove_featured_image' => __( 'Remove featured image', 'text_domain' ),
		'use_featured_image'    => __( 'Use as featured image', 'text_domain' ),
		'insert_into_item'      => __( 'Insert into item', 'text_domain' ),
		'uploaded_to_this_item' => __( 'Uploaded to this item', 'text_domain' ),
		'items_list'            => __( 'Items list', 'text_domain' ),
		'items_list_navigation' => __( 'Items list navigation', 'text_domain' ),
		'filter_items_list'     => __( 'Filter items list', 'text_domain' ),
	);
	$args   = array(
		'label'               => __( 'Lead', 'text_domain' ),
		'description'         => __( 'Post Type Description', 'text_domain' ),
		'labels'              => $labels,
		'supports'            => array( 'title' , 'custom-fields'),
		//'taxonomies'          => array( 'category', 'post_tag' ),
		'hierarchical'        => false,
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'menu_position'       => 5,
		'show_in_admin_bar'   => true,
		'show_in_nav_menus'   => true,
		'can_export'          => true,
		'has_archive'         => true,
		'exclude_from_search' => false,
		'publicly_queryable'  => true,
		'capability_type'     => 'page',
	);
	register_post_type( 'lead', $args );

}

// Register Custom Post Type
function listing_post_type() {

	$labels = array(
		'name'                  => _x( 'Listings', 'Post Type General Name', 'text_domain' ),
		'singular_name'         => _x( 'Listing', 'Post Type Singular Name', 'text_domain' ),
		'menu_name'             => __( 'Listings', 'text_domain' ),
		'name_admin_bar'        => __( 'Listing', 'text_domain' ),
		'archives'              => __( 'Item Archives', 'text_domain' ),
		'attributes'            => __( 'Item Attributes', 'text_domain' ),
		'parent_item_colon'     => __( 'Parent Item:', 'text_domain' ),
		'all_items'             => __( 'All Items', 'text_domain' ),
		'add_new_item'          => __( 'Add New Item', 'text_domain' ),
		'add_new'               => __( 'Add New', 'text_domain' ),
		'new_item'              => __( 'New Item', 'text_domain' ),
		'edit_item'             => __( 'Edit Item', 'text_domain' ),
		'update_item'           => __( 'Update Item', 'text_domain' ),
		'view_item'             => __( 'View Item', 'text_domain' ),
		'view_items'            => __( 'View Items', 'text_domain' ),
		'search_items'          => __( 'Search Item', 'text_domain' ),
		'not_found'             => __( 'Not found', 'text_domain' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'text_domain' ),
		'featured_image'        => __( 'Featured Image', 'text_domain' ),
		'set_featured_image'    => __( 'Set featured image', 'text_domain' ),
		'remove_featured_image' => __( 'Remove featured image', 'text_domain' ),
		'use_featured_image'    => __( 'Use as featured image', 'text_domain' ),
		'insert_into_item'      => __( 'Insert into item', 'text_domain' ),
		'uploaded_to_this_item' => __( 'Uploaded to this item', 'text_domain' ),
		'items_list'            => __( 'Items list', 'text_domain' ),
		'items_list_navigation' => __( 'Items list navigation', 'text_domain' ),
		'filter_items_list'     => __( 'Filter items list', 'text_domain' ),
	);
	$args   = array(
		'label'               => __( 'Listing', 'text_domain' ),
		'description'         => __( 'Post Type Description', 'text_domain' ),
		'labels'              => $labels,
		'supports'            => array( 'title', 'editor' ),
		'taxonomies'          => array( 'category', 'post_tag' ),
		'hierarchical'        => false,
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'menu_position'       => 5,
		'show_in_admin_bar'   => true,
		'show_in_nav_menus'   => true,
		'can_export'          => true,
		'has_archive'         => true,
		'exclude_from_search' => false,
		'publicly_queryable'  => true,
		'capability_type'     => 'page',
	);
	register_post_type( 'listing', $args );

}

add_action( 'init', 'listing_post_type', 0 );

add_action( 'init', 'lead_post_type', 0 );



function create_custom_tax() {

	register_taxonomy(
		'listing_category',
		'listing',
		array(
			'label'   => __( 'Listing Category' ),
			'rewrite' => array( 'slug' => 'listing-category' )
		)
	);

	register_taxonomy(
		'area',
		'listing',
		array(
			'label'   => __( 'Area' ),
			'rewrite' => array( 'slug' => 'area' )
		)
	);

	register_taxonomy(
		'amenities',
		'listing',
		array(
			'label'   => __( 'Amenities' ),
			'rewrite' => array( 'slug' => 'amenities' )
		)
	);
}

add_action( 'init', 'create_custom_tax' );

function get_lead() {
	$selections = $_POST['selections'];
    $message              = $_POST['message'];;
    $listing_categories =implode( ',', $selections['categories'] ) ;
	$amenities =implode( ',', $selections['amenities'] ) ;
	$areas =implode( ',', $selections['areas'] ) ;
	if( $selections['post_id'] > 0 ){
	    $post_id = $selections['post_id'];
	    $pre_message = get_post_meta( $post_id, 'message' );
	    $updated_message = $pre_message . PHP_EOL . $message;
		update_post_meta( $post_id, 'message',  $updated_message );
    } else {
		$post_id = wp_insert_post( [ 'post_type'    => 'lead',
		                             'post_title'   => substr( $message, 0, 40 ),
		                             'post_content' => $message
		] );
		update_post_meta( $post_id, 'message',  $message );
	}
    update_post_meta( $post_id, 'listing_categories', $listing_categories);
	update_post_meta( $post_id, 'amenities', $amenities);
	update_post_meta( $post_id, 'areas', $areas );
	update_post_meta( $post_id, 'start_date', $selections['dates']['startDate'] );
	update_post_meta( $post_id, 'end_date', $selections['dates']['endDate'] );

    echo json_encode( ['post_id' => $post_id ] );

	wp_die();
}

add_action( 'wp_ajax_get_lead', 'get_lead' );
add_action( 'wp_ajax_nopriv_get_lead', 'get_lead' );
