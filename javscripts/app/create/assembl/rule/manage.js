define(['require','create/assembl/source/manage','create/assembl/load'],function (require,SourceManage,Load){
	/**
	 * 00002000.img ----- body assembl
	 * 00012000.img ----- head assembl
	 * (body.origin + body.map.navel) - 
	 * (arm.origin +  arm.map.navel)
	 *
	 * Body.body(clothes shoes)
	 * Head.head Head.ear earring eyes glass Hair cap
	 * Weapon 
	 * Body.arm Body.lhand Body.rhand Body.armOverHair(Glove,arm)
	 * 
	 */
	var Manage = function(){
		var _this = this;

		_this.sourceManage = new SourceManage();

		_this.rules = Load['rule'];
	};

	Manage.prototype = {
		group : ['body'],
		assembl : function(){
			var _this = this,
				group = _this.group,
				rules = _this.rules,
				getAssemblInfo = _this.getAssemblInfo,
				, ;
			if( unit in rules ){

			}

			return {

			};
		},getAssemblInfo : function( group ){

			return {
				src : ,
				x : ,
				y : ,
				zIndex :
			};
		}
	}
});