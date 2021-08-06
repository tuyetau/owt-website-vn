<?php

namespace Drupal\google_workable_connector\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Messenger\Messenger;
use Drupal\Core\Config\ConfigFactoryInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class GoogleWorkableConfigForm.
 *
 * @package Drupal\google_workable_connector\Form
 */
class GoogleWorkableConfigForm extends ConfigFormBase {

    const WORKABLE_FORM_SETTINGS = 'google_workable_connector.settings';
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
    return 'google_workable_admin_settings';
  }
  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = \Drupal::getContainer()->get('config.factory')->getEditable(self::WORKABLE_FORM_SETTINGS);
    $workable_api_key = !empty($config->get('workable_api_key')) ? $this->t($config->get('workable_api_key')) : "";
    $form['workable_api_key'] = [
      '#type' => 'textfield',
      '#title' => $this->t('API token'),
      '#description' => $this->t('Enter your Workable API token https://resources.workable.com/support/workable-api-documentation'),
      '#maxlength' => 64,
      '#default_value' => $workable_api_key,
      '#size' => 64,
    ];
    $workable_subdomain = !empty($config->get('workable_subdomain')) ? $this->t($config->get('workable_subdomain')) : "";
    $form['workable_subdomain'] = [
      '#type' => 'textfield',
      '#title' => $this->t('The account&#039;s subdomain'),
      '#maxlength' => 64,
      '#default_value' => $workable_subdomain,
      '#size' => 64,
    ];
    $workable_jobs_state = !empty($config->get('workable_jobs_state')) ? $this->t($config->get('workable_jobs_state')) : "";
    $form['workable_jobs_state'] = [
      '#type' => 'select',
      '#title' => $this->t('Jobs State'),
      '#description' => $this->t('Status published for active jobs.'),
      '#options' => ['' => $this->t('--- SELECT ---'), 'draft' => $this->t('Draft'), 'published' => $this->t('Published'), 'archived' => $this->t('Archived'), 'closed' => $this->t('Closed')],
      '#size' => 5,
      '#default_value' => $workable_jobs_state,
    ];
    $workable_cache_lifetime = !empty($config->get('workable_cache_lifetime')) ? $config->get('workable_cache_lifetime') : 1;
    $form['workable_cache_lifetime'] = [
      '#type' => 'number',
      '#title' => $this->t('Cache Lifetime (hours)'),
      '#description' => $this->t('How long the last query result must be cached'),
      '#default_value' => $workable_cache_lifetime,
      '#min' => 1,
      '#max' => 720,
      '#step' => 1,
      '#size' => 3,
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
     $config = \Drupal::getContainer()->get('config.factory')->getEditable(self::WORKABLE_FORM_SETTINGS);
     $config->set('workable_api_key', trim($form_state->getValue('workable_api_key')))
            ->set('workable_subdomain', trim($form_state->getValue('workable_subdomain')))
            ->set('workable_jobs_state', trim($form_state->getValue('workable_jobs_state')))
            ->set('workable_cache_lifetime', $form_state->getValue('workable_cache_lifetime'))
            ->save();
    parent::submitForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   *
   * @todo - Flesh this out.
   */
  public function getEditableConfigNames() {}

}
