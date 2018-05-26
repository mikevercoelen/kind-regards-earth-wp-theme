<?php

function dropcap_shortcode ($attrs, $content = null) {
  return '<span class="dropcap">' . $content . '</span>';
}

add_shortcode('dropcap', 'dropcap_shortcode');
