define(function (){
	var Drag = function( init ){
		this.dragElem = init.dragElem;
		this.onDragOver = init.onDragOver || function(){};
		this.onDragLeave = init.onDragLeave || function(){};
		this.DealFiles = init.DealFiles || function(){};

		this.init();
	};


	Drag.prototype = {
		fileFilter : [],
		init : function (){
			var _this = this;

			if( _this.dragElem ){
				_this.dragElem[0].addEventListener("dragover", function(e) { _this.DragHover(e,_this.dragElem); }, false);
				_this.dragElem[0].addEventListener("dragleave", function(e) { _this.DragHover(e,_this.dragElem); },false);
				_this.dragElem[0].addEventListener("drop", function(e) { _this.GetFiles(e,_this.dragElem); }, false);
			}
		},filter: function( files ){		//选择文件组的过滤方法
			var fileslist = [],
			sum = files.length,i;
			for( i = 0 ; i < sum ; ++i ){
				if( files[i].type.indexOf('image')>=0 ){
					fileslist.push(files[i]);
				}
			}
			return fileslist;
		},GetFiles : function( e , dragDrop ){
			this.DragHover(e,dragDrop);

			var files = e.target.files || e.dataTransfer.files;
			if (files === null || typeof files === 'undefined')return;
			
			
			this.fileFilter = this.fileFilter.concat(this.filter(files));
			this.DealFiles(this.filter(files));
			return this;
		},DragHover: function(e,dragDrop){
			e.stopPropagation();
			e.preventDefault();
			this[e.type === "dragover"? "onDragOver": "onDragLeave"].call(e.target,dragDrop);
			return this;
		}
	};

	return Drag;
});