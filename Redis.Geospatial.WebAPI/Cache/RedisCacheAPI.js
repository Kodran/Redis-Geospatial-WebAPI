"use strict"

var redisSettings = {
    redisHost: "yourRedisServer.redis.cache.windows.net",
    redisPort: "6379",
    redisSSLPort: "6380",
    redisAuthKey: "Your Redis Cache Key"
};

var redis = require('redis'),
    client;

var redisApi = function () {
    client = redis.createClient(redisSettings.redisPort, redisSettings.redisHost);
    client.auth(redisSettings.redisAuthKey);
    client.on("error", function (err) {
        console.log("Redis connection error to " + client.host + ":" + client.port + " - " + err);
    });
};

redisApi.prototype.getGeoRadius = function (key, longitude, latitude, radius, callback) {

    var radiusUnit = "m";
    client.georadius(
        key,
        longitude,
        latitude,
        radius,
        radiusUnit,     //m for meters. km for kilometers. mi for miles. ft for feet.
        'WITHCOORD',    //include the coordinates in the result
        'WITHDIST',     //include the distance from the supplied latitude & longitude
        'ASC',          //closest first
        response
    );

    function response(err, results) {

        if (err) {
            next(err);
            return;
        }

        results = results.map(function (coffeeshop) {

            var resultObject = {
                key: coffeeshop[0],
                distance: coffeeshop[1],
                longitude: coffeeshop[2][0],
                latitude: coffeeshop[2][1]
            };

            return resultObject;
        });

        callback(results);
    };

};

redisApi.prototype.insertGeoLocation = function (key, longitude, latitude, value) {
    return client.geoadd(key, longitude, latitude, value);
};

module.exports = redisApi;
