'use strict';
const Confidence = require('confidence');
const Dotenv = require('dotenv');


Dotenv.config({ silent: false });

const criteria = {
    env: process.env.NODE_ENV
};


const config = {
	"home":{
		name:"home",
		url:"#home",
		enabled: false,
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
		}
	},
	"settings":{
		name:"setting",
		url:"#settings",
		enabled: false,
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
		}
	},
	"help":{
		name:"help",
		url:"#help",
		enabled: false,
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
		}
	},
	"applications":{
		name:"applications",
		url:"#applications",
		enabled: false,
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
		}
	},
	"csyber":{
		name:"csyber",
		url:"#csyber",
		enabled: true,
		"free":  {
			groups:{
				nobody:"user"
			}
		},
		"restricted":  {
			groups:{
				admin:"root",
				nobody:"user"
			}
		},
	},
	"testapp":{
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
		}
	},
	"spoc":{
		name:"spoc",
		url:"#spoc",
		enabled: true,
		"free":  {
			groups:{
				nobody:"user"
			}
		},
		"restricted":  {
			groups:{
				surveyor:"surveyor",
				finance:"finance",
				dos:"dos",
			}
		},
		"surveyor":{
			groups:{
				surveyor:"surveyor"
			}
		},
	},
	"flowerwatch":{
		name:"flowerwatch",
		url:"#flowerwatch",
		enabled: false,
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
		}
	},
	"ssb":{
		name:"ssb",
		url:"#ssb",
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
		}
	},
	"projector":{
		name:"projector",
		url:"#projector",
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
		}
	},
	"csweeper":{
		name:"csweeper",
		url:"#csweeper",
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
		}
	},
	"hymnal":{
		name:"hymnal",
		url:"#hymnal",
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
		}
	},
	"cskul":{
		name:"cskul",
		url:"#cskul",
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
		}
	},
	"kamoo":{
		name:"kamoo",
		url:"#kamoo",
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
		}
	},
	"farmbot":{
		name:"farmbot",
		url:"#farmbot",
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
		}
	},
	"csenergy":{
		name:"csenergy",
		url:"#csenergy",
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
		}
	}
};


const store = new Confidence.Store(config);


exports.get = function (key) {

    return store.get(key, criteria);
};


exports.meta = function (key) {

    return store.meta(key, criteria);
};
