/*
  * This is a prebuild helper script that will inject the schema js file into the liquid file
  * Usage: {% schema 'schema-file.js' %}
  * This will replace the {% schema %} tag with the schema
*/
module.exports = function({ source, filePath }) {
  if (!filePath.includes('sections')) return source
  const schema = source.match(/{% schema '(.*)' %}/g) || source.match(/{% schema "(.*)" %}/g)
  // if there are no schema tags with a filename string, return
  if (!schema) return source
  // regexp for a quoted string within our schema match
  const schemaFile = schema[0].match(/'(.*)'/)[1] || schema[0].match(/"(.*)"/)[1]
  // load the file export
  const schemaSource = ThemeRequire(schemaFile, { globStr: 'src/**/{schema,_schema}/', loader: filePath })
  // replace the {% schema %} tag with the schema string and update asset
  return source.replace(schema[0], formatSchema(schemaSource))
}

function formatSchema(schema) {
  return `{% schema %}
${JSON.stringify(schema, null, 2)}
{% endschema %}
`
}
