<?php

namespace Drupal\sdt_commons\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'SDTCopyright' block.
 *
 * @Block(
 *  id = "SDTCopyright",
 *  admin_label = @Translation("SDT Copyright"),
 * )
 */
class SDTCopyright extends BlockBase {

    /**
     * {@inheritdoc}
     */
    public function build() {
        return array(
            '#type' => 'markup',
            '#markup' => '<div class="col-xs-12">© Copyright Swisscom Digital Technology SA '.date("Y").'</div>'
        );
    }
}
