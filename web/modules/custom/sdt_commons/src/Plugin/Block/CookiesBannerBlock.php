<?php

namespace Drupal\sdt_commons\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;

/**
 * Provides a 'CookiesBannerBlock' block.
 *
 * @Block(
 *  id = "cookies_banner_block",
 *  admin_label = @Translation("Cookies Banner"),
 * )
 */
class CookiesBannerBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {

    $config= $this->getConfiguration();
    $form['banner_text'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Banner text'),
      '#default_value' => isset($config['banner_text']) ? $config['banner_text'] : '',
      '#maxlength' => 255,
      '#size' => 255,
      '#weight' => '0',
    ];
    
    $form['button_text'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Button text'),
      '#default_value' => isset($config['button_text']) ? $config['button_text'] : '',
      '#maxlength' => 64,
      '#size' => 64,
      '#weight' => '0',
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state) {
    parent::blockSubmit($form, $form_state);
    $this->configuration['banner_text'] = $form_state->getValue('banner_text');
    $this->configuration['button_text'] = $form_state->getValue('button_text');
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $markup = '
            <div id="cookies-banner">
			  <div class="container">
                <p class="banner-text">' . $this->configuration['banner_text'] . '</p>
                <div class="accept" id="cks-accept">' . $this->configuration['button_text'] . '</div>
              </div>
            </div>';

    return array(
      '#type' => 'markup',
      '#markup' => $markup,
      '#cache' => ['contexts' => ['route']]
    );
  }

}
