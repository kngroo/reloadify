# reloadify - Express middleware for automatically reloading browser upon code change
Add the following lines to your Express app:

var reloadify = require('reloadify');
reloadify(app, __dirname + '/views'); //assuming your views are stored there


Add the following line to your html (uses ejs):

<%- watchScript %>

