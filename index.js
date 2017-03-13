var express = require('express')
var app = express()

var fs = require('fs')
var _ = require('lodash')
var services =[]

fs.readFile('models/services.json', {encoding: 'utf8'}, function (err, data) {
    if (err) throw  err

    JSON.parse(data).forEach(function (service) {
        services.push(service)
    })
})

app.set('views', './')
app.set('view engine', 'jade')

app.get('/', function (req, res) {
res.render('index', {services: services})
})

app.get('/:name', function (req, res) {
    var name = req.params.name
    res.send(name)
})

var server = app.listen(3000, function () {
    console.log('Server running at http//localhost:' + server.address().port)
})