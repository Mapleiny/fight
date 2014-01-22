define(['create/assembl.source/source.position'],function(){
	var createImgObj = function( src ){
		var img = new Image();
		img.src = src;
		return img;
	};
	var Manage = function(){
		var _this = this;

		_this.sources = {};
	};

	Manage.prototype = {
		addSource : function( sourceName ){
			var _this = this;
			if( source && 'name' in source.info && 'src' in source.info ){
				_this.sources[source['name']] = source['data'];
			}else{
				console.log('fail!');
			}
			return _this;
		},getImage : function( sourceName , sourceId ){
			var _this = this;
			if( sourceName && ( sourceName in _this.sources ) && ( sourceId in _this.sources[sourceName] ) ){
				return createImgObj(_this.sources[sourceName][sourceId]);
			}else{
				console.log('no '+sourceName+' or '+sourceId+' in the sources,please add some!');
				return null;
			}
		}
	};

	return Manage;
});