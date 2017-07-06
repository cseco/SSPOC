'use strict';
const Async = require('async');
const Mongodb = require('mongodb');
const Promptly = require('promptly');
var mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const Config = require('./config/config');
var validator = require('validator');
const bluebird = require('bluebird');
const nodemailer = require('nodemailer');
const passport = require('passport');
const csyberUser = require('./models/csyberuser');
const dotenv = require('dotenv');

dotenv.load({ path: '.env.example' });


mongoose.Promise = global.Promise;

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

Async.auto({
    testMongo:  (done) => {
        const db = process.env.MONGODB_URI;//mongodb://localhost:27017/'+Config.get("/database/name");
        Mongodb.MongoClient.connect(db, {}, (err, db) => {

            if (err) {
                console.error('Failed to connect to Mongodb.');
                return done(err);
            }

            db.close();
            done(null, true);
        });
    },
    rootEmail: ['testMongo', (results, done) => {
        Promptly.prompt('Root user email:', function(err,docs)
            {
                if (validator.isEmail(docs) === false) {
                    done("Invalid email address entered");
                  }else
                done(null, docs);
                ;
            });
    }],
    rootPassword: ['rootEmail', (results, done) => {
        Promptly.password('Root user password(atleast 5 characters):', function(err,docs){
            if(err)done(err);
            else if(docs.length < 5){done("Password must be atleast 5 characters")}
                else done(null, docs);
        });
    
    }],
    confirmrootPassword: ['rootPassword', (results, done) => {
        Promptly.password('confirm password:', function(err,docs){
            if(err)done(err);
            else if(results.rootPassword != docs){done("Passwords don't match")}
                else done(null, docs);
        });
    
    }],
    setupRootUser: ['confirmrootPassword', (results, done) => {

        Async.auto({
              connect: function (done) {
                const db = 'mongodb://localhost:27017/'+Config.get("/database/name");
                mongoose.connect(db, {}, done);
            },
             clean: ['connect', (dbResults, done) => {
                Async.auto({
                    clean1:(dones) => { csyberUser.clear(function(err, result){dones(err, result) })},                                                        
                   //clean1:(dones) => { UserModel.remove().exec().then(function(docs, err){dones(err, docs)});},
                   //clean2:(dones) => { AppModel.remove().exec().then(function(docs, err){dones(err, docs)});},
                   //clean3:(dones) => { GroupModel.remove().exec().then(function(docs, err){dones(err, docs)});}
                }, done);

            }],/*
            Groups: ['clean', function (dbResults, done) { 
                Group.save((err, docs, docs1) => {
                if(err)done(err);
                if(docs[0] == undefined)
                {
                    var tmp = [];
                    tmp.push(docs)
                    docs = tmp;
                }
                done(err, docs && docs[0]);
                });     
            }],*/
            User: ['clean', function (dbResults, done) {
                        const username = results.rootEmail.toLowerCase();
                        const password = results.rootPassword;
                        const email = results.rootEmail.toLowerCase();
                        csyberUser.create(username, password, email,  function(err, result){done(err, result) });
                        //surgbc@gmail.com
            }],/*
            App: ['clean', function (dbResults, done) { 
                App.save((err, docs, docs1) => {
                if(err)done(err);
                if(docs[0] == undefined)
                {
                    var tmp = [];
                    tmp.push(docs)
                    docs = tmp;
                }
                done(err, docs && docs[0]);
                });     
            }],*/
            AddUsertoRootUsers: ['User', function (dbResults, done) { //surgbcx@gmail.com
                let app = "csyber";
                const id = dbResults.User._id;
                Async.auto({                                                    
                    installcsyber:(dones) => { csyberUser.installallapps(id, "restricted",dones)},
                   //clean1:(dones) => { UserModel.remove().exec().then(function(docs, err){dones(err, docs)});},
                   //clean2:(dones) => { AppModel.remove().exec().then(function(docs, err){dones(err, docs)});},
                   //clean3:(dones) => { GroupModel.remove().exec().then(function(docs, err){dones(err, docs)});}
                }, done);
                
            }],
            
            
        }, (err, dbResults) => {

            if (err) {
                console.error('Failed to setup root user.');
                return done(err);
            }

            done(null, true);
        });
    }]
}, (err, results) => {

    if (err) {
        console.error('Setup failed.');
        console.error(err);
        return process.exit(1);
    }

    console.log('Setup complete.');
    process.exit(0);
});