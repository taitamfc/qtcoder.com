# Change Log

## 2.0.1

 * Fix wrong call to trigger_error

## 2.0.0

 * Remove response and stream factory, use direct implementation of nyholm/psr7
 * PSR18 and HTTPlug 2 support
 * Remove support for php 5.5, 5.6, 7.0 and 7.1
 * SSL Method now defaults to `STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT`

## 1.4.0

 * Support for Symfony 4

## 1.3.0

 * Make sure `Stream::__toString` never throws exception
 * Added more exception
   * `BrokenPipeException`
   * `ConnectionException`
   * `InvalidRequestException`
   * `SSLConnectionException`

## 1.2.0

 * Dropped PHP 5.4 support
 * Using stable version of `php-http/discovery`

## 1.1.0

 * Added discovery as hard dependency
 * Reading more bytes than expected in a stream now returns the remaining content instead of throwing an Error

## 1.0.0

Initial release
