const Config = require('../config/config');
const userController = require('./user');
const Async = require('async');

getEndpoints=(req, res)=>{
      userController.getOtherEndpoints(req, res, "/apps");
}


class app{  

  static index(req, res){
    if (!req.isAuthenticated()) {
    return res.redirect('/auth/login');
    }
    let reqapp = req.query.app;


    if(reqapp == undefined)return getEndpoints(req, res);
    else
    {
        let reqappi = reqapp.match(/(.*?)(\/)/);
        if(reqappi == null);
        else reqapp = reqappi[1];
        try{
          const loadedapp = require('../apps/'+reqapp+"/index");
          loadedapp.__construct(reqapp, res, req, function(err){
            if(err)
            {
              console.log(" "+err)    //leave this line as it is. Next line breaks without it. Why?
              res.send(JSON.stringify({"err":" "+err}));
            }
            else
              console.log("..")//leave this line as it is. Next line breaks without it. Why?
            console.log(loadedapp._results)
              if(loadedapp.returntype == "array")loadedapp.send(JSON.stringify(loadedapp._results))
              else loadedapp.send(loadedapp._results)
          });
          

        }catch(err)
        {
          res.send(JSON.stringify(err));
        } 
    }
  }


}

module.exports = app;