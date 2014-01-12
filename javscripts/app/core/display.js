/**
 * 单位动画表现类
 * core/display.js
 *
 * 参数：
 * @param Object {}
 *        {Number}            posX      X轴方向上的位置
 *        {Number}            posY      Y轴方向上的位置
 *        {canvas object}     shape     用于在canvas上绘制动画
 */
define(['core/imageCvs'],function (imageCvs){

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
		callBack = init.callBack;
		callBackIndex = init.callBackIndex;
		i = 0 ;
		return function(){
			//console.log("time:%d,count:%d,i:%d,interval:%d,save:%d,callBackIndex:%d,loop:%s",time,count,i,interval,save,callBackIndex,loop);
			if( sum <= 0 ){
				return false;
			}
			if( count === time ){
				funcList[i].call(this);
				if( i === callBackIndex ){
					callBack.call(this);
				}
				time -= interval;
				i++;
			}
			--count;
			if( loop ){
				if( count <= 0 ){
					count = save;
					time = save;
					i = 0;
				}
				return true;
			}else{
				return false;
			}
		};
	},registerAnimate = function(list){
		var i , sum , animateList;

		animateList = {};


		for( i = 0 , sum = list.length ; i < sum ; ++i ){
			animateList[list[i].name] = createAnimateFunc({
				loop : list[i].loop || false,
				interval : list[i].interval || 0,
				funcList : list[i].funcList || [],
				callBack : list[i].callBack || function(){},
				callBackIndex : list[i].callBackIndex || 0
			});
		}
		return animateList;
	};


	var Display = function( params ){
		var _this = this;

		imageCvs.call( _this , params.shape );

		_this.posX = params.posX;
		_this.posY = params.posY;

		_this.radius = getAnimateAreaRadius(_this._edge);

		_this.animateList = {};

		_this._canvas = createCanvas( _this.radius*2 , _this.radius*2 );
		_this._ctx = _this._canvas.getContext('2d');
	};

	Display.prototype  = {
		drawData : function(){
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
				destX : round(_this.posX),
				destY : round(_this.posY),
				destWidth : diameter,
				destHeight : diameter,
				zIndex : _this.zIndex
			};
		/**
		* 注册动画
		*
		* @param Array  []
		*				Object {}
		*				{String}   name
		*				{Number}   loop
		*				{Number}   interval
		*				{Array}    funcList
		*				{Funtion}  callBack
		*				{Number}   callBackIndex
		*/
		},setAnimateList : function (params){
			var _this = this;

			_this.animateList = registerAnimate( params );

			return this;
		},addAnimateList : function( params ){
			var _this = this;
			_this.animateList[params.name] = createAnimateFunc({
				loop : params.loop || false,
				interval : params.interval || 0,
				funcList : params.funcList || [],
				callBack : params.callBack || function(){},
				callBackIndex : params.callBackIndex || 0
			});
			return this;
		},updataCtx : function(){
			var _this = this,
				shape = _this.shape,
				round = Math.round,
				_radius = _this.radius,
				_ctx = _this._ctx,
				_canvas = _this._canvas;

			_ctx.clearRect(0,0,_radius*2,_radius*2);
			_ctx.save();

			_ctx.translate(_radius,_radius);
			_ctx.rotate(_this.angle);

			_ctx.drawImage(shape.image,shape.sourceX,shape.sourceY,shape.sourceWidth,shape.sourceHeight,-round(shape.destWidth/2),-round(shape.destHeight/2),shape.destWidth,shape.destHeight);
			_ctx.restore();

			return this;
		},show : function( name , frame ){
			var _this = this;
			if( name in _this.animateList ){
				_this.animateList[name][frame].call(_this);
			}else{
				console.error( name +' is not in animateList');
			}

			return this;
		}
	};

	return Display;
});