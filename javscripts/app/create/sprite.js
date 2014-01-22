define(['create/drag'],function (Drag){
	var createCanvas = function( width , height ){
		var _canvas = document.createElement('canvas');
		_canvas.width = width;
		_canvas.height = height;
		return _canvas;
	},getImage = function(src){
		var img = new Image();
		img.src = src;
		return img
	};



	var Sprite = function(){
		var _this = this;

		_this.source = [];

	};

	Sprite.prototype = {
		push : function( imageSrc , name , width , height ){
			var _this = this;
			if( imageSrc && name ){
				_this.source.push({
					src : imageSrc,
					name : name,
					height : height,
					width : width 
				});
			}else{
				console.log( 'imageSrc||name isn\'t right' );
			}
			return _this;
		},create : function(width){
			var _this = this,
				i , sum,
				source = _this.source,
				canvas , ctx , info ,
				x = 0 ,
				y = 0 ,
				breakPoint,
				returnResult = {
					info : {},
					data : {}
				};

			info = _this.dataFormat(width);
			canvas = createCanvas( info.width , info.height );
			ctx = canvas.getContext('2d');
			breakPoint = info.warpBreak.shift();

			for( i = 0 , sum = source.length ; i < sum ; ++i ){
				ctx.drawImage(
					getImage(source[i].src),
					0,
					0,
					source[i].width,
					source[i].height,
					x ,
					y ,
					source[i].width,
					source[i].height
				);
				returnResult.data[source[i].name] = {
					x : x,
					y : y,
					width : source[i].width,
					height : source[i].height,
				};
				x += source[i].width;
				if( i == breakPoint ){
					breakPoint = info.warpBreak.shift();
					x = 0;
					y += info.eachHeight.shift();
				}
			}

			returnResult.info = {
				src : canvas.toDataURL("image/png"),
				width : info.width,
				height : info.height
			};
			return returnResult;
		},empty : function(){
			var _this = this;
			return _this;
		},dataFormat : function(maxWidth){
			var _this = this,
				source = _this.source,
				i , sum,
				width = 0,
				height = 0,
				maxHeight = 0,
				eachHeight = [];
				warpBreak = [],
				isWarpBreak = false;
			maxWidth = maxWidth || 1000;
			for( i = 0 , sum = source.length ; i < sum ; ++i ){
				width += source[i].width;
				maxHeight = maxHeight > source[i].height ? maxHeight : source[i].height;
				if( width > maxWidth ){
					isWarpBreak = true;
					height += maxHeight;
					warpBreak.push(i-1);
					eachHeight.push(maxHeight);
					maxHeight = 0;
					width = source[i].width;
				}
			}

			if( !isWarpBreak ){
				height = maxHeight;
				maxWidth = width;
			}
			return {
				height : height,
				width : maxWidth,
				warpBreak : warpBreak,
				eachHeight : eachHeight
			};
		}
	};
	return {
		init : function(){
			var $soruce = $('#soruce'),
				$code = $('#code'),
				$outputSrc = $('#output-src'),
				$dataList = $('#data-list'),
				$create = $('#create'),
				sprite = new Sprite(),
				result;
				dealFile = function(files,insertTarget){
					files = files[0];
					if( !files.length )return;
					var reader,file,
					appendHtml = function( src , file ){
						var html = $('<div class="unit" title="'+ file.name +'"><div class="plus"><span class="glyphicon glyphicon-plus"></span></div><a href="javascript:;"><img class="img" src="'+src+'"/></a></div>'),
							image;
						image = html.appendTo(insertTarget).find('img');
						$(image).load(function(){
							sprite.push(src,file.name,image.width(),image.height());
							$(this).css({
								'max-width' : '100%',
								'max-height' : '100%'
							});
						});
					};
					reader = new FileReader();
					file = files.shift();
					reader.readAsDataURL(file);
					reader.onload = function( evt ){
						appendHtml( evt.target.result , file );
						if( files.length ){
							file = files.shift();
							reader.readAsDataURL(file);
						}
					}
					return this;
				},objToStr = function( obj ){
					var key,str,arr=[];
					for( key in obj ){
						if( !(/setitem/.test(key)) ){
							if( obj[key] instanceof Object ){
								arr.push("'"+key+"':"+objToStr(obj[key]));
							}else{
								arr.push("'"+key+"':'"+obj[key]+"'");
							}
						}
							
					}
					return '{'+arr.join(',')+'}';
				};

			new Drag({
				'dragElem' : $soruce,
				DealFiles : function(){
					dealFile(arguments,$dataList);

				}
			});

			$create.on('click',function(){
				result = sprite.create(806);
				$outputSrc.attr('src',result.info.src);
				$code.val(objToStr(result.data));
			});
		}
	};
});