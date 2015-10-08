$(document).ready(function(){
	$('#carfactory').submit(function(event){
		event.preventDefault();
		var frm = $('#carfactory');
		makeCarFactory(frm);
	});
});


function makeCarFactory(frm){
	var make = frm.find('input[name="make"]').val();
	var model = frm.find('input[name="model"]').val();
	var color =frm.find('input[name="color"]').val();

	console.log(make+' '+model+' '+color);
}