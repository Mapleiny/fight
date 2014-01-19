define(function(){
	var canvasManage = function(elem,width,height){
		this.width = width || 300;
		this.height = height || 200;
		this.canvas = elem;
		this.ctx = this.canvas.get(0).getContext('2d');
		this.resetCanvas(this.width,this.height);
	};
	canvasManage.prototype = {
		setAttr : function( width , height ){
			var _this = this;
			_this.width = width || _this.width;
			_this.height = height || _this.height;
			_this.canvas.attr({
				'width' : width,
				'height' : height
			});
			return this;
		},resetCanvas : function( width , height ){
			var _this = this;
			_this.setAttr( width , height )
				.ctx.clearRect( 0 , 0 , width , height );
		},setSoruce : function( data ){
			var _this = this;
			_this.soruceData = data;
			return _this;
		},getThumbnail : function(){
			var src = this.canvas[0].toDataURL("image/png");
			return src;
		},draw : function(){
			var _this = this,
				_ctx = _this.ctx,
				data = this.soruceData,
				i ,sum;

			_ctx.clearRect(0,0,_this.width,_this.height);

			for( i = 0 , sum = data.length ; i < sum ; ++i ){
				console.log(data[i]);
				_ctx.drawImage( data[i].image , data[i].sourceX , data[i].sourceY , data[i].sourceWidth , data[i].sourceHeight , data[i].destX , data[i].destY , data[i].destWidth , data[i].destHeight);
			}
			return this;
		}
	};
	return canvasManage;
});