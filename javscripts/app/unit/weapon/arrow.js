define(['unit/base','util/object','core/source'],function ( Base , object , Source ){
	
	var Arrow = function(init){
		Base.call(this,{
			speed : 20,
			attack : 1,
			health : 1,
			shape : {
				image : Source['arrow'],
				sourceX : 0,
				sourceY : 0,
				sourceWidth : 68,
				sourceHeight : 19,
				destX : 0,
				destY : 0,
				destWidth : 68,
				destHeight : 19
			},
			posX: init.posX + 20,
			posY: init.posY + 40,
			size : {
				width : 68,
				height : 10
			},animateList : [{
				name : 'move',
				loop : false,
				interval : 0,
				funcList : [function(){
					this.posY += this.speed;
				}]
			}]
		});
		var _this = this;
		_this.speed = 5;
		_this.range = init.range;
		_this.initPos = [_this.posX,_this.posY];
		_this.animateType = 'move';
	};

	object.extend( Arrow , Base );

	var prototype , key;

	prototype = {
		isDied : function(){
			var _this = this;
			if( _this.health > 0 && Math.abs( _this.data.destY - _this.initPos[1] ) <= _this.range ){
				return false;
			}else{
				_this.setAnimateType('die');
				_this.checkArea = false;
				return true;
			}
		}
	};

	for( key in prototype ){
		Arrow.prototype[key] = prototype[key];
	}

	return Arrow;
});