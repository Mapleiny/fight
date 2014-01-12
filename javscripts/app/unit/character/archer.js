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
			health : 100,
			speed : 10,
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
					}],
					callBack : function(){
						_this.weapon.fire();
					},callBackIndex : 2
				}];
			_this.setAnimateList(animateList);
		}
	};


	for( key in prototype ){
		Archer.prototype[key] = prototype[key];
	}


	return Archer;
});