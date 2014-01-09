var getAngle = function( point1 , point2 ){
	var x,y,z,cosAngle,sinAngle;
	x = point2.x - point1.x;
	y = point2.y - point1.y;
	z = Math.sqrt(x*x+y*y);
	if( z === 0 ){
		return NaN;
	}
	cosAngle = Math.acos( x / z );
	sinAngle = Math.asin( y / z );

	if( sinAngle >= 0 ){
		return cosAngle;
	}else if( sinAngle < 0 ){
		return 2*Math.PI - cosAngle;
	}
};

var point = {x:2,y:0},
	points = {x:0,y:0},
	deg = 90/180*Math.PI,
	currentDeg;

x = points.x - point.x;
y = points.y - point.y;
z = Math.sqrt(x*x+y*y);

currentDeg = getAngle(point,points);
console.log(currentDeg);

currentDeg += deg;
console.log(currentDeg);

currentDeg >= 2*Math.PI ? 0 : currentDeg;

points.x = z * Math.cos(currentDeg) + point.x;
points.y = z * Math.sin(currentDeg) + point.y;

console.log(points);
console.log(Math.sqrt(3));
