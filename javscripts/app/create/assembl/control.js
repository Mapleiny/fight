define(['create/assembl/rule/manage'],function (RuleManage){
	var createCanvas = function( width , height ){
		var _canvas = document.createElement('canvas');
		_canvas.width = width || 1;
		_canvas.height = height || 1;
		return _canvas;
	};
	var AssembleControl = function( load ){
		var _this = this;
		_this.ruleManage = new RuleManage(load);
	};

	AssembleControl.prototype = {
		assemblImage : function(){
			var _this = this,
				ruleManage = _this.ruleManage,
				list = [],
				canvas = createCanvas(),
				ctx = canvas.getContext('2d'),
				i , sum , frames,
				width = 0,
				height = 0,
				rule = {};
			frames = ruleManage.assembl();
			return frames;
			for( i = 0 , sum = animateList.length ; i < sum ; ++i ){
				
				ctx.drawImage(
					frames.src,
					0,
					0,
					frames.width,
					frames.height,
					0,
					height,
					frames.width,
					frames.height
				);
				rule[animateList[i]] = {
					x : 0,
					y : height,
					width : frames.width,
					height : frames.height,
					rule : frames.rule
				}
				width = frames.width > frames ? frames.width : frames;
				height += frames.height;
			}
			canvas.width = width;
			canvas.height = height;
			return {
				src : canvas,
				height : height,
				width : width,
				rule : rule
			}
		}
	};

	return AssembleControl;
});