define(['require','create/assembl/load'],function ( require , Load ){
	var createCanvas = function( width , height ){
		var _canvas = document.createElement('canvas');
		_canvas.width = width;
		_canvas.height = height;
		return _canvas;
	};
	var Manage = function(){
		var _this = this;

		_this.sources = Load['source'];
		_this.imageSources = {};
	};

	Manage.prototype = {
		getCvsImage : function( sourceName , sourceId ){
			var _this = this,
				sources = _this.sources,
				info , data;
			if( !sourceName ){
				return null;
			}
			if( sourceName in _this.sources  ){
				info = sources[sourceName].info;
				data = _this.sources[sourceName].data;
				return {
					width : info.srcInfo.width,
					height : info.srcInfo.height,
					src : _this.createImgObj(info,data[sourceId])
				};
			}else{

				return null;
			}
		},createImgObj : function( info , posObj ){
			var _this = this,
				img = new Image(),
				canvas = createCanvas( info.srcInfo.width , info.srcInfo.height ),
				ctx = canvas.getContext('2d');

			if( info.srcInfo.name in _this.imageSources ){
				img = _this.imageSources[info.srcInfo.name];
			}else{
				img.src = info.srcInfo.src;
				_this.imageSources[info.srcInfo.name] = img;
			}

			ctx.drawImage(
				img,
				posObj.x,
				posObj.y,
				posObj.width,
				posObj.height,
				0,
				0,
				posObj.width,
				posObj.height
			);
			return canvas;
		}
	};

	return Manage;
});