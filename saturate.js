var Saturate = {
	options: {
		degreeStep: 0.1,
		alternateBlack: true
	},
	run: function() {
		var filters = "";

		function addBoxes(number){
			for (var i = 0; i < number; i++){
				var html = "";
				html += "<div class='box1'>" + 
				"<div class='box2'><div class='box3'><div class='box4'></div></div></div></div>";
				$('body').append(html);
			}

			setInterval(twistBoxes,100);
		}

		var degrees = 0;
		var j = 0;

		function twistBoxes(){
			var box1 = $(".box1");
			var box2 = $(".box2");
			var box3 = $(".box3");
			var box4 = $(".box4");
			var colorR, colorG, colorB;

			j++;

			for (var i = 0; i < box2.length; i++){
				degrees += Saturate.options.degreeStep;

				var degreeRotate = (i+1)*degrees/5

				if (Saturate.options.alternateBlack && i%2 == 0){
						colorR = colorG = colorB = 0;
				} else {
					colorR = 100;
					colorG = 30;
					colorB = Math.floor(degrees/2)%255;
				}


				var colorA = 0.2;

// "background-color: rgba(" + 100	 + "," + 30 + ","
				// + degrees/2%255 + ", 0."+ (degrees*i/5)%20 +")");
				// console.log("color r: " + colorR + " color g: " + colorG + " color b: " + colorB);

				var boxTransform = "-webkit-transform: rotate(" + degreeRotate + "deg); "
				var boxWidth = "width: " + Math.floor(600*(Math.sin((degrees))+1))%255 + "px; "
				var boxHeight = "height: " + Math.floor(600*(Math.sin((degrees))+1))%255 + "px; "
				// console.log(boxWidth)
				var colorTransform = function(r, g, b, a) {
					return "background-color: rgba(" + r + "," + g + "," + b + ", " + a + ");  -webkit-filter: " + filters + "; "
				}
					
				box1[i].setAttribute("style", boxTransform + colorTransform(colorR, colorG, colorB, colorA));
				box2[i].setAttribute("style", boxTransform);
				box3[i].setAttribute("style", colorTransform(colorR, colorG, colorB, colorA) + boxTransform);
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

		$('.speed').slider({
			value: Saturate.degreeStep,
			step: 0.01,
			max: 3, 
			min: 0.001, 
			slide: function(event, ui){
				console.log("change");
				Saturate.options.degreeStep = ui.value;
			}});
			

	}
}

Saturate.run()