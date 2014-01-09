define(['core/collison','unit/character/archer','util/object','unit/character/base'],function (Collison,Archer,object,unitBase){


	var GameControl = function(){
		var _this = this;

		_this.collison = new Collison();

		_this.unitList = {};

		_this.unitCount = 0;

		_this.unitId = 0;

		_this.animateList = [];
	};



	GameControl.prototype = {
		init : function(){
			var _this = this;
			_this.addUnit( new Archer({
				posX : 500,
				posY : 0
			}) , 'rightUnit' );
			_this.addUnit( new Archer({
				posX : 300,
				posY : 0
			}) , 'leftUnit' );
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
				collison = _this.collison,
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
			collison.checkCollision();

			
		},addUnit : function( unitObj , collisontType ){
			var _this = this,
				unitList = _this.unitList,
				collison = _this.collison;
			unitList[_this.unitId] = unitObj;

			if( collisontType ){
				collison.push({
					type : collisontType,
					key : 'area',
					obj : unitObj
				});
			}

			++_this.unitId;

			return this;
		},setCollisonAction : function(){
			var _this = this,
				collison = _this.collison;

			// 子弹和单位之间的碰撞
			collison.setCheckRule(['leftBullet','rightUnit'],function ( leftBullet , rightUnit ){
				leftBullet.getDamage(1);
				rightUnit.getDamage(leftBullet.attack);
			});
			collison.setCheckRule(['rightBullet','leftUnit'],function ( rightBullet , leftUnit ){
				rightBullet.getDamage(1);
				leftUnit.getDamage(rightBullet.attack);
			});

			// 单位进入攻击范围
			collison.setCheckRule(['leftUnit','rightWeapon'],function ( leftUnit , rightWeapon ){
				rightWeapon.target.animateType = 'attack';
			});
			collison.setCheckRule(['rightUnit','leftWeapon'],function ( leftUnit , leftWeapon ){
				leftWeapon.target.animateType = 'attack';
			});


		}
	};

	return GameControl;
});