define(['util/math','util/object'],function ( math , object ){
	var Collision = function(){
		var _this = this;
		_this.collisionList = {};
		_this.checkRule = [];
	};


	Collision.prototype = {
		/**
		 * 添加检测对象
		 * @param  {Object} param
		 *         {String} type         类别
		 *         {Object} key          待检测属性
		 *         {Number} id           索引
		 * 
		 */
		push : function( param ){
			var _this = this,
				collisionList = _this.collisionList;
			if( param && param.type && param.key && param.obj ){
				if( param.type in collisionList ){
					collisionList[param.type].push({
						key : param.key,
						obj : param.obj
					});
				}else{
					collisionList[param.type] = [];
				}
			}else{
				console.error('参数不正确！');
			}
			return this;
		/**
		 * 删除需检测对象
		 * @param  {String} type  类别
		 * @param  {Number} index 索引
		 */
		},deleteCollosion : function( type , index ){
			var _this = this,
				collisionList = _this.collisionList;
			if( ( type in collisionList ) && ( index < _this.collisionList[type].length ) ){
				_this.collisionList[type] = object.deleteArr( _this.collisionList[type] , index );
			}else{
				console.error('type='+type+',index='+ index +'(键值不在该对象中或索引不在正确范围)');
			}
			return this;
		/**
		 * 设置碰撞检测规则
		 * @param {Array}   typeArr 被检测碰撞类别
		 * @param {Funtion} action 碰撞后执行的操作
		 */
		},setCheckRule : function( typeArr , action , elseAction ){
			var _this = this,
				checkRule = _this.checkRule;
			if( ( typeArr instanceof Array ) && ( typeArr.length > 1 ) && ( action instanceof Function ) ){
				checkRule.push({
					type : typeArr,
					action : action,
					elseAction : elseAction || function(){}
				});
			}else{
				console.error('setCheckRule 参数有误！');
			}
			return this;
		/**
		 * 检测碰撞并执行操作
		 * @return Collision 
		 */
		},checkCollision : function(){
			var _this = this,
				checkRule = _this.checkRule,
				collisionList = _this.collisionList,
				i , sum ,
				type1 , type2,
				type1Sum , type2Sum,
				type1Index , type2Index ,
				collisionObj1 , collisionObj2;

			for( i = 0 , sum = checkRule.length ; i < sum ; ++i ){
				type1 = checkRule[i]['type'][0];
				type2 = checkRule[i]['type'][1];
				for( type1Index = 0 , type1Sum = collisionList[type1].length ; type1Index < type1Sum ; ++type1Index ){
					collisionObj1 = collisionList[type1][type1Index];
					for( type2Index = 0 , type2Sum = collisionList[type2].length ; type2Index < type2Sum ; ++type2Index ){
						collisionObj2 = collisionList[type2][type2Index];
						if( math.checkPolyIntersect( collisionObj1.obj[collisionObj1.key] , collisionObj2.obj[collisionObj2.key] ) ){
							checkRule[i]['action'].call( this , collisionObj1.obj , collisionObj1.obj );
						}else{
							checkRule[i]['elseAction'].call( this , collisionObj1.obj , collisionObj1.obj );
						}
					}
				}
			}
			return this;
		}
	};



	return Collision;
});