var flowerColors, backgroundColor, sky_top_color, sky_bottom_color, ridge_top_color, ridge_bottom_color;
var sky_space, layer_count, sky_amp, sky_zoom, sky_layer_offset, ridge_amp, ridge_step, ridge_zoom, ridge_step, sun_color, sun_glow, sun_radius;
var stars, flowers, hearts, wind, birds, tree, leaves, snow, sheep, clouds, rain, rainSound;
var isFlowers, isLove, isStars, isTree, isWind, isBirds, isForest, isLeaves, isAutumn, isSnow, isLight, isRaining, isSheep, isClouds;
var green;
var birdAni;
let mouseHasBeenClicked = false;


function attentionEveryone() {
	wind = loadSound('./sounds/wind.mp3')
	rainSound = loadSound('./sounds/rain.mp3')
	birdAni = loadAnimation('sprites/bird.png', { size: [30, 26], frames: 4 });
	birdAni.frameDelay = 200
}

function letThePoetryBegin() {
	createCanvas(windowWidth, windowHeight);

	sky_top_color = "skyblue";
	sky_bottom_color = "#FFF2AD";
	ridge_top_color = "#BCCEDD";
	ridge_bottom_color = "#7E9CB9";
	sun_color = "#FFF2AD";

	sky_space = 0.5;
	layer_count = 4;

	sky_amp = 150;
	sky_zoom = 0.0025;
	sky_layer_offset = 3;

	ridge_step = 4;
	ridge_amp = 250;
	ridge_zoom = 0.005;

	sun_glow = 0;
	sun_radius = 0;

	stars = [];
	for (var i = 0; i < 1000; i++) {
		stars[i] = new Star();
	}

	birds = [];
	for (let i = 0; i < 20; i++) {
		birds.push(new Bird(sky_space));
	}

	tree = new Tree();
	snow = new Snow();
	leaves = new Leaves();
	hearts = new Love();
	flowers = new Flowers();
	rain = new Rain();
	sheep = new Sheep();
	clouds = new Clouds();

	isFlowers = false;
	isLove = false;
	isStars = false;
	isTree = false;
	isWind = false;
	isBirds = false;
	isForest = false;
	isLeaves = false;
	isLight = false;
	isRaining = false;
	green = false;
	blue = false;
	isSheep = false;
	isClouds = false;
}

function BLUE() {
	blue = true;
}

function GREEN() {
	green = true;
}

function BLACK() {
	sky_top_color = "#000000";
	sky_bottom_color = "#105066";
	ridge_top_color = "#7F8487";
	ridge_bottom_color = "#181d21";
}

function WHITE() {
	sky_bottom_color = "#ffffff";
	ridge_top_color = "#ffffff";
	ridge_bottom_color = "#bbf2d8";
	sun_glow = 50;
	sun_radius = 50;
	sun_color = "#ffffff";

	flowerColors = {
		'redLB': 150, 'greenLB': 150, 'blueLB': 150,
		'redUB': 255, 'greenUB': 255, 'blueUB': 255
	};
}

function BRIGHT() {
	isLight = true;
}

function DARKNESS() {
	sky_top_color = "#000000";
	sky_bottom_color = "#105066";
	ridge_top_color = "#7F8487";
	ridge_bottom_color = "#3D4C5A";
}

function DARK() {
	sky_top_color = "#000000";
	sky_bottom_color = "#105066";
	ridge_top_color = "#7F8487";
	ridge_bottom_color = "#3D4C5A";
}

function FLOWER() {
	isFlowers = true;
}

function LOVE() {
	isLove = true;
}

function STARS() {
	isStars = true;
}

function NIGHT() {
	isStars = true;
	ridge_top_color = "#7F8487";
	ridge_bottom_color = "#181d21";
}

function TREES() {
	isTree = true;
}

function TREE() {
	isTree = true;
}

