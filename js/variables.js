// 전역 변수들
let player, cursors, fallingLetters, score = 0, scoreText, targetText;
let targetWord, currentIndex = 0;
let targetImage; // 목표 이미지 객체
let wordList = []; // 선택된 주제의 단어 목록
let allCategories = {}; // 모든 카테고리 데이터
let selectedCategory = ""; // 선택된 주제
let backgroundImage; // 배경 이미지 객체
let collectedLetters = ""; // 모은 알파벳 저장
let collectedText; // 모은 알파벳 표시용 텍스트
let completionScreen; // 완성 화면
let gameActive = false; // 게임 활성 상태 (처음에는 비활성)
let gameStarted = false; // 게임 시작 여부
let letterSpawnTimer; // 알파벳 생성 타이머
let completedWords = []; // 완성된 단어들 저장
let completedWordsText; // 완성된 단어들 표시용 텍스트

// 게임 도움말 텍스트
const HELP_TEXT = 
  '📋 게임 목표:\n' +
  '   • 화면 위의 이미지에 맞는 영단어를 완성하세요!\n\n' +
  '🎯 게임 방법:\n' +
  '   • 키보드 방향키(← →)로 바구니를 움직입니다\n' +
  '   • 하늘에서 떨어지는 알파벳을 바구니로 받으세요\n' +
  '   • 순서대로 글자를 모아 단어를 완성합니다\n\n' +
  '⭐ 점수 시스템:\n' +
  '   • 정답 글자: +10점 (바구니 점프!)\n' +
  '   • 오답 글자: -10점 (바구니 흔들림)\n' +
  '   • -100점 이하 시 게임 오버\n\n' +
  '🌟 특별 기능:\n' +
  '   • 과일, 동물, 나라 주제 선택 가능\n' +
  '   • 다시하기 버튼으로 언제든 재시작';
