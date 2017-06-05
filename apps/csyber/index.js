const Async = require('async');
const fse = require('fs-extra'),
	path = require("path");

class csyber{
	static init(appname, res, req, dones){
		let appnamei = appname.match(/(.*?)(\/)/);
		if(appnamei == null)appnamei = appname;
		else appnamei = appnamei[1];

		this.app = appnamei;
		this.res = res;
		this.req = req;
		let csyber = this;
		csyber._result = undefined;
		csyber._results = undefined; 
		csyber.sent = false; 
		Async.auto({
            loadconfig: function (done) {
            	csyber.loadconfig(function(err, _results){
            		done(err);
            	});
            },
            whoami: ['loadconfig', function (_results, done) {
            	csyber.whoami(function(err, _results){
            		done(err);
            	});
            }],
            run:["whoami", function(_results, done){
            	
            	csyber.run(function(err, _results){
            		done(err);
            	});
            }],
            get_results:["run", function(_results, done){
            	csyber.__get_results(function(err, _results){
            		done(err);
            	});
            }]/**/
        }, (err, _results) => {
            if (err);

            dones(err)
        });

	}

	static setapp(app){
		this.app = app
	}

	static setreq(req){
		this.req = req
	}

	static loadconfig(done){
		
		let self = this;

		Async.auto({
            start: function (dones) {
            	let path = "../"+self.app+"/config/config.js";
				try
				{
					self.config = require(path);
					dones();
				}catch(err){
					//self.send(err)
					dones(err)
				}
            },
            csyberconfig: function (dones) {
            	let path = "../"+"csyber"+"/config/config.js";
				try
				{
					self.csyberconfig = require(path);
					dones();
				}catch(err){
					//self.send(err)
					dones(err)
				}
            },
            
        }, (err, _results) => {
            if (err);
            done(err);
        });
	}
	static whoami(done){
		let self = this;
		Async.auto({
            start: function (dones) {
            	try{
		            let path = "../"+self.app+"/config/config.js";
					let user = self.req.user;
					let apps = JSON.parse(JSON.stringify(user.apps));
					var mygroup = {}
					let ind = 0;
					/*sync*/
					/**/
					for(let index in apps)
					    for(let app in apps[index])
					      if(app == self.app)
					      	for(let ca in apps[index][app])mygroup[ind++] = apps[index][app][ca]["name"];
					/*sync*/
					/* async
					Async.eachSeries(Object.keys(apps), function (index, next){ 
						Async.eachSeries(Object.keys(apps[index]), function (app, next){ 
							if(app == self.app)
							{
								Async.eachSeries(Object.keys(apps[index][app]), function (ca, next){ 
								mygroup[ind++] = apps[index][app][ca]["name"];
								next();
								}, function(err) {});
							}else 
								next()

						}, function(err) {});
						next()
					}, function(err) {});     
					/* async*/
				
				
					if(ind == 0)mygroup[0] = {"name":"nobody"};
					self.mygroups = mygroup;
					dones()

				}catch(err){
					self.send(err)
					dones(err)
				}
			}
        }, (err, _results) => {
            if (err) ;
            done(err);
        });
		/**/
	}

	static run(done){
		let self = this;

		Async.auto({
            start: function (dones) {
				try
				{
					self.__exec(function(err){dones(err)});
				}catch(err){
					dones(err)
				}
            }
        }, (err, _results) => {
            if (err)
            	 console.log("run err->"+err)
            done(err);
        });
	}

