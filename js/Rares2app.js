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

	var html = generateHtml(make,model,color);
	$('#response').html(html);

}

function generateHtml(make,model,color){
	var html = 'Your Factory will be making:';
	html+='<h2>'+make+'</h2>';
	html+='<h2>'+model+'</h2>';
	html+='<h2>'+color+'</h2>';

	return html;
}

