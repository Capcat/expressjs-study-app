var express = require('express')
var app = express()

var fs = require('fs')
var _ = require('lodash')
var engines = require('consolidate')

var services =[]

fs.readFile('models/services.json', {encoding: 'utf8'}, function (err, data) {
    if (err) throw  err

    JSON.parse(data).forEach(function (service) {
        services.push(service)
    })
})

app.engine('hbs', engines.handlebars)
app.set('views', './')
app.set('view engine', 'hbs')

app.get('/', function (req, res) {
res.render('index', {services: services})
})


app.get('/:id', function (req, res) {
let id = req.params.id
    service = services.find((item)=> item.id === id)
    res.render('service', {service: service})
})


var server = app.listen(3000, function () {
    console.log('Server running at http//localhost:' + server.address().port)
})