// resources dir 
// 
var config = {
		resourcesDir : 'D:/yvn2_mapledump3/resources/',
		saveDir : 'C:/Users/bjyinheng/Documents/GitHub/fight/javscripts/app/create/assembl.rule/'
	},fs = require('fs');
	//myWindow = jsdom().createWindow(),
	//$ = require('jquery').create(myWindow);

fs.readFile(config.resourcesDir+'01452145.img/index.html','utf-8', function (err, data) {
	if (err) throw err;
	var trs = data.split('<table>')[1].split('</table>')[0].replace(/<tr>|<\/tr>|<th>|<td>/g,'').split('\r\n'),
		i , sum ;
	for( i = 0 , sum = trs.length ; i < sum ; ++i ){
		trs[i] = trs[i].replace(/<\/th>|<\/td>/g ,'!').split('!');
		trs[i].pop();
	}
	trs.splice(0,2);
	trs.splice(-1,1);

	var obj = {} , name
		,createObj = function( obj , name , value ){
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
				if( obj[key] instanceof Object ){
					arr.push("'"+key+"':"+objToStr(obj[key]));
				}else{
					arr.push("'"+key+"':'"+obj[key]+"'");
				}
			}
			return '{'+arr.join(',')+'}';
		}

	for( i = 0 , sum = trs.length ; i < sum ; ++i ){
		name = trs[i][0].split('.');
		createObj(obj,name,trs[i][1]);
	}


	console.log(objToStr(obj));
});