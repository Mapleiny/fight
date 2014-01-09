define(['core/animateObj','util/object'],function ( Animate , object){
	var Base = function(init){
		var _this = this;


		Animate.call(this,init);

		_this.health = init.health||1;
		_this.speed = init.speed||1;
		_this.score = init.score||0;
		_this.ownWeapon = init.ownWeapon;
		_this.weaponList = init.weaponList||[];

		_this.weapon = [];




		_this.loadWeapon();

		_this.animateStatus = 'move';

		//
	};

	object.extend( Base , Animate );

	var prototype , key;

	prototype = {
		die : false,
		checkArea : true,
		attack : function(){
			var _this = this ,
				i , sum , 
				weapon = _this.weapon,
				bullets = [];
			_this.setAnimateType('attack');

			
			for( i = 0 , sum = weapon.length ; i < sum ; ++i ){
				if( !weapon[i].isEmpty() ){
					bullets = bullets.concat( weapon[i].fire() );
				}else{
					_this.weaponList = _this.weaponList.del(i);
					_this.loadWeapon();
				}
			}
			return bullets;
		},move : function(){
			var _this = this;

			_this.setAnimateType('move');
			_this.posX += _this.speed;
			return this;
		},getDamage : function( attack ){
			var _this = this;
			_this.health -= attack;
			return this;
		},loadWeapon : function(){
			var _this = this,
				i ,sum ,
				weaponList = _this.weaponList,
				weapon = [];
			
			if( weaponList instanceof Array ){
				if( weaponList.length == 0 ){
					this.getOwnWeapon();
				}
				for( i = 0 , sum = weaponList.length ; i < sum ; ++i ){
					weapon.push(weaponList[i]);
				}
			}
			_this.weapon = weapon;
			return this;
		},isDied : function(){
			var _this = this;
			if( _this.health > 0 ){
				return false;
			}else{
				_this.setAnimateType('die');
				_this.checkArea = false;
				return true;
			}
		},addWeapon : function(weaponObj){
			var _this = this;
			_this.weaponList.push(weaponObj);
			_this.loadWeapon();

			return this;
		},weaponUpgrade : function(weaponObj,name){
			var i , sum,
				weaponList = this.weaponList;
			for( i = 0 , sum = weaponList.length ; i < sum ; ++i ){
				if( weaponList[i].name == name ){
					weaponList[i] = weaponObj;
				}
			}
			this.loadWeapon();
			return this;
		},getOwnWeapon : function(){
			this.weaponList.push(this.ownWeapon);
			return this;
		},control : function(){
			var _this = this;

			if( _this.isDied() ){
				_this.die = true;
			}
		}
	};

	for( key in prototype ){
		Base.prototype[key] = prototype[key];
	}

	return Base;
});