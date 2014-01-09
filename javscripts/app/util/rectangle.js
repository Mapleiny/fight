define(['util/object','util/polygon'],function (object,Polygon){
	var createPoints = function( x , y , width , height ){
		return [
			{ x:x , y:y },
			{ x:x + width , y:y },
			{ x:x , y:y + height },
			{ x:x+ width , y:y + height }
		];
	};

	var Rectangle  = function(init){
		Polygon.call( this , createPoints(init.x,init.y,init.width,init.height) );
	};

	object.extend( Rectangle , Polygon );

	Rectangle.prototype.upadataPonint = function(init){
		this.updata(createPoints(init.x,init.y,init.width,init.height));
	};

	Rectangle.prototype.rotate = function(deg,point){
		this.rotateDegAtPoint(deg,point);
	};

	return Rectangle;
});