function FOREST() {
	isForest = true;
	ridge_top_color = "#1D6B22";
	ridge_bottom_color = "#66C16C";
	ridge_zoom = 0.1;
	ridge_amp = 400;
	ridge_step = 10;
	layer_count = 10;
	sky_space = 0.7;
}

function AUTUMN() {
	isAutumn = true;

	sky_top_color = "#b5ebe8";
	sky_bottom_color = "#f0cf97";
	ridge_top_color = "#d68222";
	ridge_bottom_color = "#526913";
	sky_space = 0.9;
	layer_count = 6;
	ridge_amp = 300;
	ridge_zoom = 0.01;
}

function LIGHT() {
	isLight = true;
}

function WIND() {
	isWind = true;
}

function BIRDS() {
	isBirds = true;
}

function LEAVES() {
	isLeaves = true;

	ridge_bottom_color = color(80, 170, 100);
	sky_space = 0.9;
	layer_count = 6;
}

function SNOW() {
	backgroundColor = 0;
	isSnow = true;
}

function SUN() {
	sun_glow = 100;
	sun_radius = 100;
}

function SUNSET() {
	sun_color = "#f54b02";
	sun_radius = 100;
	sun_glow = 50;
	sky_top_color = "#FFA500";
	sky_bottom_color = "#FF0000";
	ridge_top_color = "#ba4c6d";
	ridge_bottom_color = "#936bc2";
}

function RAINING() {
	sky_top_color = "#7E9CB9";
	sky_bottom_color = "#BCCEDD";
	ridge_top_color = "#6d7e8a";
	ridge_bottom_color = "#384147";
	isRaining = true;
}

function RAIN() {
	RAINING()
}

function FIELDS() {
	ridge_top_color = "#66C16C";
	ridge_bottom_color = "#219e36";
	ridge_zoom = 0.001;
}

function FIELD() {
	ridge_top_color = "#66C16C";
	ridge_bottom_color = "#219e36";
	ridge_zoom = 0.001;
}

function SHEEP() {
	isSheep = true;
}

function CLOUDS() {
	isClouds = true;
}

function CLOUD() {
	isClouds = true;
}

function THE_END() {
	if (isStars) {
		drawStars(stars);
	}
	else {
		sky = new Sky(
			layer_count, sky_space, ridge_step, ridge_amp,
			sky_amp, sky_zoom, sky_top_color, sky_bottom_color, sky_layer_offset,
			sun_color, sun_glow, sun_radius);
		sky.draw();
	}

	if (isLight) {
		drawingContext.shadowBlur = 20;
	}

	if (isClouds) {
		clouds.draw();
	}

	if (isLove) {
		hearts.draw(isLight);
	}

	if (isBirds) {
		drawBirds(birds)
	}

	if (green && !isForest) {
		ridge_top_color = "#1D6B22";
		ridge_bottom_color = "#66C16C";
	}
	if (blue && !isForest) {
		ridge_top_color = "#0389a8";
		ridge_bottom_color = "#7eccde";
		ridge_amp = 30;
		layer_count = 6;
	}

	mountains = new Mountains(
		isLight,
		layer_count, sky_space, ridge_step,
		ridge_amp, ridge_zoom, ridge_top_color, ridge_bottom_color);
	mountains.draw();

	if (isFlowers) {
		flowers.draw(isLight, sky_space);
	}

	if (isTree) {
		tree.draw();
	}

	if (isSheep) {
		sheep.draw();
	}

	if (isLeaves || isAutumn) {
		leaves.draw(isAutumn);
	}
	if (isSnow) {
		snow.draw();
	}
	if (isRaining) {
		rain.draw();
	}
}

function mouseClicked() {
	if (!mouseHasBeenClicked) {
		if (isWind) {
			wind.loop();
		}
		if (isRaining) {
			rainSound.loop();
		}

	} else {
		wind.stop();
		rainSound.stop();
	}
	mouseHasBeenClicked = !mouseHasBeenClicked;
}
