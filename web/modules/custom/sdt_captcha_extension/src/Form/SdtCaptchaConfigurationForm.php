<?php

namespace Drupal\sdt_captcha_extension\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Implement the CAPTCHA configuration form
 */
class SdtCaptchaConfigurationForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'sdt_captcha_configuration_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = \Drupal::config('sdt_captcha_extension.settings');

    $form['enable_disable'] = [
      '#type'  => 'details',
      '#title' => $this->t('Options'),
      '#open' => TRUE,
    ];

    $form['enable_disable']['sdt_captcha_extension_enable_on_all_webforms'] = [
      '#type' => 'radios',
      '#title' => $this->t('Enable or disable captcha for all webforms'),
      '#default_value' => $config->get('sdt_captcha_extension_enable_on_all_webforms') ? 'enable' : 'disable',
      '#options' => ['enable' => $this->t('Enable'), 'disable' => $this->t('Disable')]
    ];
    
    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    parent::validateForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $config = \Drupal::service('config.factory')->getEditable('sdt_captcha_extension.settings');
    $is_enable = $form_state->getValues()['sdt_captcha_extension_enable_on_all_webforms'] == 'enable';
    $config->set('sdt_captcha_extension_enable_on_all_webforms', $is_enable)->save();
    drupal_flush_all_caches();

    parent::submitForm($form, $form_state);
  } 

  /**
   * {@inheritdoc}
   *
   * @todo - Flesh this out.
   */
  public function getEditableConfigNames() {}

}