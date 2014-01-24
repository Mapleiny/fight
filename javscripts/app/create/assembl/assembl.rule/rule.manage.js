define(['require','create/assembl/path'],function (require,Path){
	var Manage = function(){
		var _this = this;

		_this.rules = {};
	};

	Manage.prototype = {
		assembl : function(params){
			return ;
		},addRule : function( ruleName ){
			var _this = this,
				rule;
			if( ruleName in Path ){
				rule = require( Path[ruleName] );
			}else{
				return false;
			}
			if( rule ){
				_this.rules[ruleName] = rule;
			}else{
				return false;
			}
			return true;
		}
	}
});