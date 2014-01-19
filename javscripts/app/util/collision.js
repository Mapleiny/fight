define(['util/math','util/object'],function ( math , object ){
	var Collision = function(){
		var _this = this;
		_this.collisionList = {};
		_this.checkRule = [];
		_this.index = 0;
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
				collisionList = _this.collisionList,
				index = _this.index;
			if( param && param.type && param.key && param.obj ){
				if( !(param.type in collisionList) ){
					collisionList[param.type] = {};
				}
				collisionList[param.type][_this.index] = {
					key : param.key,
					obj : param.obj
				};
				++_this.index;
			}else{
				console.error('参数不正确！');
			}
			return index;
		/**
		 * 删除需检测对象
		 * @param  {String} type  类别
		 * @param  {Number} index 索引
		 */
		},deleteCollosion : function( type , index ){
			var _this = this,
				collisionList = _this.collisionList;
			if( type in collisionList  ){
				delete _this.collisionList[type][index];
			}else{
				console.error('type='+type+',index='+ index +'(键值不在该对象中或索引不在正确范围)');
			}
			return this;
		/**
		 * 设置碰撞检测规则
		 * @param {Array}   typeArr 被检测碰撞类别
		 * @param {Funtion} action 碰撞后执行的操作
		 */
		},setCheckRule : function( typeArr , action , elseAction , require ){
			var _this = this,
				checkRule = _this.checkRule,
				collisionList = _this.collisionList,
				i , sum;
			if( ( typeArr instanceof Array ) && ( typeArr.length > 1 ) && ( action instanceof Function ) ){
				checkRule.push({
					type : typeArr,
					action : action,
					elseAction : elseAction || function(){},
					require : require === undefined ? true : require
				});
				for( i = 0 , sum = typeArr.length ; i < sum ; ++i ){
					if( !( typeArr[i] in collisionList ) ){
						collisionList[typeArr[i]] = {};
					}
				}
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
				collisionObj1 , collisionObj2 ,
				key , require;
			for( i = 0 , sum = checkRule.length ; i < sum ; ++i ){
				type1 = checkRule[i]['type'][0];
				type2 = checkRule[i]['type'][1];
				require = checkRule[i]['require'];

				if( !object.isEmpty(collisionList[type1]) && !object.isEmpty(collisionList[type2]) ){
					for( type1Index in collisionList[type1] ){

						collisionObj1 = collisionList[type1][type1Index];

						for( type2Index in collisionList[type2] ){

							collisionObj2 = collisionList[type2][type2Index];

							if( math.checkPolyIntersect( collisionObj1.obj[collisionObj1.key].data , collisionObj2.obj[collisionObj2.key].data ) ){
								checkRule[i]['action'].call( this , collisionObj1.obj , collisionObj2.obj );
							}else{
								checkRule[i]['elseAction'].call( this , collisionObj1.obj , collisionObj2.obj );
							}
						}
					}
				}else if( !require ){
					if( !object.isEmpty(collisionList[type1]) ){
						for( key in collisionList[type1] ){
							collisionObj2 = collisionList[type1][key];
							checkRule[i]['elseAction'].call( this , collisionObj2.obj , null );
						}
					}else if( !object.isEmpty(collisionList[type2]) ){
						for( key in collisionList[type2] ){
							collisionObj2 = collisionList[type2][key];
							checkRule[i]['elseAction'].call( this , null , collisionObj2.obj );
						}
					}
					
				}
			}
			return this;
		}
	};



	return Collision;
});