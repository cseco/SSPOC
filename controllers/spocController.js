var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var mysql      = require('mysql');
let db = 'sspoc'
let pwd = 'ca!@kaql'


class spoc{

  static upload(req, res)
  {
    console.log("in uploads")
    console.log(req.query)
    
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : pwd,
      database : db
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
    userid:req.user.id,
    surveyor:req.user.name.first+" "+req.user.name.middle+" "+req.user.name.last
  };
  var query = connection.query('INSERT INTO survey SET ?', post, function (error, results, fields) {
    if (error) {
      console.log("error"+error)
      res.send({err:""+error})
    }

    // Neat!
  });
  console.log(query.sql);

  res.send({msg:"Done. You can now upload the files"})

}

  static uploadcsv(req,res, filename)
  {

    console.log("uploadcsv")
    var ext = filename.substring(filename.length - 3, filename.length);
    
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : pwd,
      database : db
    });
    let id = req.user.id;
    var post  = {
      userid: id,
      file:''
    };
    console.log("uploadcsv")
    var query = connection.query('SELECT * FROM survey WHERE userid=?', [id, null], function (error, results, fields) {
   console.log("uploadcsv")
    if (error) {
      console.log("error"+error)
      res.send({err:""+error})
      return
    }
   // console.log(results)
   // console.log(fields)
   // console.log(query.sql)
   let indtochange = -1;
    for(let i in results)
    {
      let ind = results[i].Ind
      let file;
      if(ext == "csv")
        file = results[i].filecsv
      else
        file = results[i].file
      if(file == null)
      {
        indtochange = ind;
        break;
      }
    }
   /* */
    console.log('The solution is: ', results[0]);
    console.log("csv file uploaded")
    console.log("will change.."+indtochange)
    if(filename.length > 64)
      filename = filename.substring(filename.length - 64,filename.length)
    //console.log(filename.length)
    let fieldtochange;
    if(ext == "csv")
    {
      connection.query('UPDATE survey SET filecsv = ? WHERE Ind = ?', [filename, indtochange], function (error, results, fields) {
      if (error) {
        console.log("error"+error)
          res.send({err:""+error})
          return
      }
      // ...
      res.send({msg:"CSV file has been uploaded"})
    });
    }
    else
      {
      connection.query('UPDATE survey SET file = ? WHERE Ind = ?', [filename, indtochange], function (error, results, fields) {
      if (error) {
        console.log("error"+error)
          res.send({err:""+error})
          return
      }
      // ...
      res.send({msg:"CSV file has been uploaded"})
       connection.destroy();
    });
    }
      
    // Neat!

  });
  
  console.log(query.sql);
    
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