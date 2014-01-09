/**
 * 弓类
 * unit/weapon/bow.js
 *
 * 参数：
 * @param Object {}
 *        {character Object}    target    武器持有者
 *        {Number}              shiftX    武器相对持有者X方向上的位置
 *        {Number}              shiftY    武器相对持有者Y方向上的位置
 *
 * 
 *
 * 方法与属性：  返回值     方法名/属性    参数类别   描述
 *
 * 
 * @function     this       fire()         null       发射子弹
 * @function     Number     isEmpty()      null       判断子弹数量
 * @function     Array      getBullets()   null       射出的子弹 
 */
define(['unit/weapon/arrow','unit/weapon/base','util/object'],function ( Arrow , Base , object){
	
	var Bow = function(init){
		var _this = this;

		Base.call(this,{
			bullet : Arrow,
			bulletSum : Infinity,
			spend : 20,
			range : 500,
			target : init.target,
			shiftX : init.shiftX,
			shiftY : init.shiftY
		});

		_this.name = 'bow';

	};

	object.extend( Bow , Base );

	var prototype , key;

	prototype = {

	};

	for( key in prototype ){
		Bow.prototype[key] = prototype[key];
	}

	return Bow;
});