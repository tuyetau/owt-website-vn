<?php

namespace Drupal\sdt_commons\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Messenger\Messenger;
use Drupal\Core\Config\ConfigFactoryInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Implements the Sdt Commons admin settings form.
 */
class SdtCommonsConfigForm extends ConfigFormBase {

  /**
   * The D8 messenger.
   *
   * @var \Drupal\Core\Messenger\Messenger
   */
  protected $messenger;

  /**
   * Constructs $messenger and $config_factory objects.
   *
   * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
   *   The factory for configuration objects.
   * @param \Drupal\Core\Messenger\Messenger $messenger
   *   The D8 messenger object.
   */
  public function __construct(ConfigFactoryInterface $config_factory, Messenger $messenger) {
    $this->messenger = $messenger;
    parent::__construct($config_factory);
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('config.factory'),
      $container->get('messenger')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getFormID() {
    return 'sdt_commons_admin_settings';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->configFactory->get('sdt_commons.settings');

    if ($config->get('sdt_commons_google_tag_manager_on')) {
      $this->messenger->addMessage($this->t('Sdt Commons module - Google Tag Manager is active.'));
    }
    else {
      $this->messenger->addMessage($this->t('Sdt Commons module - Google Tag Manager is INACTIVE.'));
    }

    if ($config->get('sdt_commons_google_optimize_on')) {
      $this->messenger->addMessage($this->t('Sdt Commons module - Google Optimize is active.'));
    }
    else {
      $this->messenger->addMessage($this->t('Sdt Commons module - Google Optimize is INACTIVE.'));
    }

    $this->messenger->addMessage($this->t('Disabled fields are overridden in site-specific configuration file.'), 'warning');

    $form['onoff'] = [
      '#type'  => 'details',
      '#title' => $this->t('Install options'),
      '#open' => TRUE,
    ];
    $form['onoff']['sdt_commons_google_tag_manager_on'] = [
      '#type' => 'radios',
      '#title' => $this->t('Turn Google Manager on or off'),
      '#default_value' => $config->get('sdt_commons_google_optimize_on') ? 'on' : 'off',
      '#options' => ['on' => $this->t('On'), 'off' => $this->t('Off')],
      '#description' => $this->t('To disable Google Tag Manager you must turn it off here first.'),
      '#disabled' => $this->isOverridden('sdt_commons_google_optimize_on'),
    ];
    $form['onoff']['sdt_commons_google_optimize_on'] = [
      '#type' => 'radios',
      '#title' => $this->t('Turn Google Optimize on or off'),
      '#default_value' => $config->get('sdt_commons_google_optimize_on') ? 'on' : 'off',
      '#options' => ['on' => $this->t('On'), 'off' => $this->t('Off')],
      '#description' => $this->t('To disable Google Optimize you must turn it off here first.'),
      '#disabled' => $this->isOverridden('sdt_commons_google_optimize_on'),
    ];
    $form['tags'] = [
      '#type'  => 'details',
      '#title' => $this->t('Tags to integrate into the header'),
      '#open' => TRUE,
    ];
    $form['tags']['sdt_commons_google_tag_manager_id'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Google Tag Manager ID'),
      '#default_value' => $config->get('sdt_commons_google_tag_manager_id'),
      '#description' => $this->t('Account ID GTM-XXXX'),
      '#disabled' => $this->isOverridden('sdt_commons_google_tag_manager_id'),
    ];
    $form['tags']['sdt_commons_google_tag_manager_script_tag'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Script tag'),
      '#default_value' => $config->get('sdt_commons_google_tag_manager_script_tag'),
      '#description' => $this->t("JS snippet for loading the Google Tag Manager (without the \<script\> tag"),
      '#disabled' => $this->isOverridden('sdt_commons_google_tag_manager_script_tag'),
    ];
    $form['tags']['sdt_commons_google_optimize_style_tag'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Style tag'),
      '#default_value' => $config->get('sdt_commons_google_optimize_style_tag'),
      '#description' => $this->t('CSS tag to minimize page flickerging (without the \<style\> tag'),
      '#disabled' => $this->isOverridden('sdt_commons_google_optimize_style_tag'),
    ];
    $form['tags']['sdt_commons_google_optimize_script_tag'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Script tag'),
      '#default_value' => $config->get('sdt_commons_google_optimize_script_tag'),
      '#description' => $this->t("JS snippet for loading the Google Analytics and Optimize plugin and handling page flickering (without the \<script\> tag"),
      '#disabled' => $this->isOverridden('sdt_commons_google_optimize_script_tag'),
    ];
    $form['page'] = [
      '#type'  => 'details',
      '#title' => $this->t('Location'),
      '#open' => TRUE,
    ];
    $form['page']['sdt_commons_google_optimize_page'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Page'),
      '#default_value' => $config->get('sdt_commons_google_optimize_page'),
      '#description' => $this->t('Specify the path(s) where the Google Optimize must be activated (one per line, can use regex). Note : when enabled, the Google Tag Manager is deployed on all pages.'),
      '#disabled' => $this->isOverridden('sdt_commons_google_optimize_page'),
    ];


    return parent::buildForm($form, $form_state);
  }

  /**
   * Check if config variable is overridden by the settings.php.
   *
   * @param string $name
   *   STMP settings key.
   *
   * @return bool
   *   Boolean.
   */
  protected function isOverridden($name) {
    $original = $this->configFactory->getEditable('sdt_commons.settings')->get($name);
    $current = $this->configFactory->get('sdt_commons.settings')->get($name);
    return $original != $current;
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    $values = $form_state->getValues();

    if ($values['sdt_commons_google_optimize_on'] == 'on' && $values['sdt_commons_google_optimize_style_tag'] == '') {
      $form_state->setErrorByName('sdt_commons_google_optimize_style_tag', $this->t('You must enter a style tag.'));
    }

    if ($values['sdt_commons_google_optimize_on'] == 'on' && $values['sdt_commons_google_optimize_script_tag'] == '') {
      $form_state->setErrorByName('sdt_commons_google_optimize_script_tag', $this->t('You must enter a script tag.'));
    }

    if ($values['sdt_commons_google_optimize_on'] == 'on' && $values['sdt_commons_google_optimize_page'] == '') {
      $form_state->setErrorByName('sdt_commons_google_optimize_page', $this->t('You must specify a location.'));
    }

    if ($values['sdt_commons_google_tag_manager_on'] == 'on' && $values['sdt_commons_google_tag_manager_script_tag'] == '') {
      $form_state->setErrorByName('sdt_commons_google_tag_manager_script_tag', $this->t('You must enter a script tag.'));
    }
    if ($values['sdt_commons_google_tag_manager_on'] == 'on' && $values['sdt_commons_google_tag_manager_id'] == '') {
      $form_state->setErrorByName('sdt_commons_google_tag_manager_id', $this->t('You must specify the Google Tag Manager ID.'));
    }
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $values = $form_state->getValues();
    $config = $this->configFactory->getEditable('sdt_commons.settings');

    if (!$this->isOverridden('sdt_commons_google_optimize_on')) {
      $config->set('sdt_commons_google_optimize_on', $values['sdt_commons_google_optimize_on'] == 'on')->save();
    }
    if (!$this->isOverridden('sdt_commons_google_tag_manager_on')) {
      $config->set('sdt_commons_google_tag_manager_on', $values['sdt_commons_google_tag_manager_on'] == 'on')->save();
    }
    $config_keys = [
      'sdt_commons_google_optimize_style_tag',
      'sdt_commons_google_optimize_script_tag',
      'sdt_commons_google_optimize_page',
      'sdt_commons_google_tag_manager_script_tag',
      'sdt_commons_google_tag_manager_id',
    ];
    foreach ($config_keys as $name) {
      if (!$this->isOverridden($name)) {
        $config->set($name, $values[$name])->save();
      }
    }

    parent::submitForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   *
   * @todo - Flesh this out.
   */
  public function getEditableConfigNames() {}

}
