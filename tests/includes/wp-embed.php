<?php

class FakeWPEmbed {
  public function __construct($result) {
    $this->result = $result;
  }

  public function run_shortcode($in) {
    return $this->result;
  }

  public function setResult($result) {
    $this->result = $result;
  }
}
$wp_embed = new FakeWPEmbed('');
