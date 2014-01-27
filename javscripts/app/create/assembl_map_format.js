// resources dir 
// 
var config = {
		resourcesDir : 'D:/yvn2_mapledump3/resources/',
		imageSaveDir : 'C:/Users/Maple/Documents/GitHub/fight/images/',
		saveDir : 'C:/Users/Maple/Documents/GitHub/fight/javscripts/app/create/assembl/',
	},fs = require('fs'),
	Canvas = require('canvas');
	//myWindow = jsdom().createWindow(),
	//$ = require('jquery').create(myWindow);
var Sprite = function(){
	var _this = this;

	_this.source = [];

};

Sprite.prototype = {
	push : function( data ){
		var _this = this;
		_this.source.push({
			image : data.image,
			name : data.name,
			height : data.height,
			width : data.width
		});
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
		canvas = new Canvas( info.width , info.height );
		ctx = canvas.getContext('2d');
		breakPoint = info.warpBreak.shift();


		for( i = 0 , sum = source.length ; i < sum ; ++i ){
			ctx.drawImage(
				source[i].image,
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
			'name' : '',
			'srcInfo' : {
				'src' : canvas,
				'width' : info.width,
				'height' : info.height
			}
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
var createObj = function( obj , name , value ){
	//console.log(name);
	var key = name.shift();
	if( name.length ){
		if( !(key in obj) ){
			obj[key] = {};
		}
		createObj( obj[key] , name , value );
	}else{
		if( !(/img/g.test(value)) ){
			obj[key] = value;
		}else{
			obj[key] = {};

			obj[key].src = value.split('"')[1];
		}
	}
},objToStr = function( obj ){
	var key,str,arr=[];
	for( key in obj ){
		if( !(/setitem|eburster/.test(key)) ){
			if( obj[key] instanceof Object ){
				arr.push("'"+key+"':"+objToStr(obj[key]));
			}else{
				if( isNaN( +obj[key] ) ){
					arr.push("'"+key+"':'"+obj[key]+"'");
				}else{
					arr.push("'"+key+"':"+obj[key]);
				}
			}
		}
			
	}
	return '{'+arr.join(',')+'}';
},objToStr2 = function( obj ){
	var key,str,arr=[];
	for( key in obj ){
		if( obj[key] instanceof Object ){
			arr.push("'"+key+"':"+objToStr(obj[key]));
		}else{
			if( isNaN( +obj[key] ) ){
				arr.push("'"+key+"':'"+obj[key]+"'");
			}else{
				arr.push("'"+key+"':"+obj[key]);
			}
		}
	}
	return '{'+arr.join(',')+'}';
},ruleCreate = function( data , name , ruleSaveDir){
	var trs = data.split('<table>')[1].split('</table>')[0].replace(/<tr>|<\/tr>|<th>|<td>/g,'').split('\r\n'),
		i , sum ;
	for( i = 0 , sum = trs.length ; i < sum ; ++i ){
		trs[i] = trs[i].replace(/<\/th>|<\/td>/g ,'!').split('!');
		trs[i].pop();
	}
	trs.splice(0,2);
	trs.splice(-1,1);

	var obj = {} , key;

	for( i = 0 , sum = trs.length ; i < sum ; ++i ){
		key = trs[i][0].split('.');
		createObj(obj,key,trs[i][1]);
	}
	obj.info.name = name;
	saveRule(objToStr(obj),name,ruleSaveDir);
},sourceCreate = function( images , name , imageSaveDir ,sourceSaveDir){
	var sprite = new Sprite(),
		i , sum , 
		result;
	for( i = 0 , sum = images.length ; i < sum ; ++i ){
		sprite.push(images[i]);
	}
	result = sprite.create(806);
	result.info.name = name;
	//console.log(result);
	saveSource(result,imageSaveDir,sourceSaveDir);
},saveRule = function(str,name,ruleSaveDir){
	var dataStr = 'define(function(){return '+str+';});';
	if( !fs.existsSync(ruleSaveDir) ){
		fs.mkdirSync(ruleSaveDir);
	}
	fs.writeFile(ruleSaveDir+name+'.js', dataStr , function (err) {
		if (err) throw err;
		console.log('It\'s saved!');
	});
},saveSource = function(data,imageSaveDir,sourceSaveDir){
	var out = fs.createWriteStream(imageSaveDir+data.info.name+'.png'),
	stream = data.info.srcInfo.src.pngStream();

	stream.on('data', function(chunk){
		out.write(chunk);
	});

	stream.on('end', function(){
		console.log('saved png');
	});
	data.info.srcInfo.src = imageSaveDir+data.info.name+'.png';
	var dataStr = 'define(function(){return'+objToStr2(data)+';});';
	if( !fs.existsSync(sourceSaveDir) ){
		fs.mkdirSync(sourceSaveDir);
	}
	fs.writeFile(sourceSaveDir+data.info.name+'.js', dataStr , function (err) {
		if (err) throw err;
		console.log('It\'s saved!');
	});
};
var create = function( name , relativeDir ){
	var readDir = config.resourcesDir+name+'/',
		imageSaveDir = config.imageSaveDir + relativeDir,
		sourceSaveDir = config.saveDir + 'source/' + relativeDir,
		ruleSaveDir = config.saveDir + 'rule/' + relativeDir;
	// rule
	fs.readFile(readDir+'index.html','utf-8', function (err, data) {
		if (err) throw err;
		ruleCreate(data,name,ruleSaveDir);
	});
	// source
	fs.readdir(readDir+'/',function (err, files) {
		if (err) throw err;
		var i , sum , images = [],image;
		
		for( i = 0 , sum = files.length ; i < sum ; ++i ){
			if( /png/.test(files[i]) ){
				image = new Canvas.Image;
				image.src = fs.readFileSync(readDir+'/'+files[i]);
				images.push({
					image : image ,
					name : files[i],
					width : image.width,
					height : image.height
				});
			}
		}

		sourceCreate(images,name,imageSaveDir,sourceSaveDir);
	});
};

create('00002000.img','charater/');