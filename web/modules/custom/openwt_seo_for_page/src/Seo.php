<?php

namespace Drupal\openwt_seo_for_page;

use Drupal\taxonomy\Entity\Term;
use \Drupal\node\Entity\Node;
use Drupal\openwt_seo_for_page;

/**
 * Utilities for content extraction
 *
 * @author jbr
 */
class Seo
{
  public static function addSeoInHeader(array &$variables)
  {
    $urlParams = str_replace('/', '', \Drupal::service('path.current')->getPath());
    $keyName = $urlParams . '_key';
    $descriptionName = $urlParams . '_description';

    if ($description = self::getValueFromConfig($descriptionName)) {
      $tag['#attributes']['content'] = $description;

      $tag_description = array(
        '#type' => 'html_tag',
        '#tag' => 'meta',
        '#attributes' => array(
          'name' => 'description',
          'content' => t($description)
        )
      );

      array_push($variables['page']['#attached']['html_head'],array($tag_description, 'description'));
    }

    if ($keywords = self::getValueFromConfig($keyName)) {
      $tag_keywords = array(
        '#type' => 'html_tag',
        '#tag' => 'meta',
        '#attributes' => array(
          'name' => 'keywords',
          'content' => t($keywords)
        )
      );
      array_push($variables['page']['#attached']['html_head'],array($tag_keywords, 'keywords'));
    }
  }

  public static function getValueFromConfig($key)
  {
    return \Drupal::config('openwt_seo_for_page.form')->get($key);
  }
}
