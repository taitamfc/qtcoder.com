<?php
/**
 * Describe child theme functions
 *
 * @package Educenter
 * @subpackage Learn Press Education
 * 
 */

 if ( ! function_exists( 'learn_press_education_commerce_setup' ) ) :

    /*
     * Make theme available for translation.
     * Translations can be filed in the /languages/ directory.
     * If you're building a theme based on Learn Press Education, use a find and replace
     * to change 'learn-press-education' to the name of your theme in all the template files.
    */
    load_theme_textdomain( 'learn-press-education', get_template_directory() . '/languages' );

    add_theme_support( "title-tag" );
    add_theme_support( 'automatic-feed-links' );
    /**
     * Sets up theme defaults and registers support for various WordPress features.
     *
     * Note that this function is hooked into the after_setup_theme hook, which
     * runs before the init hook. The init hook is too late for some features, such
     * as indicating support for post thumbnails.
     */
    function learn_press_education_commerce_setup() {
        
        $learn_press_education_commerce_theme_info = wp_get_theme();
        $GLOBALS['learn_press_education_commerce_version'] = $learn_press_education_commerce_theme_info->get( 'Version' );

        // This theme uses wp_nav_menu() in one location.
        register_nav_menus( array(
            'menu-3' => esc_html__( 'Top Menu', 'learn-press-education' ),
        ) );
    }
endif;
add_action( 'after_setup_theme', 'learn_press_education_commerce_setup' );


/**
 * Enqueue child theme styles and scripts
*/
function learn_press_education_commerce_scripts() {
    
    global $learn_press_education_commerce_version;

    wp_dequeue_style( 'educenter-style' );

    wp_dequeue_style( 'educenter-responsive' );
    
	wp_register_style( 'educenter-parent-style', trailingslashit( esc_url ( get_template_directory_uri() ) ) . 'style.css', array('educenter-responsive'), esc_attr( $learn_press_education_commerce_version ) );
    if(class_exists('LearnPress')){
        wp_enqueue_style( 'learn-press-education-style', get_stylesheet_uri(), array('educenter-parent-style', 'learnpress'), esc_attr( $learn_press_education_commerce_version ) );
    }else{
        wp_enqueue_style( 'learn-press-education-style', get_stylesheet_uri(), array('educenter-parent-style'), esc_attr( $learn_press_education_commerce_version ) );
    }


    wp_enqueue_style( 'educenter-parent-responsive', get_template_directory_uri() . '/assets/css/responsive.css' );

    if ( has_header_image() ) {
		$custom_css = '.ed-breadcrumb, .lp-archive-courses .course-summary .course-summary-content .course-detail-info{ background-image: url("' . esc_url( get_header_image() ) . '"); background-repeat: no-repeat; background-position: center center; background-size: cover; }';
		wp_add_inline_style( 'learn-press-education-style', $custom_css );
	}
	wp_enqueue_script( 'learnpress-script', get_stylesheet_directory_uri() . '/js/custom.js', array('jquery'), esc_attr( $learn_press_education_commerce_version ), true );
}
add_action( 'wp_enqueue_scripts', 'learn_press_education_commerce_scripts', 20 );

/**
 * Enqueue required scripts/styles for customizer panel
 *
 * @since 1.0.0
 *
 */
function learn_press_education_commerce_customize_scripts(){
	wp_enqueue_script('learn-press-education-customizer', get_template_directory_uri() . '/assets/js/admin.js', array('jquery', 'customize-controls'), true);
}
add_action('customize_controls_enqueue_scripts', 'learn_press_education_commerce_customize_scripts');

require_once (get_stylesheet_directory(  ). '/inc/init.php');

/** register sidbar */
if( !function_exists('learn_press_education_register_sidebar')){
	function learn_press_education_register_sidebar(){
		if ( class_exists( 'LearnPress' ) ) {
			register_sidebar(
				array(
					'name'          => esc_html__( 'Sidebar Courses', 'learn-press-education' ),
					'id'            => 'sidebar_courses',
					'description'   => esc_html__( 'Sidebar Courses', 'learn-press-education' ),
					'before_widget' => '<aside id="%1$s" class="widget %2$s">',
					'after_widget'  => '</aside>',
					'before_title'  => '<h4 class="widget-title">',
					'after_title'   => '</h4>',
				)
			);
		}
	}
}
add_action( 'widgets_init', 'learn_press_education_register_sidebar' );

add_filter('educenter_starter_content_theme_mods', function( $modes ){
    // $modes['educenter_slider_options'] = 'disable';
    $modes['educenter_primary_color'] = '#54039d';
    
    return $modes;
});