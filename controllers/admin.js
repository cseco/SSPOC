const Config = require('../config/config');


exports.getAdmin = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(
      JSON.stringify(Config.get('/endpoints/admin'))
    );
}

exports.getDashboard = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/login');
  }
  //check also if he's not admin. But how will we know this?
  user = req.user.toObject();
  console.log(user);
  if(!user.roles)
    return res.redirect('/');
  if(!user.roles.admin)
    return res.redirect('/');

  isroot = user.roles.admin != undefined?true:false;
  
  res.render('admin', {
    title: 'Admin',
    company: Config.get('/company'),
    companyurl: Config.get('/companyurl'),
    appname:Config.get('/appname'),
    displayappname:Config.get('/displayappname'),
    year:Config.get('/year'),
    applogoname:Config.get('/applogoname'),
    applogoref:Config.get('/applogoref'),
    version:Config.get('/version'),
    rooturl:Config.get('/rooturl'),
    skin:Config.get('/skin'),
    section:"Dashboard"
  });
};
