var loaduploadform = function(whichuser){
	addtostack(".");	
	console.log("which user"+whichuser)
	console.log("apps/?app=spoc&action=loadpage&page=uploadfilesform")
	$("body").ufModal({
        sourceUrl: "apps/?app=spoc&action=loadpage&page=uploadfilesform",
        msgTarget: $("#alerts-page")
    });

    //attachUserForm();
}

var uploadcsvstart = function(whichuser){
	addtostack(".");	
	console.log("which user"+whichuser)
	console.log("apps/?app=spoc&action=loadpage&page=uploadfilesform")
	$("body").ufModal({
        sourceUrl: "apps/?app=spoc&action=loadpage&page=uploadcsv",
        msgTarget: $("#alerts-page")
    });

    //attachUserFormu();
}

var uploaddwgstart = function(whichuser){
	addtostack(".");	
	console.log("which user"+whichuser)
	console.log("apps/?app=spoc&action=loadpage&page=uploadfilesform")
	$("body").ufModal({
        sourceUrl: "apps/?app=spoc&action=loadpage&page=uploaddwg",
        msgTarget: $("#alerts-page")
    });

    //attachUserFormuploaddwgstart();
}

var uploadsubmitbtn = function(obj)
{
	if($(".planname").val() == '')
	{
		alertify.error("Please enter plan name")
		$(".planname").focus()
		return
	}

	let url = "spoc/upload";

	let data = "";

	data += "scale="+$("#scale").val();
	data += "&plantype="+$("#plantype").val();
	data += "&surveymethod="+$("#surveymethod").val();
	data += "&planname="+$(".planname").val();
	data += "&location="+$("#location").val();
	data += "&coordinatesys="+$("#coordinatesys").val();
	url = url + "?"+data

	
	try{
		
		$.post(url).done(function(innerdata){
  			let datapi;
  			console.log(innerdata)
  			try{
  				if(typeof innerdata != "object")
					datapi = JSON.parse(innerdata);
				else datapi = innerdata;
  				if(datapi.err != undefined)alertify.error(""+datapi.err)
  				else{
  					alertify.success(""+datapi.msg)
  					$(".closed").click();
  					setTimeout(function(){ uploadcsvstart(); }, 1000);
  					
  					//uploadcsvstart();
  					//$(".createusercancelbtn").click();
  					//addtostack(".")
  					//loadlastpage();
  				}
			}catch(error)
			{
				alertify.error("Unknown error. Please try again later")
			}
			  			
		}).fail(function(){
			alertify.error("Failed. Please check your internet connection try again later.");
		});
	}catch(err)
	{
		alertify.error(""+err);
	}
	/**/
}


var registrysubmit = function(ind)
{
	url = "apps/?app=spoc&action=registrysubmit&ind=" +ind;
	console.log(url)
	try{
		
		$.get(url).done(function(innerdata){
  			let datapi;
  			console.log(innerdata)
  			try{
  				if(typeof innerdata != "object")
					datapi = JSON.parse(innerdata);
				else datapi = innerdata;
  				if(datapi.err != undefined)alertify.error(""+datapi.err)
  				else{
  					alertify.success(""+datapi.msg)
  				}
			}catch(error)
			{
				alertify.error("Unknown error. Please try again later")
			}
			  			
		}).fail(function(){
			alertify.error("Failed. Please check your internet connection try again later.");
		});
	}catch(err)
	{
		alertify.error(""+err);
	}

}

var dossubmit = function(ind)
{
	url = "apps/?app=spoc&action=dossubmit&ind=" +ind;
	console.log(url)
	try{
		
		$.get(url).done(function(innerdata){
  			let datapi;
  			console.log(innerdata)
  			try{
  				if(typeof innerdata != "object")
					datapi = JSON.parse(innerdata);
				else datapi = innerdata;
  				if(datapi.err != undefined)alertify.error(""+datapi.err)
  				else{
  					alertify.success(""+datapi.msg)
  				}
			}catch(error)
			{
				alertify.error("Unknown error. Please try again later")
			}
			  			
		}).fail(function(){
			alertify.error("Failed. Please check your internet connection try again later.");
		});
	}catch(err)
	{
		alertify.error(""+err);
	}

}

var dosreject = function(ind)
{
	url = "apps/?app=spoc&action=dosjerect&ind=" +ind;
	console.log(url)
	try{
		
		$.get(url).done(function(innerdata){
  			let datapi;
  			console.log(innerdata)
  			try{
  				if(typeof innerdata != "object")
					datapi = JSON.parse(innerdata);
				else datapi = innerdata;
  				if(datapi.err != undefined)alertify.error(""+datapi.err)
  				else{
  					alertify.success(""+datapi.msg)
  				}
			}catch(error)
			{
				alertify.error("Unknown error. Please try again later")
			}
			  			
		}).fail(function(){
			alertify.error("Failed. Please check your internet connection try again later.");
		});
	}catch(err)
	{
		alertify.error(""+err);
	}
}

var checkersubmit = function(csvfile, dwgfile, checkindex)
{

	if(checkindex == undefined)
	{
			//console.log("apps/?app=spoc&action=loadpage&page=checkeriframe&uri="+csvfile)
		$("body").ufModal({
	        sourceUrl: "apps/?app=spoc&action=loadpage&page=checkeriframe&uri=uploads/"+csvfile,
	        msgTarget: $("#alerts-page")
	    });
	     setTimeout(function(){ 
			$(".closed").click();
			setTimeout(function(){ 
				checkersubmit(csvfile, dwgfile, true);
		}, 1000);
		}, 15000);
	}
	else
	{
		$("body").ufModal({
	        sourceUrl: "apps/?app=spoc&action=loadpage&page=checkeriframe&uri="+dwgfile,
	        msgTarget: $("#alerts-page")
	    });

	}
	   

}