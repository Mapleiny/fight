define(['require','create/assembl/assembl.source/source.position'],function ( require , sourceSrc ){
	var createCanvas = function( width , height ){
		var _canvas = document.createElement('canvas');
		_canvas.width = width;
		_canvas.height = height;
		return _canvas;
	},createImgObj = function( srcObj , posObj ){
		var img = new Image(),
			canvas = createCanvas( srcObj.width , srcObj.height ),
			ctx = canvas.getContext('2d');

		img.src = src;

		ctx.drawImage(
			img,
			srcObj.x,
			srcObj.y,
			srcObj.width,
			srcObj.height,
			0,
			0,
			srcObj.width,
			srcObj.height
		);


		return canvas;
	};
	var Manage = function(){
		var _this = this;

		_this.sources = {};
	};

	Manage.prototype = {
		addSource : function( sourceName ){
			var _this = this,
				source;
			if( sourceName in _this.sources ){
				return _this;
			}
			if( sourceName in sourceSrc ){
				source = require( sourceSrc[sourceName] );
			}else{
				return _this;
			}
			if( source && 'name' in source.info && 'srcInfo' in source.info ){
				_this.sources[source['name']] = {
					srcInfo : source['info']['srcInfo'],
					data : source['data']
				};
			}else{
				console.log('fail!');
			}
			return _this;
		},getCvsImage : function( sourceName , sourceId ){
			var _this = this;
			if( sourceName && ( sourceName in _this.sources ) && ( sourceId in _this.sources[sourceName]['data'] ) ){
				return createImgObj(_this.sources[sourceName].srcInfo,_this.sources[sourceName].data[sourceId]);
			}else{
				console.log('no '+sourceName+' or '+sourceId+' in the sources,please add some!');
				return null;
			}
		}
	};

	return Manage;
});