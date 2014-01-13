/**
 * 角色通用类
 * unit/character/base.js
 *
 * 参数：
 * @param Object {}
 *        {drawImage Object}  shape        显示图片资源信息
 *        {Number}            posX         单位x轴位置信息
 *        {Number}            posY         单位y轴位置信息
 *        {Number}            health       单位生命值
 *        {Number}            speed        单位移动速度
 *        {Number}            score        单位消灭得分
 *        {weapon Object}     weaponList   单位武器信息
 * 
 * 方法与属性：    返回值             方法名/属性        参数类别   描述
 * 
 * @attribution                       cheackArea                    是否检测碰撞
 * @attribution                       remove                        是否需要被移除
 *
 * @function       Object(bullets)    attack()           null       单位移动
 * @function       base               move()             null       单位移动
 * @function       base               getDamage(attack)  number     单位承受attack数值的伤害
 * @function       boolean            isDied()           null       判断单位是否死亡
 */
define(['core/display','util/object','util/rectangle'],function ( Display , object , Rectangle){
	var Base = function(init){
		var _this = this;

		Display.call( _this , {
			shape : init.shape,
			posX : init.posX,
			posY : init.posY
		});


		// 单位的基本信息
		// 生命值、移动速度、消灭得分、
		_this.health = init.health||1;
		_this.speed = init.speed||1;
		_this.score = init.score||0;



		_this.size = init.size || { width : init.shape.destWidth , height : init.shape.destHeight };

		// 碰撞检测参数
		_this.area = new Rectangle({
			x : _this.posX - _this.size.width / 2,
			y : _this.posY - _this.size.height / 2,
			width : _this.size.width,
			height : _this.size.height
		});

		_this.cheackArea = true;
		_this.remove = false;

		// 单位的武器库以及当前所用武器
		_this.weaponList = init.weaponList||[];
		_this.weapon = null;


		// 动画集合
		_this.animateList = {};


		// 当前动作状态
		_this.animateType = 'move';

		_this.loadWeapon();
	};

	object.extend( Base , Display );

	var prototype,key;

	prototype = {
		/**
		 * 角色攻击行为
		 * 
		 */
		attack : function(){
			var _this = this ,
				i , sum , 
				weapon = _this.weapon;

			if( !weapon.isEmpty() ){
				weapon.fire();
			}else{
				_this.weaponList = _this.weaponList.pop();
				_this.loadWeapon();
			}

			return this;
		/**
		 * 角色移动行为
		 * 
		 */
		},move : function(){
			var _this = this;

			_this.posX += _this.speed;

			return this;
		/**
		 * 角色收到伤害行为
		 * @param  {number} attack 伤害数值
		 * 
		 */
		},getDamage : function( attack ){
			var _this = this;
			console.log(_this.name + ' get attack cost '+attack);
			_this.health -= attack;
			return this;
		/**
		 * 装备武器
		 * 
		 */
		},loadWeapon : function(){
			var _this = this,
				i ,sum ,
				weaponList = _this.weaponList,
				length = weaponList.length;
			
			if( length > 0 ){
				_this.weapon = weaponList[length-1];
			}else{
				console.error('miss weapon');
			}
			
			return this;
		/**
		 * 判断角色是否死亡
		 * 
		 */
		},isDied : function(){
			return this.health <= 0;
		/**
		 * 添加新武器
		 * @param {object} weaponObj 武器对象
		 */
		},addWeapon : function(weaponObj){
			var _this = this;
			_this.weaponList.push(weaponObj);
			_this.loadWeapon();

			return this;
		},control : function(){
			var _this = this;

			if( _this.isDied() ){
				_this.animateType = 'destroy';
			}else{
				
			}
			//console.log(_this.animateList);
			_this.move();
			_this.animateList[_this.animateType].call(_this);

		},updataArea : function(){
			var _this = this;
			this.area.upadataPonint({
				x : _this.posX - _this.size.width / 2,
				y : _this.posY - _this.size.height / 2,
				width : _this.size.width,
				height : _this.size.height
			});
			return this;
		}
	};

	for( key in prototype ){
		Base.prototype[key] = prototype[key];
	}

	return Base;
});