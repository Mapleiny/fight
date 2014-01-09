define(['core/imageCvs'],function(){
	var getEdge = function(data){
		return {
			minX : data.destX,
			maxX : data.destX+data.destWidth,
			minY : data.destY,
			maxY : data.destY+data.destHeight
		};
	};
	var ImageCvs = function(init){
		if( init )
		this.shape = {
			image : init.image,
			sourceX : init.sourceX,
			sourceY : init.sourceY,
			sourceWidth : init.sourceWidth,
			sourceHeight : init.sourceHeight,
			destX : init.destX,
			destY : init.destY,
			destWidth : init.destWidth,
			destHeight : init.destHeight
		};
		this._edge = getEdge(this.shape);
	};
	ImageCvs.prototype = {
		scale : 1,
		rotateDegAtPoint : function( deg , point ){
		},setScale : function(num){
			var shape = this.shape;
			if( typeof num === 'number' ){
				shape.destWidth *= num;
				shape.destHeight *= num;
				this.scale = num;
			}
			return this;
		},getScale : function(){
			return this.scale;
		}
	};
	return ImageCvs;
});