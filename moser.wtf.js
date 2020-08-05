var string = "moser.wtf";

var colorPalettes = [
	["fff275","ff8c42","ff3c38","a23e48","6c8ead"],
	["e3e4db","cdcdcd","aea4bf","8f6593","3b252c"],
	["ff9fb2","fbdce2","0acdff","60ab9a","dedee0"],
	["5dd9c1","acfcd9","b084cc","665687","190933"],
	["3c1642","086375","1dd3b0","affc41","b2ff9e"],
	["c9f0ff","eafffd","efeff0","d5cad6","6b5e62"]
];

var colorPalette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
document.body.style.backgroundColor = '#' + colorPalette[0];

var charPaths = {
	'm': [[0, 10], [0, 0], [5, 10], [10, 0], [10, 10]],
	'o': [[0, 0], [0, 10], [10, 10], [10, 0], [0, 0]],
	's': [[10, 0], [0, 0], [0, 5], [10, 5], [10, 10], [0, 10]],
	'e': [[10, 0], [0, 0], [0, 5], [10, 5], [0, 5], [0, 10], [10, 10]],
	'r': [[10, 10], [0, 5], [10, 5], [0, 0], [0, 10]],
	'.': [[5, 10], [5, 8], [4, 9], [6, 9]],
	'w': [[0, 0], [0, 10], [5, 0], [10, 10], [10, 0]],
	't': [[0, 0], [10, 0], [5, 0], [5, 10]],
	'f': [[10, 0], [0, 0], [0, 5], [10, 5], [0, 5], [0, 10]]
}

var charCnf = {
	offset: [0, 0],
	scale: 6,
	runs: 5,
	randomness: 2,
	charWidth: 10,
	charHeight: 10,
	charSpace: 5
}
charCnf.scale = view.size._width * 0.6 / (string.length * (charCnf.charWidth + charCnf.charSpace) - charCnf.charSpace);

var wordGroup = new Group();
for(var run = 0; run < charCnf.runs; run++) {
	var charGroup = new Group();
	for(var i = 0; i < string.length; i++) {
		for(var j = 0; j < charPaths[string[i]].length; j++) {
			var char = new Path();
			for(var k = 0; k < charPaths[string[i]].length; k++) {
				char.add(new Point(
					(charCnf.offset[0] + charPaths[string[i]][k][0] 
						+ Math.random() * charCnf.randomness * 2 - charCnf.randomness 
						+ i * (charCnf.charWidth + charCnf.charSpace)
					) * charCnf.scale,
					(charCnf.offset[1] + charPaths[string[i]][k][1] 
						+ Math.random() * charCnf.randomness * 2 - charCnf.randomness
					) * charCnf.scale
				));
			}
			char.strokeColor = new Color('#' + colorPalette[run % colorPalette.length]);
			char.strokeWidth = 2;
			char.smooth({ type: 'catmull-rom', factor: 1 });
			charGroup.addChild(char);
		}
	}
	wordGroup.addChild(charGroup);
}
wordGroup.position = new Point(view.center.x, view.center.y);


// Hoomans
var hoomans = [
	{
		him: "x",
		her: "x",
		children: [
			{
				him: "x",
				her: "x",
				children: []
			},
			{
				him: "x",
				her: "x",
				children: []
			},
			{
				him: "x",
				her: "x",
				children: [
					{ her: "x" },
					{ her: "x" },
					{ her: "x" }
				]
			},
		]
	}
]

function drawHooman(conf) {
	var hooman = new Group();

	var body = new Path.Arc([-25, 60], [0, 15], [25, 60]);
	hooman.addChild(body);

	var head = new Path.Circle([0, 0], 20);
	hooman.addChild(head);

	var leftEye = new Path.Arc([-12, 0], [-7, 3], [-2, 0]);
	hooman.addChild(leftEye);

	var leftEye = new Path.Arc([12, 0], [7, 3], [2, 0]);
	hooman.addChild(leftEye);

	var mouth = new Path.Arc([-5, 12], [0, 10], [5, 12]);
	hooman.addChild(mouth);

	hooman.strokeWidth = 2;
	hooman.strokeColor = "black";
	hooman.fillColor = "white";
	return hooman;
}

function enterFamilia(hoomans) {
		console.log(hoomans);
	var familia = new Group();
	if(hoomans.him && hoomans.her) {
		var him = drawHooman(hoomans.him);
		him.position.x = -40;
		familia.addChild(him);
		var her = drawHooman(hoomans.her);
		her.position.x = 40;
		familia.addChild(her);
	} else if(hoomans.her) {
		var her = drawHooman(hoomans.her);
		familia.addChild(her);
	}
	for(var i = 0; hoomans.children && i < hoomans.children.length; i++) {
		var child = enterFamilia(hoomans.children[i]);
		child.position.y = 160;
		child.position.x = i * 200 - hoomans.children.length * 200 / 2;
		familia.addChild(child);
	}
	return familia;
}


var famCnf = {

}

/*var familia = new Group();
familia.addChild(enterFamilia(hoomans[0]));
familia.position = view.center;
*/