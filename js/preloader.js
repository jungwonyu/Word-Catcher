// 에셋 로딩 관련 함수들
function preload() {
  this.load.image('background', 'assets/background.jpg'); // 기본 배경 이미지
  this.load.image('background-fruits', 'assets/background-fruits.jpg'); // 과일 배경
  this.load.image('background-animals', 'assets/background-animals.jpg'); // 동물 배경
  this.load.image('background-countries', 'assets/background-countries.jpg'); // 나라 배경
  this.load.image('basket', 'assets/basket.png'); // 플레이어 이미지
  this.load.json('words', 'data/words.json'); // 단어 목록 JSON 파일 로드
  
  // 과일 이미지들
  this.load.image('APPLE', 'assets/fruits/apple.png');
  this.load.image('MANGO', 'assets/fruits/mango.jpg');
  this.load.image('ORANGE', 'assets/fruits/orange.png');
  this.load.image('BANANA', 'assets/fruits/banana.jpg');
  
  // 동물 이미지들
  this.load.image('TIGER', 'assets/animals/tiger.jpg');
  this.load.image('LION', 'assets/animals/lion.jpg');
  this.load.image('ELEPHANT', 'assets/animals/elephant.jpg');
  this.load.image('MONKEY', 'assets/animals/monkey.jpg');

  // 나라 깃발 이미지들
  this.load.image('KOREA', 'assets/countries/korea.jpg');
  this.load.image('JAPAN', 'assets/countries/japan.jpg');
  this.load.image('CHINA', 'assets/countries/china.jpg');
  this.load.image('AMERICA', 'assets/countries/america.jpg');
}
