define(['create/assembl/control'],function ( AssembleControl , Load ){
	var Source = function(sourceAndRule){
		var _this = this;
		_this.assembleControl = new AssembleControl(sourceAndRule);
	};

	Source.prototype = {
		init : function(){
			return this.assembleControl.assemblImage();
		}
	};

	return Source;
});