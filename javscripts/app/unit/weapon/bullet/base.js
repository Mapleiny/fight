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
define(['core/display','util/object','util/rectangle','unit/base'],function ( Display , object , Rectangle , Base){
	var BulletBase = function(init){
		var _this = this;

		Base.call( _this , object.filter(init,['shape','posX','posY','health','speed','attack','size']) );
		_this.distance = init.distance || 100;

	};

	object.extend( BulletBase , Base );

	var prototype,key;

	prototype = {
		/**
		 * 子弹移动行为
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
		}
	};

	for( key in prototype ){
		BulletBase.prototype[key] = prototype[key];
	}

	return BulletBase;
});