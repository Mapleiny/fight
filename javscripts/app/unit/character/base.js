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
define(['core/display','util/object','util/rectangle','unit/base'],function ( Display , object , Rectangle , Base){

	var CharacterBase = function( init ){
		var _this = this;

		Base.call( _this , object.filter(init,['shape','posX','posY','health','speed','attack','size']) );

		// 消灭得分
		_this.score = init.score||0;

		// 武器列表
		_this.weaponList = init.weaponList||[];

		// 当前武器
		_this.weapon = null;

		// 重写攻击方法
		delete _this.attack;

		// 初始化武器
		_this.loadWeapon();

	};

	object.extend( CharacterBase , Base );

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
		 * 添加新武器
		 * @param {object} weaponObj 武器对象
		 */
		},addWeapon : function(weaponObj){
			var _this = this;
			_this.weaponList.push(weaponObj);
			_this.loadWeapon();

			return this;
		}
	};

	for( key in prototype ){
		CharacterBase.prototype[key] = prototype[key];
	}

	return CharacterBase;
});