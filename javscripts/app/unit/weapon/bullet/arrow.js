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
define(['./base','util/object','core/source'],function ( Base , object , Source ){
	
	var Arrow = function(init){
		var _this = this;

		Base.call(this,{
			speed : -10,
			attack : 1,
			health : 1,
			range : init.range,
			shape : Source['arrow']['shape'],
			size : Source['arrow']['size'],
			posX: init.posX,
			posY: init.posY
		});

		_this.name = 'arrow';

		_this.init();

	};

	object.extend( Arrow , Base );

	var prototype , key;

	prototype = {
		init : function(){
			var _this = this;
			
			//_this.setAnimateList();
		}
	};

	for( key in prototype ){
		Arrow.prototype[key] = prototype[key];
	}

	return Arrow;
});