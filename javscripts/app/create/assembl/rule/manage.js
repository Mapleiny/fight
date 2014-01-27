define(['require','create/assembl/source/manage','create/assembl/load'],function (require,SourceManage,Load){

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
				unitAssembl = _this.unitAssembl,
				result = {} ;
			result['unit'] = {};
			for( unit in rules ){
				result['unit'][unit] = {};
				for( action in rules[unit] ){
					result['unit'][unit][action] = unitAssembl(rules[unit][action]);
				}
			}
			result['src'] = _this.src;
			return result;
		},unitAssembl : function( animateList ){
			var _this = this,
				singleFrameAssembl = _this.singleFrameAssembl;
				frame ,
				maxHeight = 0,
				maxWidth = 0,
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
			frameCount = 0,
			for( frameKey in singleFrameInfo ){
				frame = singleFrameInfo[frameKey];
			}
			_this,src = _this.draw();
			return result;
		},singleFrameAssembl : function( frame ){
			var _this = this,
				sourceManage = _this.sourceManage,
				canvas = new createCanvas(10,10),
				ctx = canvas.getContext('2d');
				part = null,
				key = null,
				map = null,
				origin = {},
				brow = {},
				neck = {},
				hand = {},
				handMove = {},
				navel = {},
				headNeck = {},
				bodyNeck = {},
				headBrow = {},
				brow = {},
				armNavel = {},
				armHand = {},
				bodyNavel = {},
				bodyHand = {},
				lHandMove = {},
				source = null,
				temp;
				//keySequence = ['body','arm','cap',''];
				drawData = {};
			for( key in frame ){
				part = frame[key];
				map = part['map'];

				// origin
				if( 'origin' in part ){
					temp = part['origin'].split(',');
					origin.x = -temp[0];
					origin.y = -temp[1];
				}

				// brow
				if( 'brow' in map ){
					temp = map['brow'].split(',');
					brow.x = -temp[0];
					brow.y = -temp[1];
					if( key == 'head' ){
						headBrow = brow;
					}
					offset.x = origin.x + headNeck.x - bodyNeck.x - headBrow.x + brow.x;
    				offset.y = origin.y + headNeck.y - bodyNeck.y - headBrow.y + brow.y;
				}

				// neck
				if( 'neck' in map ){
					temp = map['neck'].split(',');
					neck.x = -temp[0];
					neck.y = -temp[1];
					if( key == 'body' ){
						bodyNeck = neck;
					}
					if( key == 'head' ){
						headNeck = neck;
					}
				}

				// hand
				if( 'hand' in map ){
					temp = map['hand'].split(',');
					hand.x = -temp[0];
					hand.y = -temp[1];
					if( key == 'arm' ){
						armHand = hand;
					}
					if( key == 'body' ){
						bodyHand = hand;
					}
					offset.x = origin.x + hand.x + armNavel.x - armHand.x - bodyNavel.x;
    				offset.y = origin.y + Hand.y + armNavel.y - armHand.y - bodyNavel.y;
				}

				// handMove
				if( 'handMove' in map ){
					temp = map['handMove'].split(',');
					handMove.x = -temp[0];
					handMove.y = -temp[1];
					if( key == 'lHand' ){
						lHandMove = handMove;
					}
					offset.x = origin.x + handMove.x - lHandMove.x;
					offset.y = origin.y + handMove.y - lHandMove.y;
				}

				// navel
				if( 'navel' in map ){
					temp = map['navel'].split(',');
					navel.x = -temp[0];
					navel.y = -temp[1];
					if( key == 'arm' ){
						armNavel = navel;
					}
					if( key == 'body' ){
						bodyNavel = navel;
					}
					offset.x = origin.x + navel.x - bodyNavel.x;
					offset.y = origin.y + navel.y - bodyNavel.y;
				}

				source = sourceManage.getCvsImage(part.group,part.src);
				ctx.drawImage(
					source.src,
					0,
					0,
					source.width,
					source.height,
					offset.x,
					offset.y,
					source.width,
					source.height
				);
			}

			
			return {
				src : ,
				width : ,
				height : ,
				x :,
				y :
			};
		},draw : function( list ){
			var _this = this,
				canvas = new createCanvas(list.width,list.height),
				ctx = canvas.getContext('2d');

			return canvas;
		}
	}
});