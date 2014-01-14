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

		_this.init();
	};



	GameControl.prototype = {
		init : function(){
			var _this = this;
			_this.addUnit( new Archer({
				posX : 0,
				posY : 300,
				speed : 0,
				derection : -1,
				animateType : 'sit'
			}) , 'leftUnit' );

			_this.addUnit( new Archer({
				posX : 872,
				posY : 300,
				speed : 0,
				derection : 1 , 
				animateType : 'attack'
			}) , 'rightUnit' );

			_this.setcollisionAction();
			return this;
		},draw : function(){
			var _this = this,
				i , sum ,
				animateList = _this.animateList,
				ctx = _this.ctx,
				drawData , temp;
			_this.control();
			
			ctx.clearRect( 0 , 0 , _this.maxWidth , _this.maxHeight );
			for( i = 0 , sum = animateList.length ; i < sum ; ++i ){
				drawData = animateList[i].drawData();
				temp = animateList[i].area.data;
				ctx.beginPath();
				ctx.moveTo(temp[0].x,temp[0].y);
				ctx.lineTo(temp[1].x,temp[1].y);
				ctx.lineTo(temp[2].x,temp[2].y);
				ctx.lineTo(temp[3].x,temp[3].y);
				ctx.strokeStyle="green";
				ctx.stroke();
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
		},addUnit : function( unitObj , collisionType ){
			var _this = this,
				collision = _this.collision,
				animateList = _this.animateList;

			if( collisionType ){
				collision.push({
					type : collisionType,
					key : 'area',
					obj : unitObj
				});
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
			// collision.setCheckRule(['leftUnit','rightWeapon'],function ( leftUnit , rightWeapon ){
			// 	rightWeapon.target.animateType = 'attack';
			// },function ( leftUnit , rightWeapon ){
			// 	rightWeapon.target.animateType = 'move';
			// });
			// collision.setCheckRule(['rightUnit','leftWeapon'],function ( leftUnit , leftWeapon ){
			// 	leftWeapon.target.animateType = 'attack';
			// },function ( leftUnit , leftWeapon ){
			// 	rightWeapon.target.animateType = 'move';
			// });

		}
	};

	return GameControl;
});