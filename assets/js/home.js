var i = 0; 		
var images = [];	
var time = 3000;	
	 
images[0] = "/images/pic-1.jpg";
images[1] = "/images/pic-2.jpg";
images[2] = "/images/pic-3.jpg";

function changeImg(){
	document.am_slide.src = images[i];


	if(i < images.length - 1){
	 
	  i++; 
	} else { 
		
		i = 0;
	}

	
	setTimeout("changeImg()", time);
}

window.onload=changeImg;