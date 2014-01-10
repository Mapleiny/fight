define(['util/collision','unit/character/archer','util/object','unit/character/base'],function (Collision,Archer,object,unitBase){


	var GameControl = function( init ){
		var _this = this;

		_this.collision = new Collision();

		_this.unitList = {};

		_this.unitCount = 0;

		_this.unitId = 0;

		_this.animateList = [];

		_this.canvas = init.canvas;
		_this.ctx = init.ctx;
		_this.maxWidth = init.maxWidth;
		_this.maxHeight = init.maxHeight;

		_this.init();
	};



	GameControl.prototype = {
		init : function(){
			var _this = this;
			_this.addUnit( new Archer({
				posX : 500,
				posY : 0
			}) , 'rightUnit' );
			return this;
		},draw : function(){
			var _this = this,
				i , sum ,
				animateList = _this.animateList,
				ctx = _this.ctx,
				drawData;
			_this.control();
			ctx.clearRect( 0 , 0 , _this.maxWidth , _this.maxHeight );
			for( i = 0 , sum = animateList.length ; i < sum ; ++i ){
				drawData = animateList[i].drawData();
				ctx.drawImage( drawData.image , drawData.sourceX , drawData.sourceY , drawData.sourceWidth , drawData.sourceHeight , drawData.destX , drawData.destY , drawData.destWidth , drawData.destHeight );
			}
			return _this;
		},control : function(){
			var _this = this,
				animateList = _this.animateList,
				collision = _this.collision,
				thisAnimate , i , sum , j , all;
			for( i = 0 , sum = animateList.length ; i < sum ; ++i ){
				thisAnimate = animateList[i];
				thisAnimate.control();
				if( thisAnimate.remove ){
					object.deleteArr( animateList , i );
				}
				if( thisAnimate instanceof unitBase ){
					if( thisAnimate.weapon.getBullets.length > 0 ){
						for( j = 0 , all = thisAnimate.weapon.getBullets.length ; j < all ; ++i ){
							_this.addUnit( thisAnimate.weapon.getBullets[j] , 'rightBullet' );
						}
					}
				}
			}
			collision.checkCollision();
		},addUnit : function( unitObj , collisiontType ){
			var _this = this,
				unitList = _this.unitList,
				collision = _this.collision,
				animateList = _this.animateList;
			unitList[_this.unitId] = unitObj;

			if( collisiontType ){
				collision.push({
					type : collisiontType,
					key : 'area',
					obj : unitObj
				});
				animateList.push(unitObj);

			}

			++_this.unitId;

			return this;
		},setcollisionAction : function(){
			var _this = this,
				collision = _this.collision;

			// 子弹和单位之间的碰撞
			collision.setCheckRule(['leftBullet','rightUnit'],function ( leftBullet , rightUnit ){
				leftBullet.getDamage(1);
				rightUnit.getDamage(leftBullet.attack);
			});
			collision.setCheckRule(['rightBullet','leftUnit'],function ( rightBullet , leftUnit ){
				rightBullet.getDamage(1);
				leftUnit.getDamage(rightBullet.attack);
			});

			// 单位进入攻击范围
			collision.setCheckRule(['leftUnit','rightWeapon'],function ( leftUnit , rightWeapon ){
				rightWeapon.target.animateType = 'attack';
			});
			collision.setCheckRule(['rightUnit','leftWeapon'],function ( leftUnit , leftWeapon ){
				leftWeapon.target.animateType = 'attack';
			});


		}
	};

	return GameControl;
});