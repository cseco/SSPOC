var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');


class spoc{

  static upload(req, res)
  {
    console.log("in uploads")
    console.log(req.query)
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'ca!@kaql',
      database : 'sspoc'
    });

    connection.connect();
    
  

  var post  = {
    Scale: req.query.scale,
    Survey_plan_type:req.query.plantype,
    Survey_method:req.query.coordinatesys,
    Instrument:req.query.coordinatesys,
    Location:req.query.location,
    Plan_name:req.query.planname,
    coordinate_system:req.query.coordinatesys,
    Abbutals:req.query.surveymethod,
    userid:req.user.id
  };
  var query = connection.query('INSERT INTO survey SET ?', post, function (error, results, fields) {
    if (error) {
      res.send({err:""+error})
    }
    // Neat!
  });
  console.log(query.sql);

  res.send({msg:"Done. You can now upload the files"})

}

  static uploadcsv()
  {
    res.send({err:""+error})
  }

  static uploaddwg(req, res)
  {
    console.log("is upload");
  // create an incoming form object
  var form = new formidable.IncomingForm();
  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;
  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/uploads');
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
     //upload to forge
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);
  }

}

module.exports = spoc;