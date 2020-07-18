// Using next-routes for dynamic routing in next.js
const routes = module.exports = require('next-routes')();

// :address is a wildcard the represents address
routes
    .add('/campaigns/new', '/campaigns/new')
    .add('/campaigns/:address', '/campaigns/show')
    .add('/campaigns/:address/requests', '/campaigns/requests/index')
    .add('/campaigns/:address/requests/new', '/campaigns/requests/new')

module.exports = routes;