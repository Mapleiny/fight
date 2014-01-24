define(['create/assembl/assembl.source/source.manage','create/assembl/assembl.map/rule.manage'],function (SourceManage,RuleManage){
	var Assemble = function(){
		var _this = this;
		_this.sourceManage = new SourceManage();
		_this.ruleManage = new RuleManage();
	};

	Assemble.prototype = {
	};

	return Assemble;
});