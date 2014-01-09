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
	},createAnimateFunc = function(init){
		var sum , time , count , save , i , funcList , interval , loop , returnValue;
		sum = init.funcList.length;
		interval = init.interval;
		save = time = count = sum * interval;
		loop = init.loop;
		funcList = init.funcList;
		i = 0 ;
		return function(){
			returnValue = false;
			if( sum === 1 ){
				returnValue = funcList[0].call(this);
			}else{
				if( count <= 0 ){
					return true;
				}
				if( count == time ){
					returnValue = funcList[i].call(this);
					time -= interval;
					i++;
				}
				--count;
				if( count <= 0 && loop ){
					count = save;
					time = save;
					i = 0;
				}
			}
			return returnValue;
		};
	},registerAnimate = function(list){
		var i , sum , animateList;

		animateList = {};


		for( i = 0 , sum = list.length ; i < sum ; ++i ){
			animateList[list[i].name] = createAnimateFunc({
				loop : list[i].loop,
				interval : list[i].interval || 0,
				funcList : list[i].funcList
			});
		}
		return animateList;
	};



	/**
	 * 提供图片对象的处理
	 * @param {[type]} init [description]
	 */
	var AnimateObj = function(init){
		var _this = this;
		imageCvs.call( _this , init.data );
		
		_this.posX = init.posX;
		_this.posY = init.posY;
		_this.radius = getAnimateAreaRadius(_this.edge);
		_this.angle = 0;
		_this.scale = 1;
		_this.zIndex = 0;
		_this.size = init.size || { width : init.data.destWidth , height : init.data.destHeight };
		_this.area = new Rectangle({
			x : _this.posX - _this.size.width / 2,
			y : _this.posY - _this.size.height / 2,
			width : _this.size.width,
			height : _this.size.height
		});

		_this.animateType = 'attack';

		if( init.animateList ){
			_this.animateList = registerAnimate(init.animateList);
		}
		_this._canvas = createCanvas( _this.radius*2 , _this.radius*2 );
		_this._ctx = _this._canvas.getContext('2d');
	};

	object.extend( AnimateObj , imageCvs );

	var prototype,key;

	prototype = {
		_x : 0,
		_y : 0,
		setCenter : function(x,y){
			var _this = this;
			x = x || 0;
			y = y || 0;
			x = _this.radius*2*parseInt(x)/100;
			y = _this.radius*2*parseInt(y)/100;
			_this._x = isNaN(x) ? 0 : x;
			_this._y = isNaN(y) ? 0 : y;
			return this;
		},updataCtx : function(){
			var _this = this,
				data = _this.data,
				round = Math.round,
				_radius = _this.radius,
				_ctx = _this._ctx,
				_canvas = _this._canvas;
				
			if( _this.animateList ){
				_this.animateList[_this.animateType].call(_this);
			}

			_ctx.clearRect(0,0,_radius*2,_radius*2);
			_ctx.save();

			_ctx.translate(_radius,_radius);
			_ctx.rotate(_this.angle);

			_ctx.drawImage(data.image,data.sourceX,data.sourceY,data.sourceWidth,data.sourceHeight,-round(data.destWidth/2),-round(data.destHeight/2),data.destWidth,data.destHeight);
			_ctx.restore();

			return this;
		},drawData : function(){
			var _this = this,
				round = Math.round,
				diameter;
			_this.updataCtx();
			diameter = round(_this.radius*2);
			return {
				image : _this._canvas,
				sourceX : 0,
				sourceY : 0,
				sourceWidth : diameter,
				sourceHeight : diameter,
				destX : round(_this.posX-_this._x),
				destY : round(_this.posY-_this._y),
				destWidth : diameter,
				destHeight : diameter,
				zIndex : _this.zIndex
			};
		},updataArea : function(){
			var _this = this;
			this.area.upadataPonint({
				x : _this.posX - _this.size.width / 2,
				y : _this.posY - _this.size.height / 2,
				width : _this.size.width,
				height : _this.size.height
			});
			return this;
		},setAnimateType : function(type){
			var _this = this;
			_this.animateType = type;
			return this;
		}
	};

	for( key in prototype ){
		AnimateObj.prototype[key] = prototype[key];
	}

	return AnimateObj;
});