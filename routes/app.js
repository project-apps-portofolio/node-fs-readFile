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
    let NowDate = (dateFormat(now, "dd-mm-yyyy"));
    
    var baseUrl = global.domain;
    
    var urlSchedules = baseUrl +  'schedulesjson/'+NowDate;
    console.log(NowDate);

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
            // write log if error to file
            console.log("Got an error: ", e.code);
             var logStream = fs.createWriteStream(directoryLog.schedule_log, {flags: 'a'});

                logStream.write(now + ': ' + e+'\n');
                logStream.end(NowDate);
        });
        // Render Index for reload after 1 minute
        res.render('index');

});

module.exports = app;