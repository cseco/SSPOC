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

                            Async.auto({
                                start: function (done) {
                                    switch(page)
                                    {
                                        case "profile":
                                            console.log("is profile")
                                            user = JSON.parse(JSON.stringify(self.req.user));
                                            console.log(user)
                                            done()
                                            break;
                                        case "files":
                                            console.log("loading files")
                                            done("user parent")
                                            break;
                                       
                                        default:
                                            done("user parent")
                                    }
                                },
                            }, (err, _results) => {
                                if (err)
                                {
                                    throw new Error(err)
                                    return;
                                }
                               // console.log(_results)
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
                                    appnames:appnames
                                });
                                self.sent = true;
                                dones()
                            });
                            //dones()
                            break;
                        
                        default:
                            done("try parent")
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