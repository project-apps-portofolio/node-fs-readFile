var express = require('express');
var app = express.Router();
const http = require('http');
const fs = require('fs');
var global = require('../globals');
var directoryFile = require('../globals_directory');
var directoryLog = require('../globals_logs');


var dateFormat = require('dateformat');

app.get('/', function(req, res) {

    res.statusCode = 200;
    console.log('GET Data From API')

    let now = new Date();
    let NowDate = (dateFormat(now, "dd.mm.yyyy"));

    var baseUrl = global.domain;
    
    var urlSchedules = baseUrl +  'schedulesjson/'+NowDate;
    var urlJobs =  baseUrl + 'jobsjson'
    var urlRIB = baseUrl + 'schedulesjson/get/rib';

        http.get(urlSchedules, function(res){
            var body = '';
            res.on('data', function(chunk){
                body += chunk;
            });

            res.on('end', function(){
                
                const ScheduleJson = directoryFile.schedule_file;
                
                var fbResponse = JSON.parse(body);
                console.log("Got a response: ", fbResponse);
                const jsonString = JSON.stringify(fbResponse);
                
                fs.writeFile(ScheduleJson, jsonString, err => {
                    if (err) {
                        console.log('Error writing file', err.code)
                    } else {
                        console.log('Successfully wrote file Schedules')
                    }
                })

            });
            

        }).on('error', function(e){
            console.log("Got an error: ", e.code);
             var logStream = fs.createWriteStream(directoryLog.schedule_log, {flags: 'a'});

                logStream.write(now + ': ' + e+'\n');
                logStream.end(NowDate);
        });


        // JSON JOB JSON

        http.get(urlJobs, function(res){
            var body = '';
            res.on('data', function(chunk){
                body += chunk;
            });

            res.on('end', function(){
               
                const ScheduleJsonJob = directoryFile.job_file;
               
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
            var logStream = fs.createWriteStream(directoryLog.job_file, {flags: 'a'});

                logStream.write(now + ': ' + e+'\n');
        });

        // RIB

        http.get(urlRIB, function(res){
            var body = '';
            res.on('data', function(chunk){
                body += chunk;
            });

            res.on('end', function(){
                
                const ScheduleJsonRIB =  directoryFile.rib_file;

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
            var logStream = fs.createWriteStream(directoryLog.rib_log, {flags: 'a'});

                logStream.write(now + ': ' + e+'\n');
        });

        res.render('index');

});

module.exports = app;