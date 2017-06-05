const Config = require('../config/config');
const appsConfig = require('../apps/installedapps');
const Async = require('async');
/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  console.log(req.user);
if (!req.isAuthenticated()) {
    return res.redirect('/auth/login');
  }
  var user = JSON.stringify(req.user);
  user = JSON.parse(user)
  var name = user.name.first + ' ' + user.name.middle + ' ' + user.name.last;
  user.name = name;
  let appstoload = {}
  let apptoloadtest = []
  const csyber = require('../apps/'+"csyber"+"/index");
  csyber.setapp("csyber")
  csyber.setreq(req)
  
  
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
      checkenabled:["whoami", function(_results, done){
        console.log("these are the reuslts")
        let tmpstack = []
        for(let index in user.apps)
           for(let app in user.apps[index])
            {
              tmpstack.push(app)
              break;
            }

        
        //order...
        let tmpapp;
        while(tmpapp = tmpstack.pop())apptoloadtest.push(tmpapp)

        while(tmpapp = apptoloadtest.pop()){

          let tmpi = csyber.appisEnabled(tmpapp)
          if(tmpi !== false && tmpi != undefined)
          {
            let myconfig = require('../apps/'+tmpapp+'/config/config.js'); 
            let appdata = myconfig.get("/"); 
              appstoload[tmpapp] = {};
              appstoload[tmpapp]["name"] = appdata["name"];
              appstoload[tmpapp]["url"] = appdata["url"];
          }

        }
        console.log()
        done();

      }]
  }, (err, _results) => {
      if (err);
     // dones(err)
  });
  
  /**
  console.log(user.apps)
  for(let index in user.apps){
    for(let app in user.apps[index])
    {
      let appdata = appsConfig.get("/"+app);  
      console.log("/"+app)
      if(appdata == undefined)break;
      if(appdata.enabled !== true){
        appstoload[app] = {};
        appstoload[app]["name"] = appdata["name"];
        appstoload[app]["url"] = appdata["url"];
      }
    }
  }
 /* */

  console.log(appstoload)

  /*let tapps = req.user.toObject().apps;
  console.log(tapps);
  let apps = {}
  let i = 0;
  tapps.forEach(function(val, key){
   // console.log(val._id)
    apps[val._id] = val._id

  })
  let allapps = Config.get('/sidemenuitems').apps.apps;
  let sidemenuitems = Config.get('/sidemenuitems');
  for( tmp in allapps)
  {
    if(apps[tmp] == undefined)delete sidemenuitems.apps.apps[tmp]
    //console.log(tmp)
  }
 */
  let sidemenuitems = Config.get('/sidemenuitems');
  sidemenuitems.apps.apps = appstoload;
 // let sidemenuitems = Config.get('/sidemenuitems');
  for( tmp in sidemenuitems.apps.apps)if(sidemenuitems.apps.apps[tmp]['default'] === false)delete sidemenuitems.apps.apps[tmp]
  for( tmp in sidemenuitems.others)if(sidemenuitems.others[tmp]['default'] === false)delete sidemenuitems.others[tmp]
    for( tmp in sidemenuitems.dashboards.dashboards)if(sidemenuitems.dashboards.dashboards[tmp]['application'] != "home")delete sidemenuitems.dashboards.dashboards[tmp]
  let apps = {}
  console.log(sidemenuitems.apps.apps)
  //console.log(apps)
  
  res.render('home/home', {
    title: 'Home',
    application: 'Application',
    company: Config.get('/company'),
    companyurl: Config.get('/companyurl'),
    appname:Config.get('/appname'),
    displayappname:Config.get('/displayappname'),
    year:Config.get('/year'),
    applogoname:Config.get('/applogoname'),
    applogoref:Config.get('/applogoref'),
    version:Config.get('/version'),
    rooturl:Config.get('/rooturl'),
    skin:Config.get('/skin/siteuser'),
    section:"Home",
    teamname:Config.get('/teamname'),
    sidemenuitems:sidemenuitems,
    apps:apps,
    user:user
  });
};