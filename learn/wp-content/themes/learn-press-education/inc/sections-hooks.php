<?php
add_action( 'wp_head', 'learn_press_educenter_remove_course_action' );
function learn_press_educenter_remove_course_action() {
    remove_action( 'educenter_courses','educenter_courses_section', 35 );
	remove_action( 'educenter_services','educenter_services_section', 25 );
}

if ( ! function_exists( 'learn_press_education_courses_section' ) ) :

	/**
	 * Courses Section
	 *
	 * @since 1.0.0
	*/
	function learn_press_education_courses_section() { 

		$courses = get_theme_mod( 'educenter_courses_section_area_options', 1 );

		if( !empty( $courses ) && $courses == 1 ){ ?>

			<section id="edu-courses-section" class="ed-courses layout-2">
				<div class="container">
					<?php

						/**
						 * Section Main Title & SubTitle
						*/
						$title    = get_theme_mod('educenter_courses_section_title');
						$subtitle = get_theme_mod('educenter_courses_section_subtitle');

						educenter_section_title( $title, $subtitle );
					?>

					<div class="ed-isotope lp-archive-courses">
						<div class="ed-col-wrap">
							<ul class="learn-press-courses" data-layout="grid">
								<?php

								$courses = get_theme_mod('educenter_course_area_settings');

								if( $courses ) {
                                    $courses = explode(',', $courses);
									$course_query = new WP_Query(
                                        array(
                                            'post_type'      => 'lp_course',
                                            'posts_per_page' => get_theme_mod('educenter_course_area_number_of_course', 8),
                                            'tax_query' => array(
                                                array(
                                                    'taxonomy' => 'course_category',
                                                    'field' => 'term_id',
                                                    'terms' => $courses
                                                ),
                                            ),
                                        )
                                    );


                                    while ( $course_query->have_posts() ) {
                                        $course_query->the_post();
                                        learn_press_get_template( 'content-course.php' );
                                    }
                                    wp_reset_postdata();
									
                                } ?>
								
							</ul>	
						</div>
					</div>
				</div>
			</section>

	<?php } }

endif;
add_action( 'educenter_courses','learn_press_education_courses_section', 35 );

if ( ! function_exists( 'learn_press_education_services_section' ) ) :

	/**
	 * Services Section
	 *
	 * @since 1.0.0
	*/
	function learn_press_education_services_section() { 

		$services = get_theme_mod( 'educenter_services_area_options', 1 );

		if( !empty( $services ) && $services == 1 ){ ?>

			<section id="edu-services-section" class="ed-services layout-2">
				<div class="container">
					<div class="ed-service-left">
						<?php
							/**
							 * Section Main Title & SubTitle
							*/
							$title    = get_theme_mod('educenter_services_main_title');
							$subtitle = get_theme_mod('educenter_services_main_subtitle');

							educenter_section_title( $title, $subtitle );
						?>
						<div class="ed-col-holder clearfix">
							<?php

								$services = get_theme_mod('educenter_services_area_settings');
								if( $services ) {

								$services = json_decode( $services );

								foreach($services as $service){ 

									$page_id = $service->services_page;

									if( !empty( $page_id ) ) {
										$services_page = get_page($page_id);
							?>
								<div class="col">

									<div class="icon-holder">
										<i class="<?php echo esc_attr( $service->services_icon ); ?>"></i>
									</div>

									<div class="text-holder">

										<h3><a href="<?php the_permalink(); ?>"><?php echo esc_html($services_page->post_title); ?></a></h3>

										<p><?php echo get_the_excerpt($services_page->ID); ?></p>

										<a href="<?php echo esc_url(get_the_permalink($services_page->ID)); ?>" class="ed-button">
											<?php esc_html_e('read more','educenter'); ?>
										</a>

									</div>
								</div>

							<?php  } } } ?>
						</div>
					</div>
				</div>	
			</section>

	<?php } }

endif;

add_action( 'educenter_services','learn_press_education_services_section', 25 );

/**
 * Slider Features Services
*/
if ( ! function_exists( 'learn_press_education_slider_features_services' ) ){

    /**
     * Main Banner/Slider Section
     *
     * @since 1.0.0
    */
    function learn_press_education_slider_features_services() { 

        $features_services = get_theme_mod('learn_press_education_feature_services_area_settings');

        if( $features_services ) {
			$features_services = json_decode( $features_services );
			if( $features_services[0]->fservices_page ){
			?>

            <div class="edu-section-wrapper edu-features-wrapper">
                <div class="container">
                    <div class="grid-items-wrapper edu-column-wrapper">
                        <?php
                            $count = 1;
                            
                            $features_services = json_decode( $features_services );

                            foreach($features_services as $features_service){ 

                                $page_id = $features_service->fservices_page;

                            if( !empty( $page_id ) ) {

                                $fservices_page = new WP_Query( 'page_id='.$page_id );

                            if( $fservices_page->have_posts() ) { while( $fservices_page->have_posts() ) { $fservices_page->the_post();

                        ?>
                            <div class="single-post-wrapper edu-column-<?php echo intval( $count );  ?>">
                                <div class="icon-holder">
                                    <i class="<?php echo esc_attr( $features_service->fservices_icon ); ?>"></i>
                                </div>
                                <h3 class="post-title">
                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                </h3>
                                <?php the_excerpt(); ?>
                            </div>
                        <?php $count++; } } wp_reset_postdata(); } } ?>

                    </div>
                </div>
            </div>
            
<?php } } } }

add_action( 'educenter_action_front_page','learn_press_education_slider_features_services', 6 );