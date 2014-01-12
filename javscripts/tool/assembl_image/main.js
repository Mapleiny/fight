require.config({
    baseUrl: 'javscripts/app',
     paths: {
        lib: '../lib',
        jQuery : '../lib/jquery/jquery-2.0.min',
    },urlArgs: "bust=" + (new Date()).getTime()
});


require(['create/test','jQuery'],function (test){
    //console.log(test);
    test.init();
 //    var data = {
	// 	model : ['m1','m1','m1','m2'],
	// 	color : ['c1','c1','c2','c2'],
	// 	huo : ['h1','h2','h2','h2'],
	// 	price : ['p1','p2','p3','p4'],
	// };

	// var insetHTML = function(key,data){
	// 	var elem = $('#'+key),
	// 		tempHTML = []
	// 		temp = {};
	// 	for( i = 0 , sum = data.length ; i < sum ; ++i ){
	// 		if( !( data[i] in temp ) ){
	// 			tempHTML.push('<div class="choose" role="'+key+'">'+ data[i] +'</div>');
	// 			temp[data[i]] = {};
	// 		}
			
	// 	}
	// 	elem.html(tempHTML.join(""));
	// };
	// var key;
	// var dic = {};
	// for( key in data ){
	//  	insetHTML(key,data[key]);
	//  	dic[key] = {};
	//  	var index = 0;
	//  	for( i = 0 , sum = data[key].length ; i < sum ; ++i ){
	//  		if( !( data[key][i] in dic[key] ) ){
	//  			dic[key][data[key][i]] = index;
	//  			index++;
	//  		}
	 		
	//  	}
	// }

	// var findIndex = function( key , value ){
	// 	var dataValue = data[key],
	// 		i , sum , temp = [];
	// 	for( i = 0 , sum = dataValue.length ; i < sum ; ++i ){
	// 		if( dataValue[i] == value ){
	// 			temp.push(i);
	// 		}
	// 	}

	// 	return temp;
	// };

	// var cheak = function( checkedList ){
	// 	var key , indexList = {} , adjust = [] , temp , i , all = 0;
	// 	for( key in checkedList ){
	// 		all++;
	// 	}
	// 	for( key in checkedList ){
	// 		temp = findIndex(key,checkedList[key]);

	// 		for( i = 0 , sum = temp.length ; i < sum ; ++i ){
	// 			if( !(temp[i] in indexList) ){
	// 				indexList[temp[i]] = 1;
	// 			}else{
	// 				indexList[temp[i]] += 1;
	// 			}
	// 			if( all === indexList[temp[i]] ){
	// 				adjust.push(temp[i]);
	// 			}
	// 		}
	// 	}
	// 	return adjust;
	// };

   

	// var setOn = function(elem){
	// 	elem.addClass('on');
	// };
	// var removeOn = function(elem){
	// 	elem.removeClass('on');
	// };

	// var setOff = function(elem){
	// 	elem.addClass('off');
	// };
	// var removeOff = function(elem){
	// 	elem.removeClass('off');
	// };

	// var choose = {};

	// var each =  $('#list').find('li>div');

	// $('#list').on('click','.choose',function(event){
	// 	var $this = $(this);
	// 	if( choose[$this.attr('role')] == $this.text() ){
	// 		delete choose[$this.attr('role')];
	// 		removeOn($this);
	// 	}else{
	// 		choose[$this.attr('role')] = $this.text();
	// 		$this.parent().find('.choose').removeClass('on');
	// 		setOn($this);
	// 	}

	// 	var lightList = cheak(choose);

	// 	for( key in data ){
	// 		for( i = 0 , sum = data[key].length ; i < sum ; ++i ){
	// 			if( !$('#'+key).find('div').eq(i).hasClass('on') ){
	// 				$('#'+key).find('div').eq(i).addClass('off');
	// 			}
	// 		}
	// 		if( lightList.length == 0 ){
	// 			$('#'+key).find('div').removeClass('off');
	// 		}
	// 		for( i = 0 , sum = lightList.length ; i < sum ; ++i ){
				
	// 			$('#'+key).find('div').eq(dic[key][data[key][lightList[i]]]).removeClass('off');
	// 			//console.log("$(#"+key+").find('div').eq("+dic[data[key][lightList[i]]]+").removeClass('off');");
	// 		}
	// 	}

 //    });

});



// 	// var formate = {},
// 	// 	formate1 = {},
// 	// 	priceList = [],
// 	// 	keylist = [],
// 	// 	key;
// 	// for( key in data ){
// 	// 	keylist.push( key );
// 	// 	insetHTML(key,data[key]);
// 	// }

// 	// for( i = 0 , sum = data[keylist[0]].length ; i < sum ; ++i ){
// 	// 	priceList[i] = [];
// 	// 	for( key in data ){
// 	// 		priceList[i].push(data[key][i]);
// 	// 	}
// 	// }

// 	// var make = function(value,obj){
// 	// 	var temp;
// 	// 	if( value.length ){
// 	// 		temp = value.shift();
// 	// 		if(!(temp in obj) ){
// 	// 			obj[temp] = {};
// 	// 		}
// 	// 		make(value,obj[temp]);
// 	// 	}else{
// 	// 		return ;
// 	// 	}
// 	// }
// 	// for( i = 0 , sum = priceList.length ; i < sum ; ++i ){
// 	// 	make( priceList[i] , formate );
// 	// };

// 	// delete data.price;

// 	// for( key in data ){
// 	// 	keylist.push( key );
// 	// }

// 	// for( i = 0 , sum = data[keylist[0]].length ; i < sum ; ++i ){
// 	// 	priceList[i] = [];
// 	// 	for( key in data ){
// 	// 		priceList[i].push(data[key][i]);
// 	// 	}
// 	// }

// 	// var make = function(value,obj){
// 	// 	var temp;
// 	// 	if( value.length ){
// 	// 		temp = value.pop();
// 	// 		if(!(temp in obj) ){
// 	// 			obj[temp] = {};
// 	// 		}
// 	// 		make(value,obj[temp]);
// 	// 	}else{
// 	// 		return ;
// 	// 	}
// 	// }
// 	// for( i = 0 , sum = priceList.length ; i < sum ; ++i ){
// 	// 	make( priceList[i] , formate1 );
// 	// };

// // formate
// // {
// // 	m1: {
// // 		c1: {
// // 			h1: [Object],
// // 			h2: [Object]
// // 		},
// // 		c2: {
// // 			h2: [Object]
// // 		}
// // 	},
// // 	m2: {
// // 		c2: {
// // 			h2: [Object]
// // 		}
// // 	}
// // }
// // 
// // 
// // 
// // 
// // formate1
// // {
// // 	h1: {
// // 		c1: {
// // 			m1: {}
// // 		}
// // 	},
// // 	h2: {
// // 		c1: {
// // 			m1: {}
// // 		},
// // 		c2: {
// // 			m1: {},
// // 			m2: {}
// // 		}
// // 	}
// // }

// <div>
// 	<ul id="list">
// 		<li>
// 			<h6>model</h6>
// 			<div id="model">
// 			</div>
// 		</li>
// 		<li>
// 			<h6>color</h6>
// 			<div id="color"></div>
// 		</li>
// 		<li>
// 			<h6>huo</h6>
// 			<div id="huo"></div>
// 		</li>
// 		<li>
// 			<h6>price</h6>
// 			<div id="price"></div>
// 		</li>
// 	</ul>
// </div>