var getbabelRelayPlugin = require('babel-relay-plugin');
var schema = require('./schema');

module.exports = getbabelRelayPlugin(schema.data);
