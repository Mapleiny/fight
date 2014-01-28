define(['./source', 'create/assembl/load'], function(Source, Load) {
	var canvas = $('#canvas'),
		ctx = canvas.get(0).getContext('2d'),
		canvasWidth = canvas.width(),
		canvasHeight = canvas.height();
	return {
		init: function() {
			var fps = 1000 / 60;
			// control = new Control({
			// 	canvas : canvas,
			// 	ctx : ctx,
			// 	maxWidth : canvasWidth,
			// 	maxHeight : canvasHeight
			// });
			var load = new Load(),
				source, info, data, offset = {},
				control;
			load.ready(function(sourceAndRule) {
				source = new Source(sourceAndRule);
				info = source.init();
				data = info.unit.unitId.walk1.data;
				control = (function (list) {
					var sum , time , count , save , i , funcList , interval = 20 , loop = true ;
					sum = 4;
					save = time = count = 80;
					i = 0;
					return function() {
						if (sum <= 0) {
							return false;
						}
						if (count === time) {
							offset.x = list[i].x;
							offset.y = list[i].y;
							time -= interval;
							i++;
						}
						//console.log(time);
						--count;
						if (loop) {
							if (count <= 0) {
								count = save;
								time = save;
								i = 0;
							}
							return true;
						} else {
							return false;
						}
					};
				})(data.rule);
				// setInterval(function() {
				// 	control();
				// 	//console.log();
				// 	ctx.clearRect(0,0,canvasWidth,canvasHeight);
				// 	ctx.drawImage(
				// 		info.unit.unitId.walk1.src,
				// 		offset.x,
				// 		offset.y,
				// 		data.eachWidth,
				// 		data.eachHeight,
				// 		0,
				// 		0,
				// 		data.eachWidth,
				// 		data.eachHeight
				// 	);
				// }, fps);

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