<?php

namespace Drupal\sdt_commons\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;

/**
 * Provides a 'SDTFooterBlock' block.
 *
 * @Block(
 *  id = "sdtfooter_block",
 *  admin_label = @Translation("SDT Footer - OpenWT2018"),
 * )
 */
class SDTFooterBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {

    $config= $this->getConfiguration();
    $form['keep_in_touch'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Keep in touch'),
      '#default_value' => isset($config['keep_in_touch']) ? $config['keep_in_touch'] : '',
      '#maxlength' => 64,
      '#size' => 64,
      '#weight' => '0',
    ];
    $form['instagram_url'] = [
      '#type' => 'url',
      '#title' => $this->t('Instagram URL'),
      '#default_value' => isset($config['instagram_url']) ? $config['instagram_url'] : '',
      '#weight' => '0',
    ];
    $form['facebook_url'] = [
      '#type' => 'url',
      '#title' => $this->t('Facebook URL'),
      '#default_value' => isset($config['facebook_url']) ? $config['facebook_url'] : '',
      '#weight' => '0',
    ];
    $form['linkedin_url'] = [
      '#type' => 'url',
      '#title' => $this->t('LinkedIn URL'),
      '#default_value' => isset($config['linkedin_url']) ? $config['linkedin_url'] : '',
      '#weight' => '0',
    ];
    $form['copyright'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Copyright'),
      '#default_value' => isset($config['copyright']) ? $config['copyright'] : '',
      '#maxlength' => 255,
      '#size' => 255,
      '#weight' => '0',
    ];
    $form['privacy_url'] = [
      '#type' => 'entity_autocomplete',
      '#title' => $this->t('Privacy URL'),
      '#target_type' => 'node',
      '#default_value' => isset($config['privacy_url']) ? \Drupal::entityTypeManager()->getStorage('node')->load($config['privacy_url']) : '',
      '#weight' => '0',
      ];
    $form['privacy_text'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Privacy TEXT'),
      '#default_value' => isset($config['privacy_text']) ? $config['privacy_text'] : '',
      '#maxlength' => 64,
      '#size' => 64,
      '#weight' => '0',
    ];
    $form['impressum_url'] = [
      '#type' => 'entity_autocomplete',
      '#target_type' => 'node',
      '#title' => $this->t('Impressum URL'),
      '#default_value' => isset($config['impressum_url']) ? \Drupal::entityTypeManager()->getStorage('node')->load($config['impressum_url']) : '',
      '#weight' => '0',
    ];
    $form['impressum_text'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Impressum TEXT'),
      '#default_value' => isset($config['impressum_text']) ? $config['impressum_text'] : '',
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
    $this->configuration['keep_in_touch'] = $form_state->getValue('keep_in_touch');
    $this->configuration['copyright'] = $form_state->getValue('copyright');
    $this->configuration['instagram_url'] = $form_state->getValue('instagram_url');
    $this->configuration['facebook_url'] = $form_state->getValue('facebook_url');
    $this->configuration['linkedin_url'] = $form_state->getValue('linkedin_url');
    $this->configuration['privacy_url'] = $form_state->getValue('privacy_url');
    $this->configuration['privacy_text'] = $form_state->getValue('privacy_text');
    $this->configuration['impressum_url'] = $form_state->getValue('impressum_url');
    $this->configuration['impressum_text'] = $form_state->getValue('impressum_text');
  }

  /**
   * {@inheritdoc}
   */
  public function build() {

    $impressum = 'abc'; //\Drupal::entityTypeManager()->getStorage('node')->load($this->configuration['impressum_url'])->id();
    $impressum_url = 'ccc';//Url::fromRoute('entity.node.canonical', ['node' => $impressum])->toString();
    $policy = 'hhh';//\Drupal::entityTypeManager()->getStorage('node')->load($this->configuration['privacy_url'])->id();
    $policy_url = 'ooo';//Url::fromRoute('entity.node.canonical', ['node' => $policy])->toString();
    $theme = \Drupal::theme()->getActiveTheme();
    $filePath = '/'. $theme->getPath();
    $markup = '
            <footer>
              <div class="footer">
                <h3 class="footer__title">' . $this->configuration['keep_in_touch'] . '</h3>
                <div class="footer__social">
                  <a class="no-link" rel="noreferrer" href="' . $this->configuration['linkedin_url'] . '" target="_blank">
                    <span class="footer__social__item">
                      <img class="footer__social__image" src="'. $filePath . '/dist/images/svg/linkedin.svg" alt="LinkedIn logo" width="31" height="30">
                    </span>
                  </a>
                  <a class="no-link" rel="noreferrer" href="' . $this->configuration['facebook_url'] . '" target="_blank">
                    <span class="footer__social__item">
                      <img class="footer__social__image" src="'. $filePath . '/dist/images/svg/facebook.svg" alt="Facebook logo" width="31" height="30">
                    </span>
                  </a>
                  <a class="no-link" rel="noreferrer" href="' . $this->configuration['instagram_url'] . '" target="_blank">
                    <span class="footer__social__item">
                      <img class="footer__social__image" src="'. $filePath . '/dist/images/svg/instagram.svg" alt="Instagram logo" width="31" height="30">
                    </span>
                  </a>
                  <a class="no-link" href="#modal-newsletter" target="_self">
                    <span class="footer__social__item">
                      <img class="footer__social__image" src="'. $filePath . '/dist/images/svg/group_copy.svg" alt="Email" width="31" height="30">
                    </span>
                  </a>
                  <div class="footer__copyright">' . $this->configuration['copyright'] .date("Y"). ' - <a href="' . $impressum_url. '">' . $this->configuration['impressum_text'] . '</a> - <a href="' . $policy_url . '">' . $this->configuration['privacy_text'] . '</a> </div>
                </div>
              </div>
            </footer>
            ';

    return array(
      '#type' => 'markup',
      '#markup' => $markup,
      '#cache' => ['contexts' => ['route']],
    );
  }

}
