var fs = require('fs'),
	config = {
		sourceDir : './source/',
		ruleDir : './rule/',
		saveDir : ''
	};
/**
 * source ID
 * part
 * group
 * action
 * @param {[type]} list [description]
 */
var Create = function( list ){
	var _this = this;

	_this.loadList = list;
};

Create.prototype = {
	source : {},
	rule : {}, 
	getFile : function( src , fn , sync ){
		if( sync ){
			return fs.readFileSync( src );
		}else{
			fs.readFile( src , function ( err , data ){
				if( err ) throw err;
				fn(data);
			});
		}
		return this;
	/**
	 * all source need
	 * @param  {Array} params 
	 *         Array[{
	 *             unitId : Number,
	 *             action : [],
	 *             source : []
	 *         }]
	 * @return {[type]}        [description]
	 */
	},createSourceAndRule : function( params ){
		var _this = this,
			sourceAndRule = {},
			i , sum;
		sourceAndRule = {
			source : _this.getSourceFile(),
			rule : _this.getRuleFile()
		};

		return sourceAndRule;
	},getSourceFile : function(){
		var _this = this,
			getFile = _this.getFile,
			loadList = _this.loadList,
			returnSource = {},
			source,
			i , sum;
		for( i = 0 , sum = loadList['source'].length ; i < sum ; ++i ){
			source = loadList['source'][i];
			if( source['part'] in returnSource['groups'] ){
				returnSource['groups'][source['part']][source['group']]
			}else{
				returnSource['groups']['part'] = {
				};
			}
			
		}

		return source;
	},getRuleFile : function(){
		var _this = this,
			getFile = _this.getFile
			loadList = _this.loadList;

	},redrect : function( route ){
		var _this = this;
	}
};
var create = new Create({
	'source' : {
		'charater' : {
			'unit0000|12324' : {
				'skill' : ['move',''],
				'cap' : '01002002',
				'coat' : '01040015',
				'glove' : '01082003',
				'pants' : '01060008',
				'shoes' : '01072006',
				'weapon' : '01312000'
			}
		}
	}
});