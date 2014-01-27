define(['require'],function ( require ){
	var createCanvas = function( width , height ){
		var _canvas = document.createElement('canvas');
		_canvas.width = width;
		_canvas.height = height;
		return _canvas;
	};
	var Manage = function(sources){
		var _this = this;

		_this.sources = sources;
	};

	Manage.prototype = {
		imageSources : {},
		getCvsImage : function( group , sourceId ){
			var _this = this,
				sources = _this.sources,
				groups = sources.groups,
				data = sources.data;
				
			if( !group ){
				return null;
			}
			if( group in groups ){
				return {
					width : data[sourceId].width,
					height : data[sourceId].height,
					src : _this.createImgObj(groups[group],data[sourceId])
				};
			}else{
				return null;
			}
		},createImgObj : function( info , posObj ){
			var _this = this,
				img,
				canvas = createCanvas( posObj.width , posObj.height ),
				ctx = canvas.getContext('2d');

			if( info.name in _this.imageSources ){
				img = _this.imageSources[info.name];
			}else{
				img = info.src;
				_this.imageSources[info.name] = img;
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