'use strict';
const Confidence = require('confidence');
const Dotenv = require('dotenv');


Dotenv.config({ silent: false });

const criteria = {
    env: process.env.NODE_ENV
};

var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

const config = {
	name:"testapp",
	url:"#testapp",
	enabled: {
        root:false,
        tester:false,
        nobody:false,
    },
    "uninstall":
    {
        tester:true,
        root:true,
        nobody:true
    },
	"free":  {
		groups:{
			nobody:"tester"
		}
	},
	"restricted":  {
		groups:{
			admin:"root",
			nobody:"testeruser"
		}
	},
    actions:
    {
    	"install":{
    		groups:{
    			root:"root"
    		}
    	}
    },
    scripts:{
    	"root":{
    		0:"admin script"
    	},
    	"tester":{
    		0:"script1.js"
    	}
    },
    dashboards:{
    	"root":{
    		dashboards: {
            class: "fa fa-dashboard",
            dashboards: {
                home:{
                    name: "Home",
                    url: "#home/dashboards/home",
                    application:"home"
                },
                siteadmindashboard:{
                    name: "Site-Admin Dashboard",
                    url: "siteadmin/dashboard",
                    application:"nothome"
                },
                devicesdashboard1:{                 //add more dashboards here
                    name: "Flowerwatch",
                    url: "dashboards/flowerwatch",
                    application:"nothome"
                },
                farmbot:{                 //add more dashboards here
                    name: "Farmbot",
                    url: "dashboards/flowerwatch",
                    application:"nothome"
                },
                tracker:{                 //add more dashboards here
                    name: "Tracker",
                    url: "dashboards/flowerwatch",
                    application:"nothome"
                },
                treasury:{                 //add more dashboards here
                    name: "Tracker",
                    url: "dashboards/flowerwatch",
                    application:"nothome"
                }
            },
        },
    	},
    	"tester":{
    		dashboards: {
            class: "fa fa-dashboard",
            dashboards: {
                home:{
                    name: "Home",
                    url: "#home/dashboards/home",
                    application:"home"
                },
                siteadmindashboard:{
                    name: "Site-Admin Dashboard",
                    url: "siteadmin/dashboard",
                    application:"nothome"
                },
                devicesdashboard1:{                 //add more dashboards here
                    name: "Flowerwatch",
                    url: "dashboards/flowerwatch",
                    application:"nothome"
                }
            },
        },
    	}
    },
    results:{
        10:"App built successfully. You can now test it"
    }

};


const store = new Confidence.Store(config);


exports.get = function (key) {

    return store.get(key, criteria);
};


exports.meta = function (key) {

    return store.meta(key, criteria);
};
