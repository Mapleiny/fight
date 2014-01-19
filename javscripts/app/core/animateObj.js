define(['util/object','core/imageCvs','util/rectangle'],function (object,imageCvs,Rectangle){
	var getAnimateAreaRadius = function(data){
		var x = data.maxX - data.minX,
			y = data.maxY - data.minY;
		return Math.ceil(Math.sqrt(x*x+y*y)/2);
	},createCanvas = function( width , height ){
		var _canvas = document.createElement('canvas');
		_canvas.width = width;
		_canvas.height = height;
		return _canvas;
	};



	/**
	 * 提供图片对象的处理
	 * @param {[type]} init [description]
	 */
	var AnimateObj = function(init){
		var _this = this;
		imageCvs.call( _this , init.shape );
		
		_this.posX = init.posX;
		_this.posY = init.posY;

		_this.zIndex = 0;

		_this._canvas = createCanvas( init.shape.sourceWidth , init.shape.sourceHeight );
		_this._ctx = _this._canvas.getContext('2d');
	};

	object.extend( AnimateObj , imageCvs );

	var prototype,key;

	prototype = {
		updataCtx : function(){
			var _this = this,
				data = _this.shape,
				round = Math.round,
				_ctx = _this._ctx,
				_canvas = _this._canvas;
				
			if( _this.animateList ){
				_this.animateList[_this.animateType].call(_this);
			}

			_ctx.clearRect(0,0,data.sourceX,data.sourceY);

			_ctx.drawImage(data.image,data.sourceX,data.sourceY,data.sourceWidth,data.sourceHeight,0,0,data.destWidth,data.destHeight);

			return this;
		},drawData : function(){
			var _this = this;
			_this.updataCtx();
			return {
				image : _this._canvas,
				sourceX : 0,
				sourceY : 0,
				sourceWidth : _this.shape.sourceWidth,
				sourceHeight : _this.shape.sourceHeight,
				destX : _this.posX,
				destY : _this.posY,
				destWidth : _this.shape.destWidth,
				destHeight : _this.shape.destHeight,
				zIndex : _this.zIndex
			};
		}
	};

	for( key in prototype ){
		AnimateObj.prototype[key] = prototype[key];
	}

	return AnimateObj;
});