define(function(){
	var object = function( o ){
		var F = function(){};
		F.prototype = o;
		return new F();
	};

	return {
		extend : function( subType , superType ){
			var prototype = object(superType.prototype);
			prototype.constructor = subType;
			subType.prototype = prototype;
		},deleteArr : function( arr , index ){
			if( index < 0 ){
				return arr;
			}else{
				return arr.slice( 0 , index ).concat( arr.slice( index + 1 , arr.length ) );
			}
		},filter : function( obj , keyArray ){
			var i , sum , key , 
				resultObj = {};
			if( keyArray instanceof Array ){
				for( i = 0 , sum = keyArray.length ; i < sum ; ++i ){
					key = keyArray[i];
					if( key in obj ){
						resultObj[key] = obj[key];
					}
				}
			}
			return resultObj;
		}
	};
});