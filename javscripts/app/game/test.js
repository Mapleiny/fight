define(['./control'],function (Control){
	var canvas = $('#canvas'),
		ctx = canvas.get(0).getContext('2d'),
		canvasWidth = canvas.width(),
		canvasHeight = canvas.height();
	return {
		init : function(){
			var fps = 1000/10,
				control = new Control({
					canvas : canvas,
					ctx : ctx,
					maxWidth : canvasWidth,
					maxHeight : canvasHeight
				});
			setInterval(function(){
				//console.clear();
				control.draw();
			},fps);
		}
	};
});