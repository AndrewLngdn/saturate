var Saturate = {
	degreeStep: 2,
	run: function() {
		var filters = "";

		function addBoxes(number){
			for (var i = 0; i < number; i++){
				var html = "";
				html += "<div class='box1'>" + 
				"<div class='box2'><div class='box3'><div class='box4'></div></div></div></div>";
				$('body').append(html);
			}

			setInterval(twistBoxes,1000);
		}

		var degrees = 0;
		var j = 0;

		function twistBoxes(){
			var box1 = $(".box1");
			var box2 = $(".box2");
			var box3 = $(".box3");
			var box4 = $(".box4");

			j++;

			for (var i = 0; i < box2.length; i++){
				degrees += Saturate.degreeStep;

				var degreeRotate = (i+1)*degrees/5

				var colorR = 100;
				var colorG = 30;
				var colorB = degrees/2%255 + i/2;

				var colorA = 0.2;

// "background-color: rgba(" + 100	 + "," + 30 + ","
				// + degrees/2%255 + ", 0."+ (degrees*i/5)%20 +")");
				// console.log("color r: " + colorR + " color g: " + colorG + " color b: " + colorB);

				var boxTransform = "-webkit-transform: rotate(" + degreeRotate + "deg); "
				var boxWidth = "width: " + Math.floor(600*(Math.sin((degrees))+1))%255 + "px; "
				var boxHeight = "height: " + Math.floor(600*(Math.sin((degrees))+1))%255 + "px; "
				console.log(boxWidth)
				var colorTransform = function(r, g, b, a) {
					return "background-color: rgba(" + r + "," + g + "," + b + ", " + a + ");  -webkit-filter: " + filters + "; "
				}
					
				box1[i].setAttribute("style", boxTransform + colorTransform(colorR, colorG, colorB, colorA));
				box2[i].setAttribute("style", boxTransform);
				box3[i].setAttribute("style", colorTransform(colorR, colorG, colorB, colorA));
				box4[i].setAttribute("style", boxTransform);
			}
		}

		twistBoxes();
		addBoxes(10);

		$('.saturate').click(function(){
			filters = "saturate(3)";
		});

		$('.desaturate').click(function(){
			filters = "grayscale(100%)";
		});
	}
}

Saturate.run()