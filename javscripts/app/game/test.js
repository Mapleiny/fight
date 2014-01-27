define(['./source','create/assembl/load'],function (Source,Load){
	var canvas = $('#canvas'),
		ctx = canvas.get(0).getContext('2d'),
		canvasWidth = canvas.width(),
		canvasHeight = canvas.height();
	return {
		init : function(){
			var fps = 1000/60;
				// control = new Control({
				// 	canvas : canvas,
				// 	ctx : ctx,
				// 	maxWidth : canvasWidth,
				// 	maxHeight : canvasHeight
				// });
			var load = new Load(),
				source;
			load.ready(function (sourceAndRule){
				source = new Source(sourceAndRule);
				console.log(source.init());
			});
			//control.draw();
			// setInterval(function(){
			// 	//console.clear();
			// 	//control.draw();
			// 	ctx.drawImage(
			// 		obj.unit.unitId.walk1.src,
			// 		0,
			// 		0
			// 	);
			// },fps);
		}
	};
});