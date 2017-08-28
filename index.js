var express = require('express')
var app = express()

var fs = require('fs')
var _ = require('lodash')
var engines = require('consolidate')

var services =[]

fs.readFile('models/services.json', {encoding: 'utf8'}, function (err, data) {
    if (err) throw  err

    JSON.parse(data).map(function (service) {
        services.push(service)
    })
})

app.engine('hbs', engines.handlebars)
app.set('views', './')
app.set('view engine', 'hbs')

app.get('/', function (req, res) {
res.render('index', {services: services})
})

app.get('/sort/:prop', function (req, res) {
    let prop = req.params.prop;
    let sortedServices = services.sort(function (a, b) {

        if (a[prop] > b[prop]) {
            console.log("1", a[prop], ">", b[prop])
            return 1;
          }
          if (a[prop] < b[prop]) {
            console.log("-1", a[prop], "<", b[prop])
            return -1;
          }
          // a должно быть равным b
        console.log("0", a[prop], "=", b[prop])
        return 0;
    })
    res.render('index', {services: sortedServices})
})
app.get('/:id', function (req, res) {
    let id = req.params.id
    service = services.find((item)=> item.id === id)
    res.render('service', {service: service})
})

var server = app.listen(3000, function () {
    console.log('Server running at http//localhost:' + server.address().port)
})
