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