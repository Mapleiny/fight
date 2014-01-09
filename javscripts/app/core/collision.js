define(['util/collison','util/object'],function ( Collison , object ){



	var CollisionControl = function(){
		var _this = this;
		Collison.call(_this);

		
	};

	object.extend( CollisionControl , Collison );

	var key , prototype;

	prototype = {
		push : function(){

		}
	};



	for( key in prototype ){
		CollisionControl.prototype[key] = prototype[key];
	}



	return CollisionControl;
});