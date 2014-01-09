define(function(){
	return{
		checkPolyIntersect : function( poly1 , poly2 ){
			poly1 = poly1.slice(0);
			poly2 = poly2.slice(0);
			var len1 = poly1.length,
				len2 = poly2.length,
				i , j
				currentPoint, nextPoint, 
				min1, max1, min2, max2, temp ,overlap ;
				cx,cy,

				k = 0;
			
			while(k<2){
				for( i = 0; i < len1 ; i++){

					currentPoint = poly1[i];
					nextPoint = poly1[ (i+1)%len1 ];
					
					cx = currentPoint[1] - nextPoint[1];
					cy = nextPoint[0] - currentPoint[0];


					min1 = max1 = poly1[0][0] * cx + poly1[0][1] * cy;		
					for( j = 1; j < len1 ; j++ ){			
						temp = poly1[j][0] * cx + poly1[j][1] * cy;
						if(temp > max1) max1 = temp;
						else if(temp < min1) min1 = temp;
					}
					
					min2 = max2 = poly2[0][0] * cx + poly2[0][1] * cy;		
					for(j = 1; j < len2; j++){
						temp = poly2[j][0] * cx + poly2[j][1] * cy;
						if(temp > max2) max2 = temp;
						else if(temp < min2) min2 = temp;
					}
					overlap = (min1 < min2) ? min2 - max1 : min1 - max2;

					if(overlap >= 0) {
						return false;
					}
				}

				if (len2<2){
					return true;
				}
				k++;
				len1=len1^len2;
				len2=len1^len2;
				len1=len1^len2;
				var _t=poly1;
				poly1=poly2;
				poly2=_t;
			}
			return true;
		},getAngle : function( point1 , point2 ){
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
		}
	};
});
