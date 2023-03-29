/**
 * @file Builds the theme-envy.liquid snippet, which is used to load the theme-envy.js script and critical css
 */

const path = require('path')
const fs = require('fs-extra')
const getAll = require('#Build/functions/get-all.js')
const hasCriticalCSS = getAll('criticalCSS').length > 0 || ThemeEnvy?.tailwind !== false

const markup = `{% comment %} This file is auto-generated by theme-envy. DO NOT EDIT. {% endcomment %}
${hasCriticalCSS ? '{{ \'theme-envy.critical.css\' | asset_url | stylesheet_tag: preload: true }}' : ''}
<script>
(function() {
  const assetUrl = {{ 'image.jpg' | asset_url | json }};
  window.ThemeEnvy = window.ThemeEnvy || {};
  window.ThemeEnvy.publicPath = assetUrl.substring(0, assetUrl.lastIndexOf('/') + 1);
})();
</script>
<script src="{{ 'theme-envy.js' | asset_url }}" defer></script>`

fs.writeFileSync(path.resolve(__dirname, '../theme-envy.liquid'), markup, 'utf8')
