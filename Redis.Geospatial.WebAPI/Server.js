'use strict';

// ExpressJS Framework
var express = require('express');
// Request Parser 
var bodyParser = require('body-parser');
// Express App
var app = express();
// Server Port (takes azure server port, otherwise default port is 8080)
var port = process.env.PORT || 8080;
//Redis API
var redisApi = require("./Cache/RedisCacheAPI.js");
//Init redis API
var redis = new redisApi();

this.init = function () {

    // For parsing application/json
    app.use(bodyParser.json());
    // For parsing application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));

    // Import REST API
    require("./Services/CoffeeShopAPI.js")(app, redis);

    // Start Server
    app.listen(port);

};

this.init();