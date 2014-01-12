/**
 * 子弹通用类
 * unit/weapon/bullet/base.js
 *
 * 参数：
 * @param Object {}
 *        {drawImage Object} shape     显示图片资源信息
 *        {Number}           posX      单位x轴位置信息
 *        {Number}           posY      单位y轴位置信息
 *        {Number}           health    单位生命值
 *        {Number}           speed     单位移动速度
 *        {Number}           attack    单位攻击力
 *        {Number}           range     射程
 *
 * 方法与属性：      返回值           方法名/属性        参数类别   描述
 *
 * @attribution                       cheackArea                    是否检测碰撞
 * @attribution                       remove                        是否需要被移除
 * @attribution                       health                        当前血量
 * @attribution                       attack                        伤害值
 * 
 * @function         base             move()             null       单位移动
 * @function         base             getDamage(attack)  number     单位承受attack数值的伤害
 * @function         boolean          isDied()           null       判断单位是否死亡
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
		// 生命值、移动速度、伤害
		_this.health = init.health||1;
		_this.speed = init.speed||1;
		_this.attack = init.attack||1;
		_this.range = init.range||100;

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

		_this.distance = 0;


		_this.animateList = {};

		// 当前动作状态
		_this.animateType = 'move';

	};

	object.extend( Base , Display );

	var prototype,key;

	prototype = {
		/**
		 * 角色移动行为
		 * 
		 */
		move : function(){
			var _this = this;

			_this.posX += _this.speed;
			_this.distance += Math.abs(_this.speed);

			if( _this.distance > _this.range ){
				_this.remove = true;
			}

			return this;
		/**
		 * 角色收到伤害行为
		 * @param  {number} attack 伤害数值
		 * 
		 */
		},getDamage : function( attack ){
			var _this = this;
			_this.health -= attack;
			return this;
		/**
		 * 判断角色是否死亡
		 * 
		 */
		},isDied : function(){
			return this.health <= 0;
		},updataArea : function(){
			var _this = this;
			this.area.upadataPonint({
				x : _this.posX - _this.size.width / 2,
				y : _this.posY - _this.size.height / 2,
				width : _this.size.width,
				height : _this.size.height
			});
			return this;
		},control : function(){
			var _this = this;

			if( _this.isDied() ){
				_this.animateType = 'destroy'
			}else{

			}

			_this.move();

			if( _this.animateType in _this.animateList ){
				_this.animateList[_this.animateType].call(_this);
			}else{
				console.log( _this.name + ' doesn\' have ' + _this.animateType + ' animateType' );
			}
			
		}
	};

	for( key in prototype ){
		Base.prototype[key] = prototype[key];
	}

	return Base;
});