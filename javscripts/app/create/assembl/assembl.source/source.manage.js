define(['require','create/assembl/path'],function ( require , Path ){
	var createCanvas = function( width , height ){
		var _canvas = document.createElement('canvas');
		_canvas.width = width;
		_canvas.height = height;
		return _canvas;
	};
	var Manage = function(){
		var _this = this;

		_this.sources = {};
		_this.imageSources = {};
	};

	Manage.prototype = {
		addSource : function( sourceName ){
			var _this = this,
				source;
			if( sourceName in Path ){
				source = require( Path[sourceName] );
			}else{
				return false;
			}
			if( source ){
				_this.sources[sourceName] = source;
			}else{
				return false;
			}
			return true;
		},getCvsImage : function( sourceName , sourceId ){
			var _this = this;
			if( !sourceName ){
				return null;
			}
			if(  sourceName in _this.sources  ){
				if( !_this.addSource( sourceName ) ){
					return null;
				}
			}

			return _this.createImgObj(_this.sources[sourceName].info,_this.sources[sourceName].data[sourceId]);

		},createImgObj = function( info , posObj ){
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