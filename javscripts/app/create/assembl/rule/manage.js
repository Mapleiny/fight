define(['require','create/assembl/source/manage','create/assembl/load'],function (require,SourceManage,Load){
	/**
	 * 00002000.img ----- body assembl
	 * 00012000.img ----- head assembl
	 * (body.origin + body.map.navel) - 
	 * (arm.origin +  arm.map.navel)
	 *
	 * z-index : body head weapon arm 
	 */
	var Manage = function(){
		var _this = this;

		_this.sourceManage = new SourceManage();

		_this.rules = Load['rule'];
	};

	Manage.prototype = {
		assembl : function( action ){
			var _this = this,
				i , sum;
			if( params && params instanceof Array ){
				for( i = 0 , sum = params.length ; i < sum ; ++i ){

				}
				return ;
			}else{
				return null;
			}
		}
	}
});