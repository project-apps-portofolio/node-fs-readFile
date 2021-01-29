var express = require('express');
var app = express.Router();
const http = require('http');
const fs = require('fs');

var dateFormat = require('dateformat');

app.get('/', function(req, res) {
    res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
    res.render('index');


    let now = new Date();
    let NowDate = (dateFormat(now, "dd.mm.yyyy"));

    var baseUrl = 'http://192.168.2.77/api/v1/';
    var urlSchedules = baseUrl +  'schedulesjson/'+NowDate;
    var urlJobs =  baseUrl + 'jobsjson'
    var urlRIB = baseUrl + 'schedulesjson/get/rib';

        http.get(urlSchedules, function(res){
            var body = '';
            res.on('data', function(chunk){
                body += chunk;
            });

            res.on('end', function(){
                const ScheduleJson = '/opt/lampp/htdocs/schedule-timeline-prod/public/scheduleJson.json'
                var fbResponse = JSON.parse(body);
                console.log("Got a response: ", fbResponse);
                const jsonString = JSON.stringify(fbResponse);
                
                fs.writeFile(ScheduleJson, jsonString, err => {
                    if (err) {
                        console.log('Error writing file', err)
                    } else {
                        console.log('Successfully wrote file Schedules')
                    }
                })

            });
            

        }).on('error', function(e){
            console.log("Got an error: ", e);
        });


        // JSON JOB JSON

        http.get(urlJobs, function(res){
            var body = '';
            res.on('data', function(chunk){
                body += chunk;
            });

            res.on('end', function(){
                const ScheduleJsonJob = '/opt/lampp/htdocs/schedule-timeline-prod/public/jobJson.json'
                var fbResponse = JSON.parse(body);
                console.log("Got a response: ", fbResponse);
                const jsonString = JSON.stringify(fbResponse);
                
                fs.writeFile(ScheduleJsonJob, jsonString, err => {
                    if (err) {
                        console.log('Error writing file', err)
                    } else {
                        console.log('Successfully wrote file JOBS')
                    }
                })

            });
            

        }).on('error', function(e){
            console.log("Got an error: ", e);
        });

        // RIB

        http.get(urlRIB, function(res){
            var body = '';
            res.on('data', function(chunk){
                body += chunk;
            });

            res.on('end', function(){
                const ScheduleJsonRIB = '/opt/lampp/htdocs/schedule-timeline-prod/public/ribJson.json'
                var fbResponse = JSON.parse(body);
                console.log("Got a response: ", fbResponse);
                const jsonString = JSON.stringify(fbResponse);
                
                fs.writeFile(ScheduleJsonRIB, jsonString, err => {
                    if (err) {
                        console.log('Error writing file', err)
                    } else {
                        console.log('Successfully wrote file RIB')
                    }
                })

            });
            

        }).on('error', function(e){
            console.log("Got an error: ", e);
        });
});

module.exports = app;