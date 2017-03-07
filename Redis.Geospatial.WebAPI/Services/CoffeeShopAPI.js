/*
 * Coffee Shop REST API Using Redis GeoSpatial feature
 *
 * @module      :: Coffee Shop API
 * @description :: NodeJS REST Web API
 */

module.exports = function (app, redis) {

    /* HTTP METHOD GET COFFEE SHOPS BY GIVEN LOCATION */
    app.get("/api/coffeeshop", function (req, res) {
        
        var coffeePlaces = redis.getGeoRadius(
            req.query.key,
            req.query.longitude,
            req.query.latitude,
            req.query.radius,
            response);

        function response(result) {
            res.send(result);
        }
    });

    /* HTTP METHOD POST COFFEE SHOP */
    app.post("/api/coffeeshop", function (req, res) {
        
        var cached = redis.insertGeoLocation(
                req.body.key,
                req.body.longitude,
                req.body.latitude,
                req.body.name);

        res.send(cached);

    });
}