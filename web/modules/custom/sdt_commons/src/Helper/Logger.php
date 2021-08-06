<?php

/*
 * Logger class
 * 
 * 
 */

namespace Drupal\sdt_commons\Helper;

/**
 * Logger
 *
 * @author ggn
 */
class Logger {

    
     /**
     * Detailed debug information.
     *
     * @param string $message
     * @param array $context
     * @return null
     */
    public static function debug($message, array $context = array()) {
        \Drupal::logger('sdt_commons')->debug($message, $context);
    }
    
    /**
     * Interesting events.
     *
     * Example: User logs in, SQL logs.
     *
     * @param string $message
     * @param array $context
     * @return null
     */
    public static function info($message, array $context = array()) {
        \Drupal::logger('sdt_commons')->info($message, $context);
    }
    /**
     * Runtime errors that do not require immediate action but should typically
     * be logged and monitored.
     *
     * @param string $message
     * @param array $context
     * @return null
     */
    public static function error($message, array $context = array()) {
        \Drupal::logger('sdt_commons')->error($message, $context);
    }
    
     /**
     * Exceptional occurrences that are not errors.
     *
     * Example: Use of deprecated APIs, poor use of an API, undesirable things
     * that are not necessarily wrong.
     *
     * @param string $message
     * @param array $context
     * @return null
     */
    public static function warning($message, array $context = array()) {
        \Drupal::logger('sdt_commons')->warning($message, $context);
    }

    /**
     * Normal but significant events.
     *
     * @param string $message
     * @param array $context
     * @return null
     */
    public static function notice($message, array $context = array()) {
        \Drupal::logger('sdt_commons')->notice($message, $context);
    }
}
