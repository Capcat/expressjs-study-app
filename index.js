var express = require('express');
var app = express();

var fs = require('fs');
var _ = require('lodash');
var engines = require('consolidate');
var bodyParser = require('body-parser');

var services =[];

function getServices() {
    console.log("getServices");
    fs.readFile('models/services.json', {encoding: 'utf8'}, function (err, data) {
        if (err) throw  err;

        JSON.parse(data).forEach(function (service) {
            services.push(service)
        })
    })
}

getServices();

app.engine('hbs', engines.handlebars);
app.set('views', './');
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.render('index', {})
});

/*app.get('/sort/:prop', function (req, res) {
    let prop = req.params.prop;
    let sortedServices = services.sort(function (a, b) {

        if (a[prop] > b[prop]) {
            return 1;
          }
          if (a[prop] < b[prop]) {
              return -1;
          }
          // a должно быть равным b
        return 0;
    });
    res.render('index', {services: sortedServices})
});*/

app.get('/favicon.ico', function(req, res) {
    res.send(204);
});

app.get('/:id', function (req, res) {
    let serviceId = req.params.id;
    console.log("serviceId", serviceId);
    //console.log("services", services);
    const service = services.find((item)=> item.id === serviceId);
    console.log("service", service);
    res.render('service',service)
});

app.get('/:id', function (req, res) {
    let serviceId = req.params.id;
    console.log("serviceId", serviceId);
    //console.log("services", services);
    const service = services.find((item)=> item.id === serviceId);
    console.log("service", service);
    res.render('service',service)
});


// API

app.get('/api/services', function (req, res) {
    res.json(services);
});

app.get('/api/service/:id', function (req, res) {
    let serviceId = req.params.id;
    const service = services.find((item)=> item.id === serviceId);
    res.json(service);
});

app.post('/api/service', function (req, res) {
    const service = Object.assign({}, req.body);
    console.log('serv', service);
    service.id = (services.length + 1).toString();
    services.push(service);
    console.log('service.id', service.id);
    //res.statusCode = 200;
    res.end(service.id);
});

app.put('/api/service/:id', function (req, res) {
    let serviceId = req.params.id;
    let service = services.find((item)=> item.id === serviceId);
    service = Object.assign(service, req.body);
    console.log("service", service);
    res.end()
});


var server = app.listen(3000, function () {
    console.log('Server running at http//localhost:' + server.address().port)
});