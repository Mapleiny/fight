define(['core/animateObj','util/object'],function ( Animate , object){
	var Base = function(init){
		var _this = this;


		Animate.call(this,init);

		_this.health = init.health||1;
		_this.speed = init.speed||1;
		_this.score = init.score||0;
	};

	object.extend( Base , Animate );

	var prototype , key;

	prototype = {
		die : false,
		checkArea : true,
		move : function(){
			var _this = this;
			_this.setAnimateType('move');
			return this;
		},getDamage : function( attack ){
			var _this = this;
			_this.health -= attack;
			return _this;
		},isDied : function(){
			var _this = this;
			if( _this.health > 0 ){
				return false;
			}else{
				_this.setAnimateType('die');
				_this.checkArea = false;
				return true;
			}
		},control : function(){
			
		}
	};

	for( key in prototype ){
		Base.prototype[key] = prototype[key];
	}

	return Base;
});