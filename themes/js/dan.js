
$( document ).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!
    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true; 
});


$(document).on("pageshow", "#landing", function () { // When entering pagetwo
 showLoader();
setTimeout(function(){
	// window.location = $('#RootUrl').val();
	
 }, 2000);
});




function showLoader(){
 $.mobile.loading( "show", {
		text: '',
		textVisible: false,
		theme: 'a',
		textonly: false,
		html: ''
	 });
	 $('.ui-icon-loading').addClass('ui-icon');
}
function hideLoader(){
	 $.mobile.loading( "hide" );
}