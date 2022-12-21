let button; //센서 허용을 위한 버튼
let permission = false; //허가를 위한 변수 (기본은 허가 안남)

var wave;
var button1;
var slider;
var playing = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //윈도우 사이즈로 displayWidth displayHeight가능

  if (typeof DeviceMotionEvent.requestPermission === "function") {
    // iOS 13 보다 높은 OS인 경우
    background(255, 0, 0); //붉은 배경
    button = createButton("Click to iOS Sensor"); //센서 허용을 위한 버튼
    button.mousePressed(iosAccess); //버튼누르면 iosAccess 함수로
  } else {
    // non iOS 13+ 가 아닌 다른 OS 예: iOS저버전, 안드로이드, 윈도우, 맥
    background(0, 255, 0); //녹색배경
    text("is not a ios", 100, 100); //글자로 100, 100 위치에 is not a ios 라고 씀
  }
  
  
  wave = new p5.Oscillator();
  wave.setType('sine');
  wave.freq(440);
  wave.amp(0);
  button1 = createButton('play/pause');
  button1.mousePressed(toggle);
  slider = createSlider(0, 1, 0.5, 0.1);

}

function iosAccess() {  //버튼 누르면 동작하는 함수(그냥 따라하기)
  DeviceOrientationEvent.requestPermission()
    .then((response) => {
      if (response === "granted") { //granted를 받으면
        permission = true; //허가가 true (허가남)
      }
    })
    .catch(console.error);
}


function draw() {
  if (!permission) return; //허가 안나면 리턴
  background(255, 255, 255); //흰색배경
  textSize(72); //텍스트 픽셀 크기 72
  text(rotationX, 100, 100); //텍스트 는 X회전값이고, 100 100 위치에 글자로 표기
  
  let display = touches.length + ' touches';
  text(display, 200, 200)
}


function toggle() {
  if (!playing) {
    wave.start();
    wave.amp(0.5, 1);
    playing = true;}
  else {
    wave.amp(0, 1);
    playing = false;}
}

function touchStarted() { //터치 허용 함수(p5js 문법)  
  text(touches.length, wave.freq());
  text(touches[0], wave.freq(261.6256));
  text(touches[1], wave.freq(293.6648));
  text(touches[2], wave.freq(329.6276));
  text(touches[3], wave.freq(349.2282));
  text(touches[4], wave.freq(391.9954));
  text(touches[5], wave.freq(440));
  text(touches[6], wave.freq(493.8833));
}
