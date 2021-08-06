<?php

namespace Drupal\sdt_commons\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'LeftMenuCopyRightBlock' block.
 *
 * @Block(
 *  id = "LeftMenuCopyRightBlock",
 *  admin_label = @Translation("Social network links & Copyright - New"),
 * )
 */
class LeftMenuCopyRightBlock extends BlockBase {

    /**
     * {@inheritdoc}
     */
    public function build() {
        return array(
            '#type' => 'markup',
            '#markup' => '<ul id="slide-menu-social">
                            <li><a target="_blank" href="http://www.linkedin.com/company/open-web-technology_3"><i class="fa fa-linkedin"></i></a></li>
                            <li><a target="_blank" href="http://feeds.feedburner.com/OpenWebTechnologyBlog"><i class="fa fa-rss"></i></a></li>
                            <li><a target="_blank" href="https://twitter.com/openwt"><i class="fa fa-twitter"></i></a></li>
                        </ul>
                        <script type="text/javascript" src="https://jira.openwt.com/s/af446ff068e7ed9cd78b85f172e4711a-T/en_US9yn7h3/64014/50/1.4.24/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?locale=en-US&collectorId=aa00e309"></script>
                        <div id="slide-menu-copyright">© Copyright Swisscom Digital Technology SA '.date("Y").'</div>'
        );
    }

}
