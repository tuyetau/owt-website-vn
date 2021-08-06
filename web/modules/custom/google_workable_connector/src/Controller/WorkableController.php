<?php

namespace Drupal\google_workable_connector\Controller;

use Drupal\Core\Controller\ControllerBase;
use \Drupal\google_workable_connector\Form\GoogleWorkableConfigForm as WorkableSettings;
use Drupal\Core\Cache\Cache;
/**
 * Class WorkableController.
 *
 * @package Drupal\google_workable_connector\Controller
 */
class WorkableController extends ControllerBase {

    /**
     * Activejobs.
     *
     * @return string
     *   Return Hello string.
     */
    public function jobsList($state) {
        $config = \Drupal::getContainer()->get('config.factory')->getEditable(WorkableSettings::WORKABLE_FORM_SETTINGS);
        $workable_jobs_state = !empty($config->get('workable_jobs_state')) ? $this->t($config->get('workable_jobs_state')) : "";
        if (empty($state)) {
            $state = $workable_jobs_state;
        }
        $data = self::workableRetrieveJobsFromWorkable($state);
        return new \Symfony\Component\HttpFoundation\JsonResponse($data);
    }

    /**
     * Count.
     *
     * @return string
     *   Return Hello string.
     */
    public function jobsCount($state) {
        $jobs_collection =  $data = self::workableRetrieveJobsFromWorkable($state);
        $count = 0;
        if (!empty($jobs_collection) && is_array($jobs_collection)) {
             $jobs_collection_filtered = array_filter($jobs_collection, function($item) {
                 $location = ($item->location->city != NULL)? $item->location->city:$item->location->country;
                 $location = strtolower($location);
                 return ($location != 'vietnam');
             });
            $count = count($jobs_collection_filtered);
        }
        return new \Symfony\Component\HttpFoundation\JsonResponse($count);
    }

    /**
     * Returns a collection of your account jobs
     * Timestamp parameters input format: Supported input formats for the timestamp fields created_after & updated_after are:
      ISO8601 e.g. 20150708T115616Z
      Unix time (e.g. 1436356721)

     * @param string state Returns jobs with the current state. Possible values (draft, published, archived & closed).
     * @param integer50 limit. Specifies the number of jobs to try and retrieve per page (optional)
     * @param string since_id. Returns results with an ID more than or equal to the specified ID. (optional)
     * @param string max_id. Returns results with an ID less than or equal to the specified ID. (optional)
     * @param timestamp created_after. Returns results created after the specified timestamp. (optional)
     * @param timestamp updated_after. Returns results updated after the specified timestamp.
     * @param string include_fields. Includes additional fields in each job (description, full_description, requirements and benefits).
     * @return array collection of the defined jobs sorted by the time inserted on system, in ascending order (older jobs come first).
     * By default results are limited to 50. The limit can by updated via the request parameter limit. The value specified cannot be more than 100.
     */
    public static function workableRetrieveJobsFromWorkable($state, $limit = 50, $since_id = FALSE, $max_id = FALSE, $created_after = FALSE, $updated_after = FALSE, $include_fields = FALSE) {

      if ($cache = \Drupal::cache()->get('workable-skills')) {
        return $cache->data;
      }
      else {
        $config = \Drupal::getContainer()
          ->get('config.factory')
          ->getEditable(WorkableSettings::WORKABLE_FORM_SETTINGS);
        $api_key = !empty($config->get('workable_api_key')) ? t($config->get('workable_api_key')) : "";
        $sub_domain = !empty($config->get('workable_subdomain')) ? t($config->get('workable_subdomain')) : "";
        $expiry = !empty($config->get('workable_cache_lifetime')) ? $config->get('workable_cache_lifetime') * 60 * 60 : 60 * 60;
        if (empty($state) || empty($api_key) || empty($sub_domain)) {
          trigger_error(__FUNCTION__ . ' not yet implemented in ' . __FILE__, E_USER_ERROR);
          return NULL;
        }
        $api_url = 'https://www.workable.com/spi/v3/accounts/' . $sub_domain . '/jobs';
        // Build requests parameters
        $request_parameters = [];
        $request_parameters['state'] = $state;
        if ($limit) {
          $request_parameters['limit'] = $limit;
        }
        if ($since_id) {
          $request_parameters['since_id'] = $since_id;
        }
        if ($max_id) {
          $request_parameters['max_id'] = $max_id;
        }
        if ($created_after) {
          $request_parameters['created_after'] = $created_after;
        }
        if ($updated_after) {
          $request_parameters['updated_after'] = $updated_after;
        }
        if ($include_fields) {
          $request_parameters['include_fields'] = $include_fields;
        }
        $headers = [
          'Authorization' => 'Bearer ' . $api_key,
          'Content-Type' => 'application/json'
        ];
        try {
          $response = \Drupal::httpClient()
            ->get($api_url, [
              'headers' => $headers,
              'query' => $request_parameters,
              'timeout' => 30
            ]);
          $data = (string) $response->getBody();

          if (!empty($data)) {
            $arr = json_decode($data);
            $jobs_collection = array_reverse($arr->jobs);
            \Drupal::cache()
              ->set('workable-skills', $jobs_collection, $expiry);
            //invalidate tags cache
            Cache::invalidateTags(array('WORKABLE_SKILLS'));
            return $jobs_collection;
          }
        } catch (RequestException $e) {
          watchdog_exception('google_workable_connector', $e);
          return FALSE;
        }
      }
    }

}
