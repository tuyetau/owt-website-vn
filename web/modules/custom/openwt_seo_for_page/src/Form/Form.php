<?php

namespace Drupal\openwt_seo_for_page\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class Form.
 *
 * @package Drupal\openwt_seo_for_page\Form
 */
class Form extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'openwt_seo_for_page.form',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('openwt_seo_for_page.form');
    $form['trends_key'] = [
      '#type' => 'textfield',
      '#title' => $this->t('trends_key'),
      '#default_value' => $config->get('trends_key'),
    ];
    $form['trends_description'] = [
      '#type' => 'textfield',
      '#title' => $this->t('trends_description'),
      '#default_value' => $config->get('trends_description'),
    ];

    $form['cases_key'] = [
      '#type' => 'textfield',
      '#title' => $this->t('cases_key'),
      '#default_value' => $config->get('cases_key'),
    ];
    $form['cases_description'] = [
      '#type' => 'textfield',
      '#title' => $this->t('cases_description'),
      '#default_value' => $config->get('cases_description'),
    ];

    $form['news_key'] = [
      '#type' => 'textfield',
      '#title' => $this->t('news_key'),
      '#default_value' => $config->get('news_key'),
    ];
    $form['news_description'] = [
      '#type' => 'textfield',
      '#title' => $this->t('news_description'),
      '#default_value' => $config->get('news_description'),
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
    parent::submitForm($form, $form_state);

    $this->config('openwt_seo_for_page.form')
      ->set('trends_key', $form_state->getValue('trends_key'))
      ->set('trends_description', $form_state->getValue('trends_description'))
      ->set('cases_key', $form_state->getValue('cases_key'))
      ->set('cases_description', $form_state->getValue('cases_description'))
      ->set('news_key', $form_state->getValue('news_key'))
      ->set('news_description', $form_state->getValue('news_description'))
      ->save();
  }

}
