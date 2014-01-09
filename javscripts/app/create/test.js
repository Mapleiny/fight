define(['create/drag','core/animateObj','create/canvas','util/object'],function (Drag,AnimateObj,CanvasManage,object){

	var CanvasInfo = function(width,height){
		this.name = '';
		this.width = width;
		this.height = height;
		this.soruce = {};
	};
	CanvasInfo.prototype = {
		getSoruce : function(){
			var temp = [],
				_soruce = this.soruce,
				key;
			for( key in _soruce ){
				temp.push(_soruce[key].drawData());
			}

			return temp.sort(function(a,b){
				return a.zIndex > b.zIndex;
			});
		},updata : function( index , key , value ){
			var _this = this,
				_soruce = this.soruce[index];
			if( key in _soruce ){
				_soruce[key] = value;
			}
			if( key in _soruce.data ){
				_soruce.data[key] = value;
			}
		}
	}

	var CvsManage = function(elem){
		CanvasManage.call(this,elem);

		this.canvasList = {};
		this.cnavasIndex = 0;
		this.current = 0;
	};


	object.extend( CvsManage , CanvasManage );


	CvsManage.prototype.addNewCanvas = function( width , height ){
		var _this = this;
		width = width || _this.canvasList[_this.current].width;
		height = height || _this.canvasList[_this.current].height;
		_this.resetCanvas( width , height );

		_this.current = _this.cnavasIndex++;
		_this.canvasList[_this.current] = new CanvasInfo( width , height);
		return _this.current;
	};

	/**
	 * 添加新的图片资源到当前画布
	 * @param  {[type]} id   资源id
	 * @param  {[type]} src  图片
	 * @param  {[type]} data 图片信息参数
	 * @return  this         当前对象
	 */
	CvsManage.prototype.insertToCvs = function( id , src , data ){
		var _this = this,
			image = new Image();
		image.src = src;

		_this.canvasList[_this.current].soruce[id] = new AnimateObj({
			'posX' : 0, // 替代 destX 来改变位置
			'posY' : 0, // 替代 destY 来改变位置
			'data' : {
				'image' : image,
				'sourceX' : 0,
				'sourceY' : 0,
				'sourceWidth' : data.width,
				'sourceHeight' : data.height,
				'destX' : 0, // 封装不通过该属性改变位置
				'destY' : 0, // 封装不通过该属性改变位置
				'destWidth' : data.width,
				'destHeight' : data.height
			}
		});


		_this.updateCanvas();
		return this;
	};

	CvsManage.prototype.removeFromCvs = function( id ){
		var _this = this;
		delete _this.canvasList[_this.current].soruce[id];

		return this;
	};

	CvsManage.prototype.getCurrentSoruceInfo = function(id){
		return this.canvasList[this.current].soruce[id];
	};

	CvsManage.prototype.getThumb = function(){
		return {
			'id' : this.current,
			'src' : this.getThumbnail()
		}
	};

	CvsManage.prototype.getCanvasInfo = function(){
		var _this = this;
		return _this.canvasList[_this.current];
	};

	CvsManage.prototype.updateCanvas = function(){
		var _this = this;
		_this.setSoruce(_this.canvasList[_this.current].getSoruce()).draw();
		return this;
	};


	CvsManage.prototype.updateSoruce = function( index , key , value ){
		var _this = this;
		_this.canvasList[_this.current].updata( index , key , value );
		return this;
	};

	CvsManage.prototype.setCurrent = function( index ){
		var _this = this;

		_this.current = index;
		return this;
	};

	CvsManage.prototype.getCurrent = function(){
		var _this = this;

		return _this.current;
	};

	CvsManage.prototype.setCanvasData = function( init ){
		var _this = this,
			key , 
			keyList = {'name':null,'width':null,'height':null},
			currentCanvas = _this.canvasList[_this.current];
		for( key in keyList ){
			if( key in init ){
				currentCanvas[key] = init[key];
			}
		}
		_this.setAttr(currentCanvas['width'],currentCanvas['height']);
		return this;
	};



	/**
	 * 资源文件、DOM节点处理
	 */
	var SoruceManage = function(init){
		this.cvsManage = new CvsManage(init.canvas);
		this.thumbnail = init.thumbnail;
		this.insertTarget = init.insertTarget;
		this.selectedSoruce = init.selectedSoruce;

		this.selContainerList = {};
		this.crtSelContainer = 0;

		this.soruceIndex = 0;

		this.currentSoruce = 0;

		this.currentCanvas = 0;

		this.ThumbnailList = {};


		this.animate = null;


		this.createNewCanvas(300,200);

	};

	SoruceManage.prototype = {
		addSoruceFile : function(files){
			if( !files.length )return;
			var _this = this,
			reader,file,
			appendHtml = function( src , file ){
				var html = $('<div class="unit" title="'+ file.name +'"><div class="plus"><span class="glyphicon glyphicon-plus"></span></div><a href="javascript:;"><img class="img" src="'+src+'"/></a></div>'),
					image;
				image = html.appendTo(_this.insertTarget).find('img');
				$(image).load(function(){
					html.data({
						'name' : file.name,
						'width' : image.width(),
						'height' : image.height()
					});
					$(this).css({
						'max-width' : '100%',
						'max-height' : '100%'
					});
				});
			};
			if( _this.removeCheck ){
				_this.dragDrop.empty();
				_this.removeCheck = false;
			}
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
		},showInfo : function( data , elem , keyList , node , attr ){
			var key,i,sum,nodeattr = node+'['+attr+'="',make = 'html';
			if( node == 'input' || node == 'area' ){
				make = 'val';
			}
			for( i = 0 , sum = keyList.length ; i < sum ; ++i ){
				key = keyList[i];
				elem.find(nodeattr+key+'"]')[make](data[key]||'');
			}
		},insertSoruce : function( src , data ){
			var _this = this,
				insertHtml = $('<div class="unit active"><a href="javascript:;"><img class="img" src="'+src+'"/></a></div>');
			insertHtml.data({
				'id' : _this.soruceIndex,
				'name' : data.name,
				'width' : data.width,
				'height' : data.height
			}).appendTo(_this.selContainerList[_this.crtSelContainer]).find('.img').css({
				'max-width' : '100%',
				'max-height' : '100%'
			});

			insertHtml.siblings('.active').removeClass('active');

			_this.cvsManage.insertToCvs( _this.soruceIndex , src , data );

			_this.updataThumbnail()
				.setCurrentSoruce(_this.soruceIndex);

			++_this.soruceIndex;

			return this;
		},removeSoruce : function(){
			var _this = this;
			_this.cvsManage.removeFromCvs(_this.currentSoruce);
			return this;
		},getSoruceInfo : function( id ){
			var _this = this,
				temp = {};

			temp = _this.cvsManage.getCurrentSoruceInfo(id);

			if( temp ){
				return {
					'posX' : temp.posX,
					'posY' : temp.posY,
					'sourceX' : temp.data.sourceX,
					'sourceY' : temp.data.sourceY,
					'sourceWidth' : temp.data.sourceWidth,
					'sourceHeight' : temp.data.sourceHeight,
					'destWidth' : temp.data.destWidth,
					'destHeight' : temp.data.destHeight,
					'zIndex' : temp.zIndex
				};
			}else{
				return {};
			}
		},showSoruceInfo : function( elem ){
			var data = this.getSoruceInfo(this.currentSoruce);
			this.showInfo( data , elem , ['posX','posY','sourceX','sourceY','sourceWidth','sourceHeight','destWidth','destHeight','zIndex'] , 'input' , 'name' );
			return this;
		},showSoruceFileInfo : function( data , elem ){
			this.showInfo( data , elem , ['name','width','height'] , 'span' , 'role' );
			return this;
		},showCanvasInfo : function( elem ){
			var _this = this;
			data = _this.cvsManage.getCanvasInfo();
			_this.showInfo( data , elem , ['name','width','height'] , 'input' , 'name' );
			return this;
		},insertThumbnail : function(){
			var _this = this,
				data = _this.cvsManage.getThumb(),
				insertHtml = $('<div class="unit active"><a href="javascript:;"><img class="img" src="'+data.src+'"/></a></div>');
			insertHtml.data({
				'id' : data.id
			}).appendTo(_this.thumbnail).find('.img').css({
				'max-width' : '100%',
				'max-height' : '100%'
			});

			insertHtml.siblings('.active').removeClass('active');

			_this.ThumbnailList[data.id] = insertHtml.find('.img');

			return this;
		},updataThumbnail : function(){
			var _this = this,
				data = this.cvsManage.getThumb();

			_this.ThumbnailList[data.id].attr('src',data.src);
			return this;
		},setCurrentSoruce:function(id){
			this.currentSoruce = id;
			return this;
		},setSoruceData : function(key,value){
			var _this = this;

			_this.cvsManage.updateSoruce(_this.currentSoruce , key , value);

			return this;
		},setSoruce : function(){

		},createNewCanvas : function(width,height){
			var _this = this,
				id = _this.cvsManage.addNewCanvas(width,height);

			_this.crtSelContainer = id;

			_this.selContainerList[id] = $('<div data-id="'+id+'" class="on"></div>').appendTo(_this.selectedSoruce);

			_this.insertThumbnail();

			return this;
		},setCanvas : function( key , value ){
			var _this = this,
				init = {};
			init[key] = value;
			_this.cvsManage.setCanvasData(init);
			return this;
		},setCurrentCanvas : function(index){
			var _this = this;
			_this.crtSelContainer = index;
			_this.cvsManage.setCurrent(index);
			return this;
		},showSoruceList : function(){
			var _this = this;
			_this.selContainerList[_this.crtSelContainer].addClass('on').siblings('.on').removeClass('on'); 
			return this;
		},updateCanvas : function(){
			this.cvsManage.updateCanvas();
			return this;
		},beginAnimate : function( interval , list ){
			var _this = this
				count = 0,
				ids = list.slice(0),
				current = ids.shift();

			interval = interval < 0 ? 0 : interval;

			_this.currentCanvas = _this.cvsManage.getCurrent();

			_this.animate = setInterval(function(){
				_this.setCurrentCanvas(current).updateCanvas();
				++count;
				
				if( count == interval ){
					count = 0;
					current = ids.shift();
					if( ids.length == 0 ){
						ids = list.slice(0);
					}
				}
			},1000/60);
			return this;
		},endAnimate : function(){
			var _this = this;

			clearInterval(_this.animate);

			_this.setCurrentCanvas(_this.currentCanvas)
				.updateCanvas();

			return this;
		},compose : function( init ){
			var _this = this,
				thumbnails = init.thumbnails,
				i , sum , canvas , ctx ,data = [];
			sum = thumbnails.length;
			canvas = document.createElement('canvas');
			canvas.width = init.width * sum;
			canvas.height = init.height;
			ctx = canvas.getContext('2d');
			for( i = 0 ; i < sum ; ++i ){
				ctx.drawImage(thumbnails[i].image,0,0,thumbnails[i].width,thumbnails[i].height,i*init.width,0,thumbnails[i].width,thumbnails[i].height);

				data.push({
					sourceX : 0,
					sourceY : 0,
					sourceWidth : thumbnails[i].width,
					sourceHeight : thumbnails[i].height,
					destX : i*init.width,
					destY : 0,
					destWidth : thumbnails[i].width,
					destHeight : thumbnails[i].height
				});
			}

			return {
				src : canvas.toDataURL("image/png"),
				data : data
			}
		}
	};
	return {
		init : function(){
			var list = $('#soruce'),
				dataList = $('#data-list'),
				selectedSoruce = $('#selected-soruce'),
				soruceInfo = $('#soruce-info'),
				canvas = $('#canvas'),
				canvasListData = $('#canvas-list-data'),
				soruceCvsInfo = $('#soruce-cvs-info'),
				canvasInfo = $('#canvas-info'),
				addCanvasBtn = $('#add-canvas'),
				deleteSoruceBtn = $('#delete-soruce'),
				animateCanvasBtn = $('#animate-canvas'),
				intervalData = $('#interval'),
				compose = $('#compose'),
				composeShow = $('#composeShow');


			var showCompose = function( src , data ){
				var code = [],
					temp = [],
					i ,sum , key;

				for( i = 0 , sum = data.length ; i < sum ; ++i ){
					temp = [];
					for( key in data[i] ){
						temp.push(key+':'+data[i][key]);
					}
					code.push('{'+ temp.join(',') +'}');
				}

				composeShow.addClass('open');
				composeShow.find('img').attr({
					'src' : src,
					'max-width' : '100%',
					'max-height' : '100%'
				});

				composeShow.find('textarea').val('['+code.join()+']');
			};

			composeShow.on('click','.close',function(){
				composeShow.removeClass('open');
			});

			var soruceManage = new SoruceManage({
				'canvas' : canvas,
				'insertTarget' : dataList,
				'thumbnail' : canvasListData,
				'selectedSoruce' : selectedSoruce
			});

			new Drag({
				'dragElem' : list,
				DealFiles : function(){
					soruceManage.addSoruceFile.apply(soruceManage,arguments);
				}
			});

			// 选择添加资源
			dataList.on('click','.unit',function(){
				var data = $(this).data();
				soruceManage.insertSoruce($(this).find('img')[0].src,data)
					.showSoruceFileInfo(data,soruceInfo)
					.showSoruceInfo(soruceCvsInfo);
			});



			// 选择已添加资源
			selectedSoruce.on('click','.unit',function(){
				var $this = $(this),
				data = $this.data();
				selectedSoruce.find('.unit.active').removeClass('active');
				$this.addClass('active');
				soruceManage.showSoruceFileInfo(data,soruceInfo)
					.setCurrentSoruce(data.id)
					.showSoruceInfo(soruceCvsInfo)
					.updataThumbnail();
			});

			// 删除已添加资源
			deleteSoruceBtn.on('click',function(){
				var current = selectedSoruce.find('.unit.active'),
					data = {};
				if( !current.length ){
					return;
				}
				if( current.prev().length ){
					data = current.prev().addClass('active').data();
				}else if( current.next().length ){
					data = current.next().addClass('active').data();
				}

				current.remove();

				soruceManage.removeSoruce()
					.updateCanvas()
					.updataThumbnail();

				
					soruceManage.setCurrentSoruce(data.id)
						.showSoruceFileInfo(data,soruceInfo)
						.showSoruceInfo(soruceCvsInfo);
				
			});

			// 添加新画布
			addCanvasBtn.on('click',function(){
				soruceManage.createNewCanvas()
					.showCanvasInfo( canvasInfo )
					.showSoruceList();

			});


			// 选择画布
			canvasListData.on('click','.unit',function(){
				var $this = $(this),
				data = $this.data();
				$this.addClass('active').siblings('.active').removeClass('active');
				soruceManage.setCurrentCanvas(data.id)
					.updateCanvas()
					.showCanvasInfo( canvasInfo )
					.showSoruceList();
			});

			// 连续显示画布
			animateCanvasBtn.on('click',function(){
				var list = [];
				if( animateCanvasBtn.data('toggle') == 'off' ){
					canvasListData.find('.unit').each(function(){
						list.push($(this).data('id'));
					});

					soruceManage.beginAnimate(+intervalData.val(),list);
					animateCanvasBtn.html('停止');
					animateCanvasBtn.data('toggle','on');
				}else{
					soruceManage.endAnimate();
					animateCanvasBtn.html('连续播放');
					animateCanvasBtn.data('toggle','off');
				}
					
			});


			var UP = 38,
				RIGHT = 39,
				DOWN = 40,
				LEFT = 37;
			/**
			 * 设置单位的各个属性
			 * @param  {[type]} event [description]
			 * @return {[type]}       [description]
			 */
			soruceCvsInfo.on('keyup','input',function(event){
				soruceManage.setSoruceData(event.target.name,+event.target.value)
						.updateCanvas();
			});

			soruceCvsInfo.on('mouseenter','input',function(event){
				$(this).focus();
			});


			soruceCvsInfo[0].addEventListener('mousewheel',function(event){
				var shift = event.wheelDelta > 0 ? 1 : -1;
				soruceManage.setSoruceData(event.target.name,+event.target.value+shift)
					.updateCanvas();
			},false);

			/**
			 * 画布的设置
			 */
			canvasInfo.on('keyup','input',function(event){
				soruceManage.setCanvas(event.target.name,+event.target.value)
						.updateCanvas();
			});

			canvasInfo.on('mouseenter','input',function(){
				$(this).focus();
			});

			canvasInfo[0].addEventListener('mousewheel',function(event){
				var shift = event.wheelDelta > 0 ? 1 : -1;
				soruceManage.setCanvas(event.target.name,+event.target.value+shift)
					.updateCanvas();
			},false);



			compose.on('click',function(){
				var height = 0,
					width = 0,
					thumbnails = [],
					result; 
				canvasListData.find('.unit .img').each(function(){
					var $this = $(this),
						image = new Image(),
						curheight,
						curwidth;
					image.src = $this[0].src;
					curheight = image.height;
					curwidth = image.width;
					height = height > curheight ? height : curheight;
					width = width > curwidth ? width : curwidth;
					thumbnails.push({
						image : $this[0],
						height : curheight,
						width : curwidth
					});
				});
				result = soruceManage.compose({
					height : height,
					width : width,
					thumbnails : thumbnails
				});

				showCompose(result.src,result.data);

			});




			$(document).on('click','.dropdown-toggle',function(){
				var parent = $(this).parent();
				if( parent.hasClass('open') ){
					parent.removeClass('open');
				}else{
					parent.addClass('open');
				}
			});

			$(document).on('click','.dropdown-menu>li>a',function(){
				$(this).parents('.btn-group').removeClass('open');
			});
		}
	};
});