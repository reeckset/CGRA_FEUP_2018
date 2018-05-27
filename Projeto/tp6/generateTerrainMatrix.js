var Peak = {
	constructor(x,y,z){
		this.x = x;
		this.y = y;
		this.z = z;
    }
}


function generateMatrix(size, nrOfPeaks){
	var peaks = [];

	for(var i = 0; i < nrOfPeaks; i++){
		var peak = new Peak(floor(Math.random*size),floor(Math.random*size),floor(Math.random*size));
		peaks.push(peak);
    }

	for(var x = 0; x < size; x++){
		for(var z = 0; z < size; z++){
      getClosestPeak(x,z, peaks);
    }
}

function getClosestPeak(x,z,peaks){
  var closestPeak = peaks[0];
  for(var i = 1; i < peaks.length; i++){
    if(x+z - maxPeak.x + maxPeak.z > x+z - peaks[i].x + [peaks].z){
      closestPeak = peaks[i];
    }
  }
  return closestPeak;
}
