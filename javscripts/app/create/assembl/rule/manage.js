define(['require','create/assembl/source/manage'],function (require,SourceManage){

	var createCanvas = function( width , height ){
		var _canvas = document.createElement('canvas');
		_canvas.width = width;
		_canvas.height = height;
		return _canvas;
	};
	var Manage = function(load){
		var _this = this;

		_this.sourceManage = new SourceManage(load['source']);
		_this.zmap = load['zmap'];
		_this.rules = load['rule'];

	};

	Manage.prototype = {
		assembl : function(){
			var _this = this,
				rules = _this.rules,
				unitAssembl = _this.unitAssembl,
				result = {},
				unit;
			result['unit'] = {};
			for( unit in rules ){
				result['unit'][unit] = {};
				for( action in rules[unit] ){
					result['unit'][unit][action] = unitAssembl.call(_this,rules[unit][action]);
				}
			}
			return result;
		},unitAssembl : function( animateList ){
			var _this = this,
				singleFrameAssembl = _this.singleFrameAssembl,
				canvas = createCanvas(10,10),
				ctx = canvas.getContext('2d'),
				frame,
				maxHeight = 0,
				maxWidth = 0,
				frameCount = 0,
				singleFrameInfo = null,
				maxLeft = -10000,
				maxRight = -10000,
				maxTop = -10000,
				maxBottom = -10000,
				eachWidth = 0,
				eachHeight = 0,
				offsetX = 0,
				offsetY = 0,
				frameInfos = {},
				rule = [];
			for( frameKey in animateList ){
				frame = animateList[frameKey];
				frameInfos[frameKey] = singleFrameInfo = singleFrameAssembl.call(_this,frame);

				maxLeft = maxLeft > singleFrameInfo.origin.x ? maxLeft : singleFrameInfo.origin.x;
				maxRight = maxRight > singleFrameInfo.width - singleFrameInfo.origin.x ? maxRight : singleFrameInfo.width - singleFrameInfo.origin.x;
				maxTop = maxTop > singleFrameInfo.origin.y ? maxTop : singleFrameInfo.origin.y;
				maxBottom = maxBottom > singleFrameInfo.height - singleFrameInfo.origin.y ? maxBottom : singleFrameInfo.height - singleFrameInfo.origin.y;
				++frameCount;
			}

			eachWidth = maxLeft + maxRight;
			eachHeight = maxTop + maxBottom;

			canvas.width = eachWidth * frameCount;
			canvas.height = eachHeight;

			frameCount = 0;
			for( frameKey in frameInfos ){
				singleFrameInfo = frameInfos[frameKey];
				offsetX = eachWidth * frameCount + (maxLeft - singleFrameInfo.origin.x);
				offsetY = maxTop - singleFrameInfo.origin.y;
				ctx.drawImage(
					singleFrameInfo.src,
					0,
					0,
					singleFrameInfo.width,
					singleFrameInfo.height,
					offsetX,
					offsetY,
					singleFrameInfo.width,
					singleFrameInfo.height
				);
				rule.push({
					x : eachWidth * frameCount,
					y : 0
				});
				++frameCount;
			}
			return {
				src : canvas,
				width : eachWidth * frameCount,
				height : eachHeight,
				data : {
					eachWidth : eachWidth,
					eachHeight : eachHeight,
					rule : rule
				}
			};
		},singleFrameAssembl : function( frame ){
			var _this = this,
				sourceManage = _this.sourceManage,
				canvas = createCanvas(500,500),
				ctx = canvas.getContext('2d'),
				zmap = _this.zmap,
				canvasWidth = 0,
				canvasHeight = 0,
				part = null,
				key = null,
				map = null,
				origin = {},
				bodyOrigin = {},
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
				offset = {},
				source = null,
				tempImgData = null,
				maxX,maxY,minX,minY,
				i,sum,
				drawData = [],
				temp;
				//keySequence = ['body','arm','cap',''];
			maxX = maxY = 0;
			minX = minY = 100000;
			for( key in frame ){
				part = frame[key];
				map = part['map'];
				// origin
				if( 'origin' in part ){
					temp = part['origin'].split(',');
					origin.x = -temp[0];
					origin.y = -temp[1];
					if( key == 'body' ){
						bodyOrigin.x = -temp[0];
						bodyOrigin.y = -temp[1];
					}
				}

				// neck
				if( 'neck' in map ){
					temp = map['neck'].split(',');
					neck.x = -temp[0];
					neck.y = -temp[1];
					if( key == 'body' ){
						bodyNeck = {
							x : -temp[0],
							y : -temp[1]
						};
					}
					if( key == 'head' ){
						headNeck = {
							x : -temp[0],
							y : -temp[1]
						};
					}
				}

				// brow
				if( 'brow' in map ){
					temp = map['brow'].split(',');
					brow.x = -temp[0];
					brow.y = -temp[1];
					if( key == 'head' ){
						headBrow = {
							x : -temp[0],
							y : -temp[1]
						};
					}
					offset.x = origin.x + headNeck.x - bodyNeck.x - headBrow.x + brow.x;
    				offset.y = origin.y + headNeck.y - bodyNeck.y - headBrow.y + brow.y;
				}

				// hand
				if( 'hand' in map ){
					temp = map['hand'].split(',');
					hand.x = -temp[0];
					hand.y = -temp[1];
					if( key == 'arm' ){
						armHand = {
							x : -temp[0],
							y : -temp[1]
						};
					}
					if( key == 'body' ){
						bodyHand = {
							x : -temp[0],
							y : -temp[1]
						};
					}
					offset.x = origin.x + hand.x + armNavel.x - armHand.x - bodyNavel.x;
    				offset.y = origin.y + hand.y + armNavel.y - armHand.y - bodyNavel.y;
				}

				// handMove
				if( 'handMove' in map ){
					temp = map['handMove'].split(',');
					handMove.x = -temp[0];
					handMove.y = -temp[1];
					if( key == 'lHand' ){
						lHandMove = {
							x : -temp[0],
							y : -temp[1]
						};
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
						armNavel = {
							x : -temp[0],
							y : -temp[1]
						};
					}
					if( key == 'body' ){
						bodyNavel = {
							x : -temp[0],
							y : -temp[1]
						};
					}
					offset.x = origin.x + navel.x - bodyNavel.x;
					offset.y = origin.y + navel.y - bodyNavel.y;
				}

				offset.x += 250;
				offset.y += 250;
				

				drawData.push({
					'group' : part.group,
					'src' : part.src,
					'offset' : {
						'x' : offset.x,
						'y' : offset.y
					},
					'zIndex' : zmap[key]
				});
			}

			drawData.sort(function (a,b){
				return b.zIndex - a.zIndex ;
			});


			for( i = 0 , sum = drawData.length ; i < sum ; ++i ){
				source = sourceManage.getCvsImage(drawData[i].group,drawData[i].src);
				offset = drawData[i].offset;

				maxX = maxX > offset.x+source.width ? maxX : offset.x+source.width;
				maxY = maxY > offset.y+source.height ? maxY : offset.y+source.height;
				minX = minX < offset.x ? minX : offset.x;
				minY = minY < offset.y ? minY : offset.y;

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
			
			canvasWidth = maxX - minX;
			canvasHeight = maxY - minY;

			bodyOrigin.x -= minX;
			bodyOrigin.y -= minY;

			tempImgData = ctx.getImageData(minX,minY,canvasWidth,canvasHeight);
			canvas.width = canvasWidth;
			canvas.height = canvasHeight;
			ctx.clearRect(canvasWidth,canvasHeight);
			ctx.putImageData(tempImgData,0,0);

			return {
				src : canvas,
				width : canvasWidth,
				height : canvasHeight,
				origin : bodyOrigin
			};
		}
	};

	return Manage;
});