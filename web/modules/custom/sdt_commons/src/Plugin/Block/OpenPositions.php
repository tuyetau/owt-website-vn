<?php

namespace Drupal\sdt_commons\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'OpenPositions' block.
 *
 * @Block(
 *  id = "OpenPositions",
 *  admin_label = @Translation("Open Positions"),
 * )
 */
class OpenPositions extends BlockBase {

    /**
     * {@inheritdoc}
     */
    public function build() {
        // Open position
        $blockMarkup = ' <div class="view view-jobs view-id-news view-display-id-job_list container clearfix job-list" id="open-positions">
                    <div class="view-header">
                        <div class="title-p title-pt title-pl">
                            <h3>' . t('Open positions') . '</h3>
                        </div>    
                    </div>';
        $moduleHandler = \Drupal::service('module_handler');
        // Load jobs from workable
        if ($moduleHandler->moduleExists('google_workable_connector')) {
            $arr = \Drupal\google_workable_connector\Controller\WorkableController::workableRetrieveJobsFromWorkable('published');

            $filter_city = \Drupal\Component\Utility\Html::decodeEntities(
                \Drupal::request()->get('open-positions-city')
            );

            $filter_skill = \Drupal\Component\Utility\Html::decodeEntities(
                \Drupal::request()->get('open-positions-skill')
            );

            $skills_array = array();
            $locations_array = array();

            foreach ($arr as $key => $valjob) {

                $skill = trim($valjob->code);
                $location = trim($valjob->location->city);

                if(!empty($skill) && !in_array($skill, $skills_array))
                {
                    array_push($skills_array, $skill);
                }

                if(!empty($location))
                {
                    array_push($locations_array, trim($location));
                }
            }

            $blockMarkup .= '<div class="filter--container">';

            $blockMarkup .= '<div class="mb--2 input--container dropdown--container dropdown--container-skills col-xs-12 col-md-6">';
            $blockMarkup .= '<div class="input">Search by skill</div>';
            $blockMarkup .= '<div class="dropdown--selected-items">';

            if(!empty($filter_skill)) {
                $blockMarkup .= '<div class="item">'.$filter_skill.'</div>';
            }

            $blockMarkup .= '</div>';

            $blockMarkup .= '<div class="dropdown" tabindex="0">';
            $blockMarkup .= '<ul>';
            foreach($skills_array as $skills)
            {
                $skills_list = array_unique(explode(",", $skills));

                foreach($skills_list as $skill)
                {
                    $skill = trim($skill);

                    if(!empty($skill))
                    {
                        $selected = ($skill == $filter_skill ? "selected" : "");
                        $blockMarkup .= '<li class="item ' . $selected . '" style="display: block;">' . trim($skill) . '</li>';
                    }
                }
            }
            $blockMarkup .= '</ul>';
            $blockMarkup .= '</div>';

            $blockMarkup .= '</div>';

            $blockMarkup .= '<div class="mb--2 input--container dropdown--container dropdown--container-locations col-xs-12 col-md-6">';
            $blockMarkup .= '<div class="input">Search by location</div>';
            $blockMarkup .= '<div class="dropdown--selected-items">';

            if(!empty($filter_city)) {
                $blockMarkup .= '<div class="item">'.$filter_city.'</div>';
            }

            $blockMarkup .= '</div>';

            $blockMarkup .= '<div class="dropdown" tabindex="0">';
            $blockMarkup .= '<ul>';

            $locations_array = array_unique($locations_array);

            foreach($locations_array as $location)
            {
                if(!empty($location))
                {
                    $selected = ($location == $filter_city ? "selected" : "");
                    $blockMarkup .= '<li class="item ' . $selected . '" style="display: block;">' . $location . '</li>';
                }
            }
            $blockMarkup .= '</ul>';
            $blockMarkup .= '</div>';

            $blockMarkup .= '</div>';

            $blockMarkup .= '</div>';

            $blockMarkup .= '<div class="view-jobs">';

            foreach ($arr as $key => $valjob) {
                if ($valjob->location->city != NULL) {
                    $location = $valjob->location->city;
                } else {
                    $location = $valjob->location->country;
                }

                $blockMarkup .= '<div city="'.$location.'" skills="'. $valjob->code .'" class="views-row views-row-' . $key . ' views-row-last col-md-3 col-xs-12">
                        <a href="' . $valjob->url . '" class="item-new">
                            <div class="type-new">
                                ' . $location .
                    '</div>
                            <div class="title-new"><h4>' . $valjob->title . '</h4></div>
                        </a>
                    </div>';
            }
        }
        $blockMarkup .= '</div>'
                . '</div>';

        return array(
            '#type' => 'markup',
            '#markup' => $blockMarkup
        );
    }

}
