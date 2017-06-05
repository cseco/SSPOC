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

	static exec(){

	}
}


module.exports = testapp;