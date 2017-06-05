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
	enabled: true,
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
    		0:"admin script"
    	},
    	"tester":{
    		0:"script1.js"
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
