define(['unit/archer'],function (Archer){
	var canvas = $('#canvas'),
		ctx = canvas.get(0).getContext('2d'),
		canvasWidth = canvas.width(),
		canvasHeight = canvas.height();
	return {
		init : function(){
			var fps = 1000/60,
				archer = new Archer(),
				obj = [],
				temp = null;
			setInterval(function(){
				obj = [];
				ctx.clearRect(0,0,canvasWidth,canvasHeight);

				obj.push(archer.drawData());

				temp = archer.attack();
				if( temp.length != 0 ){
					obj.push( temp[0].drawData() );
				}
				

				for( i = 0 , sum = obj.length ; i < sum ; ++i ){
					ctx.drawImage(obj[i].image , obj[i].sourceX , obj[i].sourceY , obj[i].sourceWidth , obj[i].sourceHeight , obj[i].destX , obj[i].destY , obj[i].destWidth , obj[i].destHeight);
				}
			},fps);
		}
	};
});