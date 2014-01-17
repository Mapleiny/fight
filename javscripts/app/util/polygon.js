define(['util/math'],function (math){
	var getEdge = function(points){
		var maxY , maxX , minY , minX , _points;
		_points = points.slice(0).sort(function(a,b){
			return a.x - b.x;
		});
		minX = _points[0].x;
		maxX = _points[_points.length-1].x;

		_points = points.slice(0).sort(function(a,b){
			return a.y - b.y;
		});
		minY = _points[0].y;
		maxY = _points[_points.length-1].y;

		return {
			minX : minX,
			maxX : maxX,
			minY : minY,
			maxY : maxY
		};
	};
	var Polygon  = function(points){
		this.data = null;
		
		this.updata(points);
		this.edge = getEdge(points);
	}
	Polygon.prototype = {
		scale : 1,
		rotateDegAtPoint : function( deg , point ){
			var i , sum , x , y ,
				points = this.data,
				currentDeg ,
				z ;

			if( !point ){
				point = {x:0,y:0};
			}

			for( i = 0 , sum = points.length ; i < sum ; ++i ){

				x = points[i].x - point.x;
				y = points[i].y - point.y;
				z = Math.sqrt(x*x+y*y);

				currentDeg = math.getAngle(point,points[i]);

				if( isNaN( currentDeg ) ){
					continue;
				}
				
				currentDeg += deg;

				currentDeg = currentDeg%(2*Math.PI);
				
				points[i].x = z * Math.cos(currentDeg) + point.x;
				points[i].y = z * Math.sin(currentDeg) + point.y;

			}
			return this;
		},setScale : function(num){
			var data = this.data,
				i,sum;
			if( typeof num === 'number' ){
				for( i = 0 , sum = data.length ; i < sum ; ++i ){
					data[i].x *= num;
					data[i].y *= num;
				}
				this.scale = num;
			}
			return this;
		},getScale : function(){
			return this.scale;
		},updata : function(data){
			this.data = this.sortPoints(data);
			return this;
		},sortPoints : function(points) {
			points.sort(function(a, b) { return a.y - b.y });
			var top = points[0], bottom = points.pop();
			var leftPoints = [], rightPoints = [],
				s = (bottom.x - top.x) / (bottom.y - top.y),
				left, right;
			if (top.x < bottom.x) {
				left = top.x;
				right = bottom.x;
			} else {
				left = bottom.x;
				right = top.x;
			}
			for (var i = 1, n = points.length; i < n; i++) {
				var p = points[i]
				if (p.x <= left) leftPoints.push(p)
				else if(p.x >= right){
					rightPoints.push(p);
				}else{
					if (p.x < (p.y - top.y) * s + top.x) {
						leftPoints.push(p);
					}else{
						rightPoints.push(p);
					}
				}		
			}
			points = [].concat(top, rightPoints, bottom, leftPoints.reverse());
			return points;
		}
	};

	return Polygon;
});