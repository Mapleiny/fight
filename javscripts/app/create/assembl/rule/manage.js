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
	var createCanvas = function( width , height ){
		var _canvas = document.createElement('canvas');
		_canvas.width = width;
		_canvas.height = height;
		return _canvas;
	};
	var Manage = function(){
		var _this = this;

		_this.sourceManage = new SourceManage();

		_this.rules = Load['rule'];
	};

	Manage.prototype = {
		group : ['body'],
		src : null,
		assembl : function(){
			var _this = this,
				group = _this.group,
				rules = _this.rules,
				getAssemblInfo = _this.getAssemblInfo,
				result = {} ;
			if( unit in rules ){
				result[unit] = getAssemblInfo(rules[unit]);
			}
			result['src'] = _this.src;
			return result;
		},unitAssembl : function( animateList ){
			var _this = this,
				singleFrameAssembl = _this.singleFrameAssembl;
				frame ,
				maxHeight = 0,
				maxWidth = 0,
				canvas = null,
				ctx = null,
				frameCount = 0,
				singleFrameInfo = {},
				result = {};

			for( frameKey in animateList ){
				frame = animateList[frameKey];
				singleFrameInfo[frameKey] = singleFrameAssembl(frame);
				maxHeight = maxHeight > singleFrameInfo[frameKey].height ? maxHeight : singleFrameInfo[frameKey].height;
				maxWidth = maxWidth > singleFrameInfo[frameKey].width ? maxWidth : singleFrameInfo[frameKey].width;
				++frameCount;
			}
			canvas = new createCanvas(maxWidth*frameCount,maxHeight);
			ctx = canvas.getContext('2d');
			frameCount = 0,
			for( frameKey in singleFrameInfo ){
				frame = singleFrameInfo[frameKey];
				ctx.drawImage(
					frame.src,
					
				);
			}


			return ;
		},singleFrameAssembl : function(){
			return {
				src : ,
				width : ,
				height : ,
				bodyOrigin : ,
				x :,
				y :,
			}
		}
	}
});