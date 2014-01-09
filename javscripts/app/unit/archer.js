define(['unit/base','unit/weapon/bow','util/object','core/source'],function ( Base , Bow , object , Source){
	var Archer = function(){
		var weapon = new Bow(this);
		Base.call(this,{
			health : 100,
			speed : 10,
			score : 10,
			posX: 300,
			posY: 100,
			data : {
				image : Source['archer'],
				sourceX : 0,
				sourceY : 0,
				sourceWidth : 81,
				sourceHeight : 99,
				destX : 0,
				destY : 0,
				destWidth : 81,
				destHeight : 99
			},size:{
				height : 90,
				width : 81
			},animateList : [{
				name : 'attack',
				loop : true,
				interval : 20,
				funcList : [function(){
					this.data.sourceX = 0;
					this.data.sourceY = 0;
					return true;
				},function(){
					this.data.sourceX = 81;
					this.data.sourceY = 0;

					this.attack();
					return true;
				},function(){
					this.data.sourceX = 162;
					this.data.sourceY = 0;
					return true;
				}]
			}],ownWeapon : weapon
		});
	};

	object.extend( Archer , Base );

	var key , prototype;

	prototype = {

	};


	for( key in prototype ){
		Archer.prototype[key] = prototype[key];
	}


	return Archer;
});