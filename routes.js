// Using next-routes for dynamic routing in next.js
const routes = module.exports = require('next-routes')();

// :address is a wildcard the represents address
routes
    .add('/campaigns/new', '/campaigns/new')
    .add('/campaigns/:address', '/campaigns/show')
 
module.exports = routes;