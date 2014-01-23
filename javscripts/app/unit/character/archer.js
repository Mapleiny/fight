/**
 * 弓箭手类
 * unit/character/archer.js
 *
 * 参数
 * @param  {[type]} Base   [description]
 * @param  {[type]} Bow    [description]
 * @param  {[type]} object [description]
 * @param  {[type]} Source [description]
 * @return {[type]}        [description]
 */
define(['./base','unit/weapon/bow','util/object','core/source'],function ( Base , Bow , object , Source){
	var Archer = function( init ){
		var _this = this;

		Base.call(this,{
			derection : init.derection,
			health : init.health||10,
			speed : init.speed,
			score : 10,
			posX: init.posX,
			posY: init.posY,
			size : Source['archer']['size'],
			shape : Source['archer']['shape'],
			weaponList : [new Bow({
				target : _this,
				shiftX : 0,
				shiftY : 40
			})]
		});

		_this.name = 'archer';

		_this.init();
	};

	object.extend( Archer , Base );

	var key , prototype;

	prototype = {
		init : function(){
			var _this = this,
				animateList = [{
					name : 'attack',
					loop : true,
					interval : 20,
					funcList : [function(){
						this.shape.sourceX = 0;
						this.shape.sourceY = 0;
					},function(){
						this.shape.sourceX = 81;
						this.shape.sourceY = 0;
					},function(){
						this.shape.sourceX = 162;
						this.shape.sourceY = 0;
						this.attack();
					}]
				},{
					name : 'move',
					loop : true,
					interval : 15,
					funcList : [function(){
						this.shape.sourceX = 0;
						this.shape.sourceY = 0;
					},function(){
						this.shape.sourceX = 89;
						this.shape.sourceY = 0;
					},function(){
						this.shape.sourceX = 178;
						this.shape.sourceY = 0;
					},function(){
						this.shape.sourceX = 267;
						this.shape.sourceY = 0;
					}]
				}];
			_this.addAnimateList(animateList);
		}
	};


	for( key in prototype ){
		Archer.prototype[key] = prototype[key];
	}


	return Archer;
});