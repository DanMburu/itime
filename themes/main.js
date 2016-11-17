$(document).on("pageshow", "#landing", function () { // When entering pagetwo
    showLoader();
    setTimeout(function () {
        $('.lnkLogin').trigger('click');
    }, 1000);
});

$(document).on("pageshow", function () {
   
 $('#topupbtn').off('click').on('click', function() {
	 var r = confirm("Topup your account with Ksh "+$('#txtTopupAmount').val());
    if (r == true) {
        showLoader();
        var url = $('#ROOTURL').val() + 'Topup';
        var data = $('#frm-topup').serialize();
        $.post(url, data).done(function(data) {
		   $( "#Dialog1" ).html(data);
 		   $( "#Dialog1" ).dialog("open");
            hideLoader();
        }).fail(function() {
            alert("Check your internet connection.");
        }).always(function() {
            hideLoader();
        });
	}
    }); //Topup
	
	
	$('#sellcredit').off('click').on('click', function() {
    var r = confirm("Buy airtime for  "+$('#txtSellPhone').val()+" Ksh "+$('#txtSellAmount').val());
    if (r == true) {
      
			showLoader();
        var url = $('#ROOTURL').val() + 'Sales';
        var data = $('#frm-sell-credit').serialize();
        $.post(url, data).done(function(data) {
				if (data.trim().indexOf("Sorry") == -1){
				   $( "#Dialog1" ).html(data);
				   $("#Dialog1").dialog("open");
				   $('#frm-sell-credit')[0].reset();
				   
				}else{
				 $( "#ErrorDialog" ).html(data);
			     $( "#ErrorDialog" ).dialog("open");
			    
				}
				hideLoader();
			}).fail(function(data) {
				alert("Check your internet connection.");
			}).always(function() {
				hideLoader();
			});
		 }
    });
	
	$('#forgotpin').off('click').on('click', function() {
		
		if($('#LoginPhone').val()===''){
			alert('Enter your phone number in the field above.');
			return false;
		}
		 var r = confirm("Generate a new PIN?");
    if (r == true) {
			showLoader();
			var url = $('#ROOTURL').val() + 'User/ResetPassword/' + $('#USERID').val()+'/';
			$.get(url, function(data) {
				if (data.trim().indexOf("error") == -1){
				   $( "#Dialog1" ).html(data);
				   $( "#Dialog1" ).dialog("open");
				}else{
					 $( "#ErrorDialog" ).html("Error generating the pin. That phone number may not be registered with us.");
			     $( "#ErrorDialog" ).dialog("open");
				}
				hideLoader();
			}).fail(function(data) {
				 $( "#ErrorDialog" ).html("Error generating the pin. That phone number may not be registered with us.");
			     $( "#ErrorDialog" ).dialog("open");
			}).always(function() {
				hideLoader();
			});
	}
    });
	$('#changepin').off('click').on('click', function() {
		if ($('#txtcurrentpin').val().length < 4) {
            alert("Current Pin is required.");
            return false;
        }
		if ($('#txtnewpin').val() != $('#txtconfirmnewpin').val()) {
            alert("PIN and Confirm PIN must match");
            return false;
        }
        if ($('#txtnewpin').val().length < 4) {
            alert("PIN must be at least 4 characters.");
            return false;
        }
			showLoader();
        var url = $('#ROOTURL').val() + 'User/ChangePassword';
        var data = $('#frm-change-pin').serialize();
        $.post(url, data).done(function(data) {
			  if (data.trim().indexOf("Error") == -1){
				   $( "#Dialog1" ).html(data);
				   $( "#Dialog1" ).dialog("open");
				}else{
				 $( "#ErrorDialog" ).html(data);
			     $( "#ErrorDialog" ).dialog("open");
				}
				hideLoader();
			}).fail(function() {
				alert("Check your internet connection.");
			}).always(function() {
				hideLoader();
			});
    });
$('#getbalance').off('click').on('click', function() {
			showLoader();

    var url = $('#ROOTURL').val() + 'Balance/'+$('#USERID').val();
			$.get(url, function(data) {
			   $( "#Dialog1" ).html(data);
			   $( "#Dialog1" ).dialog("open");
				hideLoader();
			}).fail(function() {
				alert("Check your internet connection.");
			}).always(function() {
				hideLoader();
			});
    });
  
  $('#lnkLogin').off('click').on('click', function() {
     
      var allFilled = true;
      $('#frm-login :input:not(:button)').each(function (index, element) {
          if (element.value === '') {
              console.log(element);
              allFilled = false;
          }
      });

      if (allFilled) {
          showLoader();

          var url = $('#ROOTURL').val() + 'User/Login';
          var data = $('#frm-login').serialize();
          $('#USERPHONE').val($('#LoginPhone').val());
          $.post(url, data).done(function(data) {
              if (data.trim().toLowerCase() === 'incorrect') {
                  $("#ErrorDialog").html('Your PIN is incorrect.');
                  $("#ErrorDialog").dialog("open");
              }
              else if (data.trim().toLowerCase() === 'validate-code') {
					$('#lnkTovalidate').trigger('click');
				}else {
                  $(".userId").val(data.trim());
                  $('#lnkhome').trigger('click');
              }
              hideLoader();
          }).fail(function() {
              alert("Check your internet connection.");
          }).always(function() {
              hideLoader();
          });
      } else {
       
          $("#ErrorDialog").html('All fields are required');
          $("#ErrorDialog").dialog("open");
        }
  });	
	$('#lnkRegister').off('click').on('click', function() {
		if ($('#txtpin').val() != $('#txtconfirmpin').val()) {
            alert("PIN and Confirm PIN must match");
            return false;
        }
        if ($('#txtpin').val().length < 4) {
            alert("PIN must be at least 4 characters.");
            return false;
        }
		var allFilled = true;
        $('#registrationForm :input:not(:button)').each(function(index, element) {
            if (element.value === '') {
                console.log(element);
                allFilled = false;
            }
        });
        if (allFilled) {
			showLoader();
			var url = $('#ROOTURL').val() + 'User/Register';
			var data = $('#registrationForm').serialize();
            $.post(url, data).done(function (data) {
                if (data.trim() === 'taken') {
                    $("#ErrorDialog").html('Phone number already registered');
                    $("#ErrorDialog").dialog("open");
                } else {
                    $("#USERID").val(data.trim());
                    $('#USERPHONE').val($('#PhoneNumber').val());
                    $("#Dialog1").html("Registration successful.");
                    $("#Dialog1").dialog("open");
                   // $('#lnkTovalidate').trigger('click');
                    //$('#lnkLogin').trigger('click');
                    $.mobile.changePage('#login', {type: "get", transition: "slide"});
                }

                hideLoader();
			}).fail(function(data) {
				$( "#ErrorDialog" ).html('An Error has occured.<br>Phone number already registered');
			     $( "#ErrorDialog" ).dialog("open");
			}).always(function() {
				hideLoader();
			});
			 } else {
				 $( "#ErrorDialog" ).html('All fields are required.');
			     $( "#ErrorDialog" ).dialog("open");
          
            return;
        }
    });	
	

 $('.close-popup').off('click').on("click", function(e) {
        window.history.back();
        e.preventDefault();
        return false;
    });
}); //$(document).on("pageshow")

