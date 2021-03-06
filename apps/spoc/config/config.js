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
    results:{
        1000:"Plan has been submitted",
        1001:"Plan has been sent back for review",
        1002:"Plan has been forwarded",
    },
	name:"spoc",
	url:"#spoc",
	enabled: {
        root:"restricted",
        user:"free",
        finance:"free",
        dos:"dos",
        checker:"checker",
        surveyor:"surveyor",
        registry:"registry"
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
    "dropgroups":
    {
        checker:
            {
                me:false,
                root:true,
                user:false,
                nobody:true,
            },
        root:{
                me:false,
                surveyor:true,
                dos:false,
                nobody:true,
                finance:true,
                checker:true,
                registry:true,
            },
        dos:{
                me:false,
                root:true,
                user:false,
                nobody:true,
            },
        finance:{
                me:false,
                root:true,
                user:false,
                nobody:true,
            },
        nobody:{
                me:false,
                root:false,
                user:false,
                nobody:true,
            }
    },
    scripts:{
    	"root":{
            0:"shared"
    	},
    	"user":{
            1:"shared"
    	},
        "user":{
            1:"shared"
        },
        "finance":{
            1:"shared"
        },
        "dashboards":{
            1:"shared"
        },
        "checker":{
            1:"shared"
        },
        "surveyor":{
            1:"shared"
        },
        "registry":{
            1:"shared"
        }
    },
    dashboards:{
    	"root":{
    		dashboards: {
            class: "fa fa-dashboard",
            dashboards: {
                home:{
                    name: "Home",
                    url: "#spoc/dashboards/home",
                    application:"home"
                },
                registry:{
                    name: "Registry",
                    url: "#spoc",
                    application:"Registry"
                }
            },
        }
    	},
        "surveyor":{
            dashboards: {
            class: "fa fa-dashboard",
            dashboards: {
                Files:{
                    name: "Files",
                    url: "#spoc",
                    application:"Files"
                }
            },
        }
        },
        "registry":{
            dashboards: {
            class: "fa fa-dashboard",
            dashboards: {
                registry:{
                    name: "Registry",
                    url: "#spoc",
                    application:"Registry"
                }
            },
        }
        },
        "dos":{
            dashboards: {
            class: "fa fa-dashboard",
            dashboards: {
                dos:{
                    name: "DOS",
                    url: "#spoc",
                    application:"DOS"
                }
            },
        }
        },
        "checker":{
            dashboards: {
            class: "fa fa-dashboard",
            dashboards: {
                checker:{
                    name: "Checker",
                    url: "#spoc",
                    application:"Checker"
                }
            },
        }
        }
    },

};


const store = new Confidence.Store(config);


exports.get = function (key) {

    return store.get(key, criteria);
};


exports.meta = function (key) {

    return store.meta(key, criteria);
};
