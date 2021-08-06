<?php

namespace Drupal\sdt_commons\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'TaxonomyTermBanner' block.
 *
 * @Block(
 *  id = "TaxonomyTermBanner",
 *  admin_label = @Translation("Taxonomy term banner - New"),
 * )
 */
class TaxonomyTermBanner extends BlockBase {

    /**
     * {@inheritdoc}
     */
    public function build() {
        return array(
            '#type' => 'markup',
            '#markup' => '<div class="header-part black text-center" id="banner">
                    <div class="container container-content">
                        <div class="col-xs-12">
                            <div class="row">
                                <div class="title1"><h2 id="terms-title">TITLE</h2></div>
                                <div class="title2"><h3></h3></div>
                                <div class="icon-part"><i class="fa"></i></div>
                            </div>
                        </div>
                    </div>
                </div>'
        );
    }

}