$(document).on("pageshow", "#validate", function() { // valiate
    $('#lnkValidate').off('click').on("click", function() {
        if ($('#code').val() == "") {
           
			    $( "#ErrorDialog" ).html('Enter Validation Code.');
			     $( "#ErrorDialog" ).dialog("open");
            return false;
        }
        var url = $('#ROOTURL').val() + 'User/Validate/' + $('#USERPHONE').val() + '/' + $('#code').val();
      
		
		showLoader();
        $.get(url, function(data) {
            hideLoader();
            if (data.trim().toLowerCase() === 'incorrect-code') {
				 $( "#ErrorDialog" ).html('Incorrect code.');
			     $( "#ErrorDialog" ).dialog("open");
               
            } else {
                $("#USERID").val(data.trim());
                $('#lnkhome').trigger('click');
            }
        }).fail(function(data) {
            alert("An error has occured. Please check your internet connection");
            //  
            return false;
        }).always(function() {
            hideLoader();
        });
        return false;
    });
});

document.addEventListener("menubutton", function () { 
      $('#lnkhome').trigger('click');
}, false); 

 
$(function() {

	$( "#Dialog1" ).dialog({
		title:"Notification",
        hide:{effect: "scale"},
		show:{effect: "fade"},
		autoOpen:false
	}); 
   $( "#ErrorDialog" ).dialog({
	    title:"Error",
		show:{effect: "shake"}, //scale
		autoOpen:false
	});
});

	
	
$.urlParam = function(shows)
{ var results = new RegExp('[\\?&]' + shows+ '=([^&#]*)').exec(window.location.href);
    if (!results)   {          return '';      }     return results[1] || '';
}
function showLoader() {
    $.mobile.loading("show", {
        text: 'loading',
        textVisible: false,
        theme: 'a',
        textonly: false,
        html: ''
    });
}

function hideLoader() {
    $.mobile.loading("hide");
}