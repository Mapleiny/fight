define(['util/collision','unit/character/archer','util/object','unit/character/base'],function (Collision,Archer,object,unitBase){


	var GameControl = function( init ){
		var _this = this;

		_this.collision = new Collision();

		_this.unitCount = 0;

		_this.unitId = 0;

		_this.animateList = [];

		_this.canvas = init.canvas;
		_this.ctx = init.ctx;
		_this.maxWidth = init.maxWidth;
		_this.maxHeight = init.maxHeight;

		_this.depend = {};

		_this.init();
	};

	var drawR = function(ctx,points){
		var i , sum ;
		for( i = 0 , sum = points.length ; i < sum ; ++i ){
			ctx.beginPath();
			ctx.moveTo(points[0].x,points[0].y);
			ctx.lineTo(points[1].x,points[1].y);
			ctx.lineTo(points[2].x,points[2].y);
			ctx.lineTo(points[3].x,points[3].y);
			ctx.lineTo(points[0].x,points[0].y);
			ctx.strokeStyle="green";
			ctx.stroke();
		}
	};

	GameControl.prototype = {
		init : function(){
			var _this = this;
			_this.setcollisionAction();

			_this.addUnit( new Archer({
				posX : 0,
				posY : 300,
				speed : 0,
				derection : 1,
				health : 1,
				animateType : 'sit'
			}) , 'leftUnit' , 'leftWeapon');

			_this.addUnit( new Archer({
				posX : 872,
				posY : 300,
				speed : 0,
				derection : -1 ,
				animateType : 'attack'
			}) , 'rightUnit' , 'rightWeapon' );

			return this;
		},draw : function(){
			var _this = this,
				i , sum ,
				animateList = _this.animateList,
				ctx = _this.ctx,
				drawData ;
			_this.control();
			
			ctx.clearRect( 0 , 0 , _this.maxWidth , _this.maxHeight );
			for( i = 0 , sum = animateList.length ; i < sum ; ++i ){

				drawData = animateList[i].drawData();

				drawR(ctx,animateList[i].area.data);

				if( 'weapon' in animateList[i] ){
					drawR(ctx,animateList[i].weapon.area.data);
				}
				
				ctx.drawImage( drawData.image , drawData.sourceX , drawData.sourceY , drawData.sourceWidth , drawData.sourceHeight , drawData.destX , drawData.destY , drawData.destWidth , drawData.destHeight );
			}
			return _this;
		},control : function(){
			var _this = this,
				animateList = _this.animateList,
				collision = _this.collision,
				thisAnimate , i , sum , j , all ,
				bullets;
			


			for( i = 0 , sum = animateList.length ; i < sum ; ++i ){
				thisAnimate = animateList[i];
				thisAnimate.control();



				// 如果单位需要被清除
				if( thisAnimate.remove ){
					_this.animateList = object.deleteArr( _this.animateList , i );
					collision.deleteCollosion( thisAnimate._collisionIndex['type'] , thisAnimate._collisionIndex['index'] );
					if( thisAnimate instanceof unitBase && thisAnimate.weapon ){
						collision.deleteCollosion( thisAnimate.weapon._collisionIndex['type'] , thisAnimate.weapon._collisionIndex['index'] );
					}
					thisAnimate = null;
				}

				// 对于会有子弹输出的单位处理
				if( thisAnimate instanceof unitBase ){
					bullets = thisAnimate.weapon.getBullets();
					for( j = 0 , all = bullets.length ; j < all ; ++j ){
						_this.addUnit( bullets[j] , 'rightBullet' );
					}
				}
			}

			// 碰撞检测
			collision.checkCollision();

			return this;
		},addUnit : function( unitObj , collisionType , relyType ){
			var _this = this,
				collision = _this.collision,
				animateList = _this.animateList;

			if( collisionType ){
				unitObj._collisionIndex = {
					type : collisionType,
					index : collision.push({
						type : collisionType,
						key : 'area',
						obj : unitObj
					})
				}
				if( unitObj instanceof unitBase && relyType && unitObj.weapon ){
					unitObj.weapon._collisionIndex = {
						type : relyType,
						index : collision.push({
							type : relyType,
							key : 'area',
							obj : unitObj.weapon
						})
					}
				}
			}else{
				console.error('no collisionType set!');
			}

			animateList.push(unitObj);

			++_this.unitId;

			return this;
		},setcollisionAction : function(){
			var _this = this,
				collision = _this.collision;

			// 子弹和单位之间的碰撞
			// collision.setCheckRule(['leftBullet','rightUnit'],function ( leftBullet , rightUnit ){
			// 	leftBullet.getDamage(1);
			// 	rightUnit.getDamage(leftBullet.attack);

			// 	console.log('I got heart!');
			// });
			collision.setCheckRule(['rightBullet','leftUnit'],function ( rightBullet , leftUnit ){
				rightBullet.getDamage(1);
				leftUnit.getDamage(rightBullet.attack);
			});

			// 单位进入攻击范围
			collision.setCheckRule(['leftUnit','rightWeapon'],function ( leftUnit , rightWeapon ){
				if( rightWeapon ){
					rightWeapon.target.animateType = 'attack';
				}
			},function ( leftUnit , rightWeapon ){
				if( rightWeapon ){
					rightWeapon.target.animateType = 'move';
				}
			},false);
			collision.setCheckRule(['rightUnit','leftWeapon'],function ( rightUnit , leftWeapon ){
				if( leftWeapon ){
					leftWeapon.target.animateType = 'attack';
				}
			},function ( leftUnit , leftWeapon ){
				if( leftWeapon ){
					leftWeapon.target.animateType = 'move';
				}
			},false);

		}
	};

	return GameControl;
});