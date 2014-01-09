/**
 * 普通箭矢类
 * unit/weapon/bullet/arrow.js
 *
 * 参数：
 * @param Object {}
 *        {Number}         posX      X轴方向上的位置
 *        {Number}         posY      Y轴方向上的位置
 *        {Number}         range     运行距离
 *
 * 方法与属性：返回值     方法名      参数类别    描述
 */
define(['unit/weapon/bullet/base','util/object','core/source'],function ( Base , object , Source ){
	
	var Arrow = function(init){
		Base.call(this,{
			speed : 20,
			attack : 1,
			health : 1,
			range : init.range,
			shape : Source['arrow']['shape'],
			posX: init.posX,
			posY: init.posY
		});

		var _this = this;
		_this.size = Source['arrow']['size'];

		_this.init();

	};

	object.extend( Arrow , Base );

	var prototype , key;

	prototype = {
		init : function(){
			var _this = this;
			
		},control : (function(){
			var sum , loop , count , interval;
			return function( type ){
				var _this = this,
					index;

				if( type && ( type in _this ) && ( _this[type] instanceof function ) ){
					_this.animateType = type;
					count = 0;
					loop = _this.animateList[type].loop;
					interval = _this.animateList[type].interval;
					sum = _this.animateList[type].list.length;
				}

				if( interval === 0 ){
					index = 0;
				}else{
					index = ~~( count / interval );
				}


				if( index < sum ){
					_this[_this.animateType].call(_this, index );
				}else if( loop ){
					count = 0;
				}else{
					_this.remove = true;
				}
				

				count++;

				return this;
			};
		})(),damage : function(index){
			var _this = this;
			if( 'damage' in _this.animateList ){
				_this.animateList['damage'].list[index].call(_this);
			}

			return this;
		}
	};

	for( key in prototype ){
		Arrow.prototype[key] = prototype[key];
	}

	return Arrow;
});