const csyber = require('../csyber/index');
const Async = require('async');

class testapp extends csyber{
	
	static __construct(appname, res, req, done)
	{

		let self = this
		Async.auto({
            start: function (dones) {
            	self.init(appname, res, req, function(err, _results){
            		dones(err);
            	});
            },
        }, (err, _results) => {
            if (err) ;
            done(err)
        });

	}

	static exec(done){
        let self = this;
        Async.auto({
            start: function (dones) {
                try
                {
                    let query = self.req.query;
                    let app = self.app;
                    let action = query.action;
                    if(action == undefined)throw new Error('action not set... rq-> proper error handling');
                    
                    let i = 0;
                    switch(action){
                        case "managegroups":
                        case "build":
                        case "loadscripts":
                            console.log("manage groups")
                            done("user parent")
                            break;

                        case "loadpage":
                            console.log("in loadpage-------------")
                            var page;
                            self.req.query.page == undefined?page="index":page=self.req.query.page;
                            page = page.toLowerCase();
                            let uninstalledapp = [];
                            let myapps = [];
                            var user;   
                            var users
                            var numusers = 0;   
                            var numapps = 0;
                            var systemapps;  
                            let numfiles = 0;  
                            let myfiles = {};
                            let uri


                            Async.auto({
                                start: function (doness) {
                                    switch(page)
                                    {
                                        case "profile":
                                            console.log("is profile")
                                            user = JSON.parse(JSON.stringify(self.req.user));
                                            console.log(user)
                                            doness("use parent")
                                            break;
                                        case "files":{
                                            let mysql      = require('mysql');
                                            let db = 'sspoc'
                                            let pwd = 'ca!@kaql'
                                            console.log("loading files")
                                           // done("user parent")
                                            var connection = mysql.createConnection({
                                              host     : 'localhost',
                                              user     : 'root',
                                              password : pwd,
                                              database : db
                                            });
                                            console.log("Page is........."+page) 
                                            connection.connect();
                                            let func = doness
                                            let query = connection.query('SELECT * FROM survey WHERE userid=?', [self.req.user.id, null], function (error, results, fields, doness) {
                                                console.log("typeof")
                                                console.log(typeof func)
                                               //doness("user parent")
                                               console.log("uploadcsv")
                                                if (error) {
                                                  console.log("error"+error)
                                                  throw new Error(""+error)
                                                }
                                               let numfilescsv = 0;
                                               let numfilesdwg = 0;
                                                for(let i in results)
                                                {
                                                  let ind = results[i].Ind
                                                  let filedwg = results[i].file
                                                  let filedcsv = results[i].filecsv
                                                  if(filedwg !== null)
                                                    numfilesdwg++;
                                              
                                                  if(filedcsv !== null)
                                                    numfilesdwg++
                                                }

                                                if(numfilesdwg>numfilescsv)numfiles=numfilesdwg;
                                                else numfiles = numfilescsv;

                                                for(let i in results)
                                                {
                                                    if(myfiles[i] == undefined)
                                                        myfiles[i] = {}

                                                    myfiles[i]["planname"] = results[i].Plan_name

                                                    if(results[i].file !== null && results[i].filecsv !== null)
                                                        myfiles[i]["status"] = "Complete";
                                                    else
                                                        myfiles[i]["status"] = "incomplete";
                                                    myfiles[i]["registry"] = results[i].registry;
                                                    myfiles[i]["dos"] = results[i].dos;
                                                    myfiles[i]["checker"]= results[i].checker;
                                                    /**/

                                                }
                                               // myfiles

                                                console.log("NUMFILED............"+numfiles)
                                                
                                                func()
                                                  connection.destroy();
                                                
                                            })
                                          //  connection.destroy();
                                          //  console.log("NUMFILEDtttttttt............"+numfiles)
                                            //console.log()
                                            
                                              
                                                  
                                                // Neat!
                                            }break;
                                        case "registry":{
                                            var mysql      = require('mysql');
                                            let db = 'sspoc'
                                            let pwd = 'ca!@kaql'
                                            console.log("loading files")
                                           // done("user parent")
                                            let connection = mysql.createConnection({
                                              host     : 'localhost',
                                              user     : 'root',
                                              password : pwd,
                                              database : db
                                            });
                                            console.log("Page is........."+page) 
                                            connection.connect();
                                            let func = doness
                                            let query = connection.query('SELECT * FROM survey WHERE 1', [self.req.user.id, null], function (error, results, fields, doness) {
                                                console.log("typeof")
                                                console.log(typeof func)
                                               //doness("user parent")
                                               console.log("uploadcsv")
                                                if (error) {
                                                  console.log("error"+error)
                                                  throw new Error(""+error)
                                                }
                                               let numfilescsv = 0;
                                               let numfilesdwg = 0;
                                                for(let i in results)
                                                {
                                                  let ind = results[i].Ind
                                                  let filedwg = results[i].file
                                                  let filedcsv = results[i].filecsv
                                                  if(filedwg !== null)
                                                    numfilesdwg++;
                                              
                                                  if(filedcsv !== null)
                                                    numfilesdwg++
                                                }

                                                if(numfilesdwg>numfilescsv)numfiles=numfilesdwg;
                                                else numfiles = numfilescsv;

                                                for(let i in results)
                                                {
                                                    if(myfiles[i] == undefined)
                                                        myfiles[i] = {}

                                                    myfiles[i]["planname"] = results[i].Plan_name
                                                    myfiles[i]["plantype"] = results[i].Survey_plan_type
                                                    myfiles[i]["Scale"] = results[i].Scale
                                                    myfiles[i]["coordinatesys"] = results[i].coordinate_system
                                                    myfiles[i]["location"] = results[i].Location
                                                    myfiles[i]["surveyor"] = results[i].surveyor
                                                    myfiles[i]["registry"] = results[i].registry
                                                    myfiles[i]["ind"] = results[i].Ind
                                                    
                                                    /**/

                                                }
                                               // myfiles

                                                console.log("NUMFILED............"+numfiles)
                                                
                                                func()
                                                  connection.destroy();
                                                
                                            })
                                          //  connection.destroy();
                                          //  console.log("NUMFILEDtttttttt............"+numfiles)
                                            //console.log()
                                            
                                              
                                                  
                                                // Neat!
                                            }break;
                                            case "dos":{
                                            var mysql      = require('mysql');
                                            let db = 'sspoc'
                                            let pwd = 'ca!@kaql'
                                            console.log("loading files")
                                           // done("user parent")
                                            let connection = mysql.createConnection({
                                              host     : 'localhost',
                                              user     : 'root',
                                              password : pwd,
                                              database : db
                                            });
                                            console.log("Page is........dos......."+page) 
                                            connection.connect();
                                            let func = doness
                                            let query = connection.query('SELECT * FROM survey WHERE 1', [self.req.user.id, null], function (error, results, fields, doness) {
                                                console.log("typeof")
                                                console.log(typeof func)
                                               //doness("user parent")
                                               console.log("uploadcsv")
                                                if (error) {
                                                  console.log("error"+error)
                                                  throw new Error(""+error)
                                                }
                                               let numfilescsv = 0;
                                               let numfilesdwg = 0;
                                               let results1 = results;
                                                for(let i in results)
                                                {
                                                    console.log(results[i].Plan_name)
                                                  let ind = results[i].Ind
                                                  let filedwg = results[i].file
                                                  let filedcsv = results[i].filecsv
                                                  if(filedwg !== null)
                                                    numfilesdwg++;
                                              
                                                  if(filedcsv !== null)
                                                    numfilescsv++
                                             //   }

                                               

                                              //  for(let i in results)
                                               // {
                                                    console.log(results[i].registry)
                                                    if(results[i].registry == 1)
                                                    {
                                                        //console.log(results[i].Plan_name)
                                                       // break;
                                                   // }
                                                    if(myfiles[i] == undefined)
                                                        myfiles[i] = {}

                                                    myfiles[i]["planname"] = results[i].Plan_name
                                                    myfiles[i]["plantype"] = results[i].Survey_plan_type
                                                    myfiles[i]["Scale"] = results[i].Scale
                                                    myfiles[i]["coordinatesys"] = results[i].coordinate_system
                                                    myfiles[i]["location"] = results[i].Location
                                                    myfiles[i]["surveyor"] = results[i].surveyor
                                                    myfiles[i]["registry"] = results[i].registry
                                                    myfiles[i]["dos"] = results[i].dos
                                                    myfiles[i]["ind"] = results[i].Ind
                                                    if(results[i].file !== null)
                                                        myfiles[i]["file"] = results[i].file.substring(results[i].file.length-8,results[i].file.length)
                                                    else
                                                        myfiles[i]["file"] = ''
                                                    if(results[i].filecsv !== null)
                                                        myfiles[i]["filecsv"] = results[i].filecsv.substring(results[i].filecsv.length-8,results[i].filecsv.length)
                                                    else
                                                        myfiles[i]["filecsv"] = '';
                                                    /**/
                                                    }

                                                }

                                                 if(numfilesdwg>numfilescsv)numfiles=numfilesdwg;
                                                else numfiles = numfilescsv;
                                               // myfiles

                                                console.log("NUMFILED............"+numfiles)
                                                
                                                func()
                                                  connection.destroy();
                                                
                                            })
                                            
                                              
                                                  
                                                // Neat!
                                            }break;
                                        case "checker":{
                                            var mysql      = require('mysql');
                                            let db = 'sspoc'
                                            let pwd = 'ca!@kaql'
                                            console.log("loading files")
                                           // done("user parent")
                                            let connection = mysql.createConnection({
                                              host     : 'localhost',
                                              user     : 'root',
                                              password : pwd,
                                              database : db
                                            });
                                            var fs = require('fs-extra')
                                            connection.connect();
                                            let func = doness
                                            let query = connection.query('SELECT * FROM survey WHERE 1', [self.req.user.id, null], function (error, results, fields, doness) {
                                                console.log("typeof")
                                                console.log(typeof func)
                                               //doness("user parent")
                                               console.log("uploadcsv")
                                                if (error) {
                                                  console.log("error"+error)
                                                  throw new Error(""+error)
                                                }
                                               let numfilescsv = 0;
                                               let numfilesdwg = 0;
                                               let results1 = results;
                                                for(let i in results)
                                                {
                                                    console.log(results[i].Plan_name)
                                                  let ind = results[i].Ind
                                                  let filedwg = results[i].file
                                                  let filedcsv = results[i].filecsv
                                                  if(filedwg !== null)
                                                    numfilesdwg++;
                                              
                                                  if(filedcsv !== null)
                                                    numfilescsv++
                                                    console.log(results[i].registry)
                                                    if(results[i].dos == 1)
                                                    {
                                                        if(myfiles[i] == undefined)
                                                            myfiles[i] = {}

                                                        myfiles[i]["planname"] = results[i].Plan_name
                                                        myfiles[i]["plantype"] = results[i].Survey_plan_type
                                                        myfiles[i]["Scale"] = results[i].Scale
                                                        myfiles[i]["coordinatesys"] = results[i].coordinate_system
                                                        myfiles[i]["location"] = results[i].Location
                                                        myfiles[i]["surveyor"] = results[i].surveyor
                                                        myfiles[i]["registry"] = results[i].registry
                                                        myfiles[i]["dos"] = results[i].dos
                                                        myfiles[i]["ind"] = results[i].Ind

                                                        if(results[i].file !== null)
                                                        {
                                                            let tmp = results[i].file;
                                                            myfiles[i]["file"] = results[i].file.substring(results[i].file.length-8,results[i].file.length)

                                                            myfiles[i]["filereal"] = results[i].file
                                                            console.log('../../uploads/'+results[i].file)
                                                            try{
                                                            fs.copySync('uploads/'+results[i].file, 'public/'+results[i].file)
                                                            }catch(error){}
                                                        }
                                                        else
                                                        {
                                                            myfiles[i]["file"] = ''
                                                            myfiles[i]["filereal"] = ''
                                                        }
                                                        if(results[i].filecsv !== null)
                                                        {
                                                            let tmp = results[i].file;
                                                            myfiles[i]["filecsv"] = results[i].filecsv.substring(results[i].filecsv.length-8,results[i].filecsv.length)
                                                            myfiles[i]["filecsvreal"] = results[i].filecsv
                                                            try{
                                                            fs.copySync('uploads/'+results[i].filecsv, 'public/'+results[i].filecsv)
                                                            }catch(error){}
                                                        
                                                        }
                                                            else
                                                           {
                                                                myfiles[i]["filecsv"] = '';
                                                                myfiles[i]["filecsvreal"] = '';
                                                           }
                                                        /**/
                                                    }

                                                }
                                                console.log(myfiles)
                                                 if(numfilesdwg>numfilescsv)numfiles=numfilesdwg;
                                                else numfiles = numfilescsv;
                                               // myfiles

                                                console.log("NUMFILED............"+numfiles)
                                                
                                                func()
                                                  connection.destroy();
                                                
                                            })
                                            }break;
                                        case "checkeriframe":
                                        {
                                            if(self.req.query.uri == "undefined")
                                                throw new Error("URI missing")
                                            uri = "http://localhost:3000/"+self.req.query.uri;
                                            console.log(self.req.query)
                                            console.log("checkingiframe..")
                                            console.log(uri)
                                            doness()
                                        }break;
                                        default:
                                            doness("user parent")
                                    }
                                },
                            }, (err, _results) => {
                                if (err)
                                {

                                    throw new Error(err)
                                    //return;
                                }
                               // console.log(_results)
                               console.log("..................in files................")
                               let allhisinstalledapps,
                                    allhisapps,
                                    appnames = {"installed":{},"notinstalled":{}};
                                if(_results.start != undefined)
                                {
                                    console.log(_results.start)
                                    allhisinstalledapps = _results.start.allhisinstalledapps;
                                    allhisapps = _results.start.allhisapps;
                                    console.log(allhisinstalledapps)
                                    for(let element in allhisinstalledapps)
                                        appnames["installed"][element] = element
                                        //console.log(element)
                                    for(let element in allhisapps)
                                        appnames["notinstalled"][element] = element
                                }

                                self.res.render("apps/"+app+"/"+page, {
                                    user:user,
                                    installedapps:myapps,
                                    uninstalledapp:uninstalledapp,
                                    numusers:numusers,
                                    users:users,
                                    numapps:numapps,
                                    systemapps:systemapps,
                                    allhisinstalledapps:allhisinstalledapps,
                                    allhisapps:allhisapps,
                                    appnames:appnames,
                                    numfiles:numfiles,
                                    myfiles:myfiles,
                                    uri:uri
                                });
                                self.sent = true;
                                

                                dones()
                            });
                            //dones()
                            break;
                        case "registrysubmit":{
                            let ind = self.req.query.ind;
                            if(ind == undefined)throw new Error("An error occured while trying to submit to registry")

                            var mysql      = require('mysql');
                                            let db = 'sspoc'
                                            let pwd = 'ca!@kaql'
                                            console.log("loading files")
                                           // done("user parent")
                                            let connection = mysql.createConnection({
                                              host     : 'localhost',
                                              user     : 'root',
                                              password : pwd,
                                              database : db
                                            });
                                            console.log("Page is........."+page) 
                                            connection.connect();
                                           // let func = doness
                                            let query = connection.query('UPDATE survey SET registry=1 WHERE Ind=?', [ind, null], function (error, results, fields, doness) {
                                                console.log("typeof")
                                                console.log(typeof func)
                                               //doness("user parent")
                                               console.log("uploadcsv")
                                                if (error) {
                                                  console.log("error"+error)
                                                  throw new Error(""+error)
                                                }
                                                self._result = 1000;
                                               dones();
                                                  connection.destroy();
                                                
                                            })
                            //dones()
                            }break;
                            case "dosjerect":{
                            let ind = self.req.query.ind;
                            if(ind == undefined)throw new Error("An error occured while trying to submit to registry")

                            var mysql      = require('mysql');
                                            let db = 'sspoc'
                                            let pwd = 'ca!@kaql'
                                            console.log("loading files")
                                           // done("user parent")
                                            let connection = mysql.createConnection({
                                              host     : 'localhost',
                                              user     : 'root',
                                              password : pwd,
                                              database : db
                                            });
                                            console.log("Page is........."+page) 
                                            connection.connect();
                                           // let func = doness
                                            let query = connection.query('UPDATE survey SET dos=2 WHERE Ind=?', [ind, null], function (error, results, fields, doness) {
                                                console.log("typeof")
                                                console.log(typeof func)
                                               //doness("user parent")
                                               console.log("uploadcsv")
                                                if (error) {
                                                  console.log("error"+error)
                                                  throw new Error(""+error)
                                                }
                                                self._result = 1001;
                                               dones();
                                                  connection.destroy();
                                                
                                            })
                            //dones()
                            }break;
                            case "dossubmit":{
                            let ind = self.req.query.ind;
                            if(ind == undefined)throw new Error("An error occured while trying to submit to registry")

                            var mysql      = require('mysql');
                                            let db = 'sspoc'
                                            let pwd = 'ca!@kaql'
                                            console.log("loading files")
                                           // done("user parent")
                                            let connection = mysql.createConnection({
                                              host     : 'localhost',
                                              user     : 'root',
                                              password : pwd,
                                              database : db
                                            });
                                            console.log("Page is........."+page) 
                                            connection.connect();
                                           // let func = doness
                                            let query = connection.query('UPDATE survey SET dos=1 WHERE Ind=?', [ind, null], function (error, results, fields, doness) {
                                                console.log("typeof")
                                                console.log(typeof func)
                                               //doness("user parent")
                                               console.log("uploadcsv")
                                                if (error) {
                                                  console.log("error"+error)
                                                  throw new Error(""+error)
                                                }
                                                self._result = 1002;
                                               dones();
                                                  connection.destroy();
                                                
                                            })
                            //dones()
                            }break;
                        default:
                            dones("try parent")
                           // if(typeof self.exec !== "function")throw new Error("Internal error with app. Please contact admin.")
                          //  self.exec()
                           // dones(err)

                    }
                    //dones()
                }catch(err){
                    self.err = 1;               //failed... suggest possible sources of failure
                    console.log("new err")
                    console.log(err)
                    dones(err)
                }
            }
        }, (err, _results) => {
            if (err);//console.log("err->"+err);

            done(err);
        });
	}



}


module.exports = testapp;