	static __exec(done)
	{

		let self = this;
		try
		{
			self.exec(function(err, done){
				if(err)throw new Error("...")
					done()
			})
		}catch(error)
		{

		
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
						case "build"://permission
							let groups = self.config.get("/actions/install/groups")
							let allowed = self.userhaspermission(groups)
							if(allowed === false)throw new Error("Permission denied. Please contact admin to install app")
							var src = './apps/'+app+'/public/js/',
								dest = './public/apps/'+app+'/js/';
							fse.copySync(src, dest)
							src = './apps/'+app+'/views/';
							dest = './views/apps/'+app+'/';
							fse.copySync(src, dest)
							self._result = 10; //successful install..._result->code
							dones()
							break;
						case "loadscripts":
							var scripts = []
							i = 0;
							for(let index in self.mygroups)
							{
								let group = self.mygroups[index];
								let tmp = self.config.get("/scripts/"+group)
								for(let tmpindex in tmp)
									scripts.push(tmp[tmpindex]);
								//tmp == undefined?false:scripts.push(tmp);//scripts[i++] = {}:scripts[i++] = tmp;
							}
							//console.log(scripts)
							self._results = scripts;//........._results->data
							self.returntype = "array";
							dones()
							break;/**/
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

										case"applications":
									
											user = JSON.parse(JSON.stringify(self.req.user));
											let appsConfig = require('../installedapps');
											let installedapps = appsConfig.get("/");
											let tmpind = 1;
											for(let appind in user.apps)
											{
												let tmpapp = user.apps[appind]
												
												for(let tmpappname in tmpapp)
												{
													//const appsConfig = require('../installedapps');
													let tmpi = self.appisEnabled(tmpappname)
													//if(installedapps[tmpappname].enabled === true)
													if(tmpi !== false)
														myapps.push({"name":tmpappname,"num":tmpind++})
													break;
												}
											}
											
											for(let appind in installedapps)
											{
												//console.log(appind)
												//if(installedapps[appind].enabled === true)		//enabled app, check if in stack
												let tmpi = self.appisEnabled(appind)
													//if(installedapps[tmpappname].enabled === true)
												if(tmpi !== false)
												{
													let pushcond = true;
													for(let innerind in myapps)
													{
														if(myapps[innerind].name == appind)	//there is only one exception
															pushcond = false;
													}
													if(true === pushcond)
														uninstalledapp.push({"name":appind,"num":tmpind++})
												}
											}
											done()

											break;
										case "users":
										{
											console.log("getting users")
											let User = require('../../models/User');
											User.find({}, {email:true, gender:true, "profile":true,"name":true}, (err, allusers) => {
											    if (err) 
											    	dones("Problem unlinking account")
											    console.log(allusers)
											    console.log(allusers.length)
											    numusers = allusers.length;
											    users = allusers;
											    console.log("all users.....")
											    console.log(users)
											    //count the number of applications
												let appsConfig_users = require('../installedapps');
												let installedapps_users = appsConfig_users.get("/");
												let myapps_users = [];
												let tmpind_users = 1;
												let index_users = 1;
												for(let tmpappname_users in installedapps_users)
												{
													let tmpi = self.appisEnabled(tmpappname_users, false, true)
													if(tmpi !== false)
														myapps_users.push({"name":tmpappname_users,"url":tmpi, "num":index_users++})
												}
												//console.log(installedapps_users)
												console.log(myapps_users)
												numapps = myapps_users.length;
												systemapps = myapps_users;
											   	done()
												 
											 });
										
										}break;
										
										case "addusertoapp":
										{
											let User = require('../../models/User');
											let whichuser;
											if(self.req.query.user == undefined)whichuser = self.req.user.id;
											else whichuser = self.req.query.user;



											let appsConfig = require('../installedapps');
											let installedapps = appsConfig.get("/");
											console.log(installedapps)
											let i;
											let allhisapps = {}
											let allhisinstalledapps = {}
											for(i in installedapps)
											{
												//console.log(installedapps[i].free.groups)
												let j;
												let hisgroups = {}
												for(j in installedapps[i])
												{

													try
													{
														let tmpconfig = require('../'+i+'/config/config.js');
														let enabled = tmpconfig.get("/enabled");
														let k;
														allhisapps[i] = {}
														for(k in enabled)
														{
															if(enabled[k] != undefined && enabled[k] !==false)
																allhisapps[i][k] = k
														}
													}
													catch(error){

													}
													
												}
												
												
												//allhisapps = hisgroups
											}
											console.log("all apps................")
											//console.log(allhisapps)
												for(i in allhisapps)
												{
													if(JSON.stringify(allhisapps[i]).length == 2)
													//if(allhisapps[i].length == 0)
														{
															delete allhisapps[i]
														}
												}
											//console.log(allhisapps)
											User.findById(whichuser, (err, thisuser) => {
												if (err) 
											    {
											    	done("User not found")
											    	
											    }
											    {
												    //let tmpuser = JSON.parse(JSON.stringify(thisuser.apps))
												    user = JSON.parse(JSON.stringify(thisuser))
												    let tmpuser = user.apps
												    console.log(user)
												    for(i in tmpuser)
												    {
												    	//console.log(tmpuser[i])
												    	let court = tmpuser[i];
												    	let j;
												    	for(j in court)
												    	{
												    		let eous = court[j]
												    		//console.log(j)
												    		//console.log(eous)
												    		//allhisinstalledapps[j] = {}
												    		let k;
												    		for(k in eous)
												    		{
												    			let virt = eous[k]
												    			//console.log(virt)
												    			//console.log(j+"------>"+virt.name)
												    			//console.log(allhisapps)
												    			//console.log(allhisapps[j])

												    			if(allhisapps[j] != undefined)
												    			{
												    				//console.log(allhisapps[j][virt.name])
												    				if(allhisinstalledapps[j] == undefined)
												    					allhisinstalledapps[j] = {}
												    				//allhisapps[j][virt.name] = true
												    				delete allhisapps[j][virt.name]
												    				allhisinstalledapps[j][virt.name] = virt.name
												    			}
												    			//allhisapps[j][virt.name] = true
												    			//console.log(allhisapps)
												    		}
												    	}
												    }
												}
												//console.log(allhisapps)
												//console.log(allhisinstalledapps)
											   	done(null, {allhisapps:allhisapps,allhisinstalledapps:allhisinstalledapps})
												 
											 });
										
										}break;
										default:
											done()
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
						case "loadapplications":
							var user = JSON.parse(JSON.stringify(self.req.user));
							var appsConfigla = require('../installedapps');
							var installedappsla = appsConfigla.get("/");
							var myappsla = [];
							var tmpindla = 1;
							for(let appind in user.apps)
							{
								let tmpappla = user.apps[appind]
								
								for(let tmpappname in tmpappla)
								{
									//const appsConfig = require('../installedapps');
									let tmpi = self.appisEnabled(tmpappname, false, true)
									//if(installedapps[tmpappname].enabled === true)
									if(tmpi !== false)
										myappsla.push({"name":tmpappname,"url":tmpi})
									break;
								}
							}
							let tmpapp;
							let myappslaordered = [];
        					while(tmpapp = myappsla.pop())
        					{
        						myappslaordered.push(tmpapp)
        					}
							self._results = myappslaordered;//........._results->data
							self.returntype = "array";
							/**/
							dones()
							break;
						case "loaddashboards":
							var dashboards = {}
							i = 0;
							for(let index in self.mygroups)
							{
								let group = self.mygroups[index];
								let tmp = self.config.get("/dashboards/"+group)
								console.log("are gruops...")
								console.log(group)
								console.log(tmp)
								tmp == undefined?dashboards[i++] = {}:dashboards[i++] = tmp;
							}
							let alldashboards = {dashboards:{dashboards:{}}};
							for(i in dashboards)
							{
								if(dashboards[i].dashboards == undefined)continue;

								if(dashboards[i].dashboards.class != undefined)
									alldashboards.dashboards.class = dashboards[i].dashboards.class
								for(let j in dashboards[i].dashboards.dashboards)
								{
									alldashboards.dashboards.dashboards[j] = dashboards[i].dashboards.dashboards[j]
								}

								//console.log(dashboards[i])
								/**/
							}
							//dashboards[0] != undefined?dashboards = dashboards[0]:false;
							dashboards = alldashboards;
							self._results = dashboards;//........._results->data
							self.returntype = "array";
							dones()
							break;
						case "loadiframe":
							let iframeurl = self.req.query.iframeurl || 'http://localhost'
							var fullUrl = self.req.protocol + '://' + self.req.get('host') //+ self.req.originalUrl;
							//console.log(fullUrl)
							self.res.render("apps/csyber/iframe", {
								iframeurl:"http://www.google.com"//fullUrl+iframeurl
							});
							self.sent = true;
							dones()
							break;
						case "appmanager":
							//check if app is installed or uninstalled
							//then load corresponding appPage
							let appisInstalled = self.appisInstalled(self.app)
							let appisEnabled = self.appisEnabled(self.app, true)
							if(appisInstalled === false && appisEnabled !== false)
							{
								self.res.render("apps/"+self.app+"/installpage", function(err, html) {

							        self.res.render("apps/csyber/installer", {
							            html: html
							        });

							    });
								self.sent = true;
							}
							else
								if(appisInstalled === true && appisEnabled !== false)
								{
									self.res.render("apps/"+self.app+"/uninstallpage", function(err, html) {

								        self.res.render("apps/csyber/uninstaller", {
								            html: html
								        });

							    	});
									self.sent = true;
								}else
								{
									throw new Error("Unknown application.")
								}
							dones()
							break;
						case "unlinkaccounts":
							let account = self.req.query.account;
							if(account == undefined)throw new Error("Please send us the account to unlink in your query")
							else{				//why does this else have to be here after throw(ing). Breaks without it.
								let user = JSON.parse(JSON.stringify(self.req.user))
								//console.log(user)
								if(user[account] == undefined|| user[account] == '')throw new Error("You don't have a linked "+account+" account")
								delete user[account]
								const User = require('../../models/User');
								User.findById(self.req.user.id, (err, inneruser) => {
								    if (err) 
								    	dones("Problem unlinking account")
								    
								    inneruser[account] = "";
								    inneruser.save((err) => {
									if (err)
										dones("Problem unlinking account")


									self._result = 11;
									dones();
								    });
									 
								  });
							}
							break;
						case "uninstall":
							if(self.canbeuninstalled(app) === false)throw new Error(app+" cannot be uninstalled without breaking the system.")
							let apps = JSON.parse(JSON.stringify(self.req.user.apps))
							//let apps = self.req.user.apps
							//console.log(apps)
							let rmindex = -1;
							for(let index in apps)
								for(let indexinner in apps[index])
								{
									if(indexinner == app)
									{
										rmindex = index;
									}
									break;
								}

	                		
		                    if(rmindex == -1)throw new Error("You have not installed "+app)
		                    const User = require('../../models/User');
			                User.findById(self.req.user.id,function(err, docs){
		                		if(err)dones(err)
		                		docs.apps.splice(rmindex, 1)
		                		self._result = 12;
		                		docs.save(dones)
			                });
	                		//dones();
							break;
						case "managegroups":
						{
							let cgroup = self.req.query.cgroup;
							let caction = self.req.query.caction;
							let capp = self.req.query.capp;
							console.log("manage groups")
							
							let whichuser;
								if(self.req.query.user == undefined)whichuser = self.req.user.id;
								else whichuser = self.req.query.user ;
							if(caction == undefined )throw new Error("Please set what you want to do with the group")
							if(cgroup == undefined )throw new Error("Please set the group")
							if(capp == undefined )throw new Error("Please set the application")
							let User = require('../../models/csyberuser');
							switch(caction)
							{
								case "add"://all groups can be added
									User.findById(whichuser, (err, thisuser) => {
										try
									    {
									    	if (err) throw new Error("User not found")
									    	user = JSON.parse(JSON.stringify(thisuser))
										    let tmpuser = user.apps
										    let i;
										    let apps = {}
										    let appi = 0;
										    console.log(tmpuser)

										    let gid = 0;
										    let appexists = false;
										    for(let appname in tmpuser)
									    	{
									    		for(let z in tmpuser[appname])
									    			if(z == capp)appexists = true;
									    	}
									    	if(appexists === false)throw new Error("Application does not exist.")
										    for(i in tmpuser)
										    {
										    	let court = tmpuser[i];
										    	let appname;
										    	

										    	for(appname in court)
										    	{
										    		
										    		
										    		if(appname == capp)
										    		{
										    			if(apps[appname] == undefined)apps[appname] = {};
										    			let k;
										    			for(k in court[appname])
										    			{
										    				
										    				apps[appname][gid++] = court[appname][k]
										    			}
										    			apps[appname][gid] = {name:cgroup}
										    			appi = i;
										    			let Usero = require('../../models/User');
													    Usero.findById(whichuser,function(err, docs){
									                		if(err)
									                			throw new Error(err)
									                		docs.apps.splice(appi, 1)
									                		docs.save(function(err){
									                			if(err)throw new Error(err)
									                			var updateObj = {
											                        $push:{
											                            apps:apps
											                        
											                        }
											                    };   
											                    User.findByIdAndUpdate(whichuser, updateObj,{new:true},function(err, betterresults){
											                    	if(err)throw new Error(err)
												                    	self._result = 14;
												                    	return dones()
											                    });
											                });
										                });
										                
										    		}

										    	}
										    }
						                 
										   
										}
										catch(error){
											dones(error)
										}
										 
									 });
									break;
								case "remove":
								{
									
									User.findById(whichuser, (err, thisuser) => {
										try
									    {
									    	if (err) throw new Error("User not found")
									    	user = JSON.parse(JSON.stringify(thisuser))
										    let tmpuser = user.apps
										    let i;
										    let apps = {}
										    let appi = 0;
										    console.log("these groups")
										    if(self.canIremovegroups(capp, cgroup) === false)throw new Error("You are not permitted to drop that group")
										    //console.log(self.mygroups)
										    //if(self.req.user.id ==req.user.id)throw new Error("You cannot remove your own groups")
										    let gid = 0;
										    let appexists = false;
										    for(let appname in tmpuser)
									    	{
									    		for(let z in tmpuser[appname])
									    			if(z == capp)appexists = true;
									    	}
									    	if(appexists === false)throw new Error("Application does not exist.")
									    	if(self.isroot (self.mygroups) === false)throw new Error("Only root can do that.")

									    	for(i in tmpuser);
									    	{
									    		let court = tmpuser[i];
										    	let appname;
										    	for(appname in court)
										    	{
										    		if(appname == capp)
										    		{
										    			if(apps[appname] == undefined)apps[appname] = {};
										    			let k;
										    			for(k in court[appname])
										    			{
										    				gid++;
										    					if(court[appname][k].name != cgroup)
										    					{
										    						apps[appname][gid++] = court[appname][k]
										    					}
										    			}
										    			//apps[appname][gid] = {name:cgroup}
										    			appi = i;
										    			let Usero = require('../../models/User');
										    			Usero.findById(whichuser,function(err, docs){
									                		if(err)
									                			throw new Error(err)
									                		docs.apps.splice(appi, 1)
									                		docs.save(function(err){
									                			if(err)throw new Error(err)
									                			var updateObj = {
											                        $push:{
											                            apps:apps
											                        
											                        }
											                    };   

											                    User.findByIdAndUpdate(whichuser, updateObj,{new:true},function(err, betterresults){
											                    	if(err)throw new Error(err)
												                    	self._result = 15;
												                    	dones()
											                    });
											                });
										                });
										    		}
										    	}
									    	}
										}
										catch(error){
											dones(error)
										}
										 
									 });
									
								}break;
								default:
									dones("We don't know what you want to do")
							}

							
							//dones("App does not exist")
							}break;
						case "install":
							let apptoadd = self.req.query.add;
							if(apptoadd == undefined)throw new Error("Please select the application you want to install.")
							if(self.appisInstalled(apptoadd) === true)throw new Error("You already "+apptoadd+" installed")
							let enabled = self.appisEnabled(apptoadd, true);
							if(enabled === false)throw new Error("You cannot install "+apptoadd+" now. Please try later.")
						//check if application can be installed
							//return permission in which it can be installed
							let csyberUser = require("../../models/csyberuser")
							csyberUser.installapp(self.req.user.id, apptoadd, enabled, function(err, results){
								if(err)return dones(err);
								self._result = 13;
								dones();
							})
							
							break;
						default:
							if(typeof self.exec !== "function")throw new Error("Internal error with app. Please contact admin.")
							self.exec()
							dones()

					}
					//dones()
				}catch(err){
					self.err = 1;				//failed... suggest possible sources of failure
					dones(err)
				}
            }
        }, (err, _results) => {
            if (err);//console.log("err->"+err);
            done(err);
        });
		}
	}

	static canIremovegroups(app, cgroup){
		let canremove = false;
		let config = require('../'+app+'/config/config.js');
		for(let i in this.mygroups)
		{
			let group = this.mygroups[i]
			let dropperms = config.get("/dropgroups/"+group+"/"+cgroup);
			if(dropperms == true)
			{
				
				console.log(group+"............"+cgroup)
				if(group == cgroup)
				{
					let candropself = config.get("/dropgroups/"+group+"/me");
					if(candropself === true)
					{
						canremove = true
					}
				}else canremove = true;
			}
			console.log(dropperms)
		}
		return canremove;
	}

	static isroot (groups)
	{
		let isroot = false;
		console.log("groups.csyber")
		console.log(groups)
		if(groups == undefined)return false;
		for(let i in groups)
			for(let j in groups[i])
					if(groups[i][j] == 'root')
						return true;
		
	}

	static appisInstalled(app)		//should be enabled and not in user.apps
	{
		var user = JSON.parse(JSON.stringify(this.req.user));
		let myapps = [];
		let tmpi = 1;
		let appinstalled = false;
		for(let appind in user.apps)
		{
			let tmpapp = user.apps[appind]
			
			for(let tmpappname in tmpapp)
			{
				if(tmpappname == app)
					appinstalled = true
				break;
			}
		}
		return appinstalled;
		
	}

	static appisEnabled(app, installing, url)			//in user.apps and is enabled
	{
		/*const appsConfig = require('../installedapps');
		let installedapps = appsConfig.get("/");
		let uninstalledapp = [];
		let appEnabled = false;
		return installedapps[app].enabled || false;
		*/
		let enabled = false;
		//console.log(this.mygroups)
		try
		{
			let config = require('../'+app+'/config/config.js');
			let groups = []
			let test;
			if(installing === true)
			{
				test = config.get("/enabled/"+"nobody");
				if(false !==  test && undefined != test)enabled = test;
			}
			for(let i in this.mygroups)groups.push(this.mygroups[i])
			while(groups.length > 0)
			{
				let tmp = groups.pop();
				test = config.get("/enabled/"+tmp)
				if(false !==  test && undefined != test)enabled = test;
			}
			if(enabled !== false && url === true)enabled = config.get("/url")
			
		}catch(err)
		{
			//console.log(err);
			return false;
		}
		return enabled;
	}

	static canbeuninstalled(app)
	{
		//console.log(this.mygroups)
		let mygroups = []
		for(let index in this.mygroups)mygroups.push(this.mygroups[index])
		let canuninstall = true; //default
		let config = require('../'+app+'/config/config.js');
		while(mygroups.length > 0)
		{
			let tmp = mygroups.pop();
			if(config.get("/uninstall/"+tmp) === false)canuninstall = false;
		}
		//console.log(canuninstall)
		return canuninstall;
	}

	static __get_results(done)
	{
		let self = this;
		if(self.sent === true){
			done();
			return;
		}
		Async.auto({
            start: function (dones) {
				try
				{
					if(self._results != undefined){dones()}
					else
					{
						if(self._result != undefined){
				           let tmp = self.csyberconfig.get("/results/"+self._result)
				            if(tmp == undefined)tmp = self.config.get("/results/"+self._result)
				            	if(tmp == undefined)throw new Error("unknown code..."+self._result)
				            else
							{
								
								if(typeof tmp == "string" || typeof tmp == "String")
								{
									//self.returntype = "string";
									tmp = {"msg": tmp}
								}
								else self.returntype = "array";
							}
							self._results = tmp;
							
			            }
			            else throw new Error("internal error. Please try again later.")
			    	dones()
			    	}
				}catch(err){
					if(self._result != undefined)dones("unknown code..."+self._result)
					else dones(err);
					
				}
            }
        }, (err, _results) => {
            if (err);
            done(err);
        });
        /**/
		
	}

	static userhaspermission(appgroups){
		let usergroups = this.mygroups
		for(let index in appgroups){
			let appgroup = appgroups[index];
			for(let index1 in usergroups){
				let usergroup = usergroups[index1];
				if(usergroup == appgroup)return true;
			}
		}
		return false;
	}
	static send(data){
		let config = this.config,
			app = this.app,
			req = this.req,
			res = this.res;
		try{
			console.log("sfdjlkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
			res.send(data)
		}catch(err){
			console.log("...send")
			console.log(err);
		}
	}

	static __construct(appname, res, req, done)
	{
		
		//this.init(appname, res, req );
		let self = this
		Async.auto({
            start: function (dones) {
            	self.init(appname, res, req, function(err, _results){
            		dones(err);
            	});
            },
        }, (err, _results) => {
            if (err);
            done(err)
        });
	}
}


module.exports = csyber;