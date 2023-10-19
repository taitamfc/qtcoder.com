<?php
/**
 * The sidebar containing the main widget area
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Educenter
 * @subpackage Learn Press Education
 */
$get_post_type = get_post_type();
?>

<aside id="secondary" class="secondary-section widget-area">

<?php if ( is_archive('course') || is_archive('quiz') || $get_post_type == "lpr_course" || $get_post_type == "lpr_quiz" || $get_post_type == "lp_course" || $get_post_type == "lp_quiz" ): ?>
	<?php do_action('thim_before_sidebar_course'); ?>
	<?php dynamic_sidebar( 'sidebar_courses' ); ?>
<?php else : ?>
	<?php dynamic_sidebar( 'sidebar-1' ); ?>
<?php endif; ?>

</aside><!-- #secondary -->