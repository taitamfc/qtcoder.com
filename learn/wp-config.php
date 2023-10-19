<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'qtco_learn' );

/** Database username */
define( 'DB_USER', 'qtco_learn' );

/** Database password */
define( 'DB_PASSWORD', 'devcode15' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'sS9QD*9P6*?t6A9)|d#r[T47]X6.EJH<^.a~W:GZHOF{B:)$c zP>)$9]siv:Nbu' );
define( 'SECURE_AUTH_KEY',  '^!9<^RMo0| O-m9$Kf:2GvTD3;,57NS Oe/EA|lJD$e-vG^u~,hgVa5&/?J$p: h' );
define( 'LOGGED_IN_KEY',    '`Z>R9V{=+O`Gf aY3AI>`+oII&c 3l_@Nw;7azWWhDce-bk*acaRf?oE0-);yZet' );
define( 'NONCE_KEY',        '[`YnqjMjf}T/p)s5OGfYD>64ve_`Tu1DG`dY?mhn`myhA~C28qt^0ML.a>h0k=Sa' );
define( 'AUTH_SALT',        '|=B7c)ZM2q}.x:tf)zVYPt!bA0=C(sSdWlF(yv1hkEAayOOBYfa(ER2Oe*-GMgbO' );
define( 'SECURE_AUTH_SALT', ',rrUxYdTa.3<unCf|K>FSI45YdBAPhny<XgX2$P`TXE`9$Df/@WNy$3;82JBl4fZ' );
define( 'LOGGED_IN_SALT',   'uhXnBpV-bp,E~5C3i#oPWo-QU^WL.Ex=1$FB60:Q+X#W.=K5t-Z|c<}rq-I.NblP' );
define( 'NONCE_SALT',       'f-e8DuI+9=)wK7=t9mCYJMAePmQJ>2]q]dqnx_gm)j@w!fiG1Q/#KXEE}L&vo^yA' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
