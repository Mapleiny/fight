/**
 * 武器通用类
 * unit/weapon/base.js
 *
 * 参数：
 * @param Object {}
 *        {bullet Object}    bullet     子弹
 *        {Number}           bulletSum  子弹数量
 *        {Number}           spend      射击频率
 *        {Number}           range      攻击距离
 *        {Number}           target     武器持有者
 *
 * 方法与属性：  返回值     方法名/属性    参数类别   描述
 *
 * 
 * @function     this       fire()         null       发射子弹
 * @function     Number     isEmpty()      null       判断子弹数量
 * @function     Array      getBullets()   null       射出的子弹
 */

define(['util/rectangle'],function (Rectangle){
	var Base = function(init){
		var _this = this;

		_this.bullet = init.bullet;
		_this.bulletSum = init.bulletSum||Infinity;
		_this.speed = init.spend || 20;
		_this.range = init.range || 200;

		_this.target = init.target;
		_this.shiftX = init.shiftX || 0;
		_this.shiftY = init.shiftY || 0;

		_this.area = new Rectangle({
			x : _this.target.posX + _this.shiftX - _this.range,
			y : _this.target.posY + _this.shiftY - _this.range,
			width : _this.range*2,
			height : _this.range*2
		});

		// 发出的子弹
		_this.bullets = [];


	};

	Base.prototype = {
		fire : function(){
			var _this = this;
			//console.log('fire!');
			if( !_this.isEmpty() ){
				--_this.bulletSum;
				_this.bullets.push(_this.bulletBeforeFire());
			}
			return _this;
		},bulletBeforeFire : function(){
			var _this = this,
				target = _this.target;
			return new _this.bullet({
				posX : target.posX + _this.shiftX,
				posY : target.posY + _this.shiftY,
				range : _this.range
			});
		},isEmpty : function(){
			return this.bulletSum <= 0;
		/**
		 * 武器升级（目前没用，以后栽再说）
		 * @param  {[type]} weaponObj [description]
		 * @param  {[type]} name      [description]
		 * @return {[type]}           [description]
		 */
		},weaponUpgrade : function( weaponObj , name ){
			var i , sum,
				weaponList = this.weaponList;
			for( i = 0 , sum = weaponList.length ; i < sum ; ++i ){
				if( weaponList[i].name == name ){
					weaponList[i] = weaponObj;
				}
			}
			//this.loadWeapon();
			return this;
		/**
		 * 获取觉得攻击发出的子弹
		 * @return {Array} 角色攻击发出子弹集合
		 */
		},getBullets : function (){
			var bullets = this.bullets;

			this.bullets = [];

			return bullets;
		},updataArea : function(){
			var _this = this;
			_this.area.upadataPonint({
				x : _this.target.posX + _this.shiftX - _this.range,
				y : _this.target.posY + _this.shiftY - _this.range,
				width : _this.range*2,
				height : _this.range*2
			});
			return this;
		}
	};

	return Base;
});