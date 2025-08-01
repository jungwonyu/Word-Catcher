// 게임 로직 관련 함수들

// 선택된 주제로 게임을 시작하는 함수
function startGame(scene, overlay, titleBox, titleHighlight, titleText, fruitBg, fruitHighlight, fruitButton, animalBg, animalHighlight, animalButton, countryBg, countryHighlight, countryButton, helpBg, helpHighlight, helpButton) {
  // 선택 화면의 모든 요소들 제거
  overlay.destroy();
  titleBox.destroy();
  titleHighlight.destroy();
  titleText.destroy();
  fruitBg.destroy();
  fruitHighlight.destroy();
  fruitButton.destroy();
  animalBg.destroy();
  animalHighlight.destroy();
  animalButton.destroy();
  countryBg.destroy();
  countryHighlight.destroy();
  countryButton.destroy();
  helpBg.destroy();
  helpHighlight.destroy();
  helpButton.destroy();

  // 선택된 카테고리의 단어 목록 설정
  wordList = allCategories[selectedCategory];
  
  // 주제에 따른 배경 이미지 설정
  const backgroundKeys = {
    fruits: 'background-fruits',
    animals: 'background-animals',
    countries: 'background-countries'
  };
  
  // 기존 배경 완전히 제거 (모든 이미지 객체)
  scene.children.list.forEach(child => {
    if (child.texture && (child.texture.key === 'background' || 
        child.texture.key === 'background-fruits' || 
        child.texture.key === 'background-animals' || 
        child.texture.key === 'background-countries')) {
      child.destroy();
    }
  });
  
  // 새로운 배경 설정
  backgroundImage = scene.add.image(640, 360, backgroundKeys[selectedCategory]).setDisplaySize(1280, 720);
  backgroundImage.setDepth(-1); // 배경을 가장 뒤로
  
  // 목표 단어 설정
  targetWord = Phaser.Utils.Array.GetRandom(wordList);

  // 목표 이미지 표시 (텍스트 대신)
  targetImage = scene.add.image(640, 60, targetWord).setDisplaySize(100, 100);
  
  // 목표 이미지 배경 (원형)
  const imageBg = scene.add.graphics();
  imageBg.fillStyle(0xffffff, 0.9);
  imageBg.fillCircle(640, 60, 55);
  imageBg.strokeCircle(640, 60, 55);
  imageBg.setDepth(targetImage.depth - 1);
  
  // 플레이어 생성
  player = scene.physics.add.sprite(640, 670, 'basket').setCollideWorldBounds(true);
  player.setScale(0.4);

  // 떨어지는 알파벳 그룹 생성
  fallingLetters = scene.physics.add.group();

  // 점수 표시
  createSimpleText(scene, 20, 20, 'Score: 0', 'scoreText');

  // 모은 알파벳 표시 (가운데, 주제 아래)
  createSimpleText(scene, 710, 50, '모은 알파벳: ', 'collectedText', '#28a745', false, false);

  // 완성된 단어들 표시 (왼쪽 하단)
  createSimpleText(scene, 20, 700, '완성된 단어들: ', 'completedWordsText', '#9370db', false, true);

  // 선택된 주제 표시
  const categoryNames = {
    fruits: '🍎 과일',
    animals: '🐾 동물', 
    countries: '🌍 나라'
  };
  
  // scene.add.text(640, 110, `주제: ${categoryNames[selectedCategory]}`, {
  scene.add.text(500, 60, `주제: ${categoryNames[selectedCategory]}`, {
    fontSize: '18px',
    color: '#ffff00',
    fontWeight: 'bold',
    stroke: '#000000',
    strokeThickness: 2
  }).setOrigin(0.5);

  // 다시하기 버튼 (오른쪽 하단)
  const restartBg = scene.add.graphics();
  restartBg.fillStyle(0xff4757, 0.8);
  restartBg.lineStyle(2, 0xffffff, 0.9);
  restartBg.fillRoundedRect(1050, 650, 200, 50, 25);
  restartBg.strokeRoundedRect(1050, 650, 200, 50, 25);

  const restartButton = scene.add.text(1150, 675, '🔄 다시하기', {
    fontSize: '20px',
    color: '#ffffff',
    fontWeight: 'bold',
    stroke: '#ff4757',
    strokeThickness: 2
  }).setOrigin(0.5);

  restartButton.setInteractive({ useHandCursor: true });
  
  // 호버 효과
  restartButton.on('pointerover', () => {
    restartBg.clear();
    restartBg.fillStyle(0xff4757, 1.0);
    restartBg.lineStyle(3, 0xffffff, 1.0);
    restartBg.fillRoundedRect(1050, 650, 200, 50, 25);
    restartBg.strokeRoundedRect(1050, 650, 200, 50, 25);
    restartButton.setScale(1.05);
  });

  restartButton.on('pointerout', () => {
    restartBg.clear();
    restartBg.fillStyle(0xff4757, 0.8);
    restartBg.lineStyle(2, 0xffffff, 0.9);
    restartBg.fillRoundedRect(1050, 650, 200, 50, 25);
    restartBg.strokeRoundedRect(1050, 650, 200, 50, 25);
    restartButton.setScale(1);
  });

  restartButton.on('pointerdown', () => {
    restartGame(scene);
  });

  // 게임 활성화
  gameActive = true;
  gameStarted = true;

  // 일정 시간마다 알파벳 생성
  letterSpawnTimer = scene.time.addEvent({
    delay: 1000,
    callback: spawnLetter,
    callbackScope: scene,
    loop: true
  });
}

function spawnLetter() {
  // 게임이 비활성 상태이면 알파벳 생성 중단
  if (!gameActive) return;

  // 정답 글자 선택 or 랜덤 글자 선택
  let isCorrect = Phaser.Math.Between(0, 1) === 0;
  let letter;
  if (isCorrect) {
    letter = targetWord[currentIndex];
  } else {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    do {
      letter = Phaser.Utils.Array.GetRandom(alphabet.split(''));
    } while (letter === targetWord[currentIndex]);
  }

  const x = Phaser.Math.Between(50, 1230);
  const y = 0;

  // 랜덤 색상 배열
  const colors = [
    0x4a90e2, // 파란색
    0xff6b6b, // 빨간색
    0x4ecdc4, // 청록색
    0xffe66d, // 노란색
    0xff8a80, // 분홍색
    0xa8e6cf, // 민트색
    0xd4a5d4, // 연보라색
    0x95e1d3, // 라이트 시안
    0xf8c471, // 주황색
    0xb8b5ff  // 라벤더색
  ];
  
  const borderColors = [
    0x87ceeb, // 하늘색
    0xffa0a0, // 연한 빨간색
    0x7fffd4, // 아쿠아마린
    0xffff99, // 연한 노란색
    0xffb3ba, // 연한 분홍색
    0xbaffc9, // 연한 민트색
    0xe6ccff, // 연한 보라색
    0xb3f0e6, // 연한 시안
    0xffcc99, // 연한 주황색
    0xd9d9ff  // 연한 라벤더색
  ];

  // 랜덤 색상 선택
  const randomIndex = Phaser.Math.Between(0, colors.length - 1);
  const randomColor = colors[randomIndex];
  const randomBorderColor = borderColors[randomIndex];

  // 둥근 배경 그래픽 생성 (투명한 구슬 효과)
  const circle = this.add.graphics();
  circle.fillStyle(randomColor, 0.7); // 랜덤 색상, 70% 불투명도
  circle.lineStyle(2, randomBorderColor, 0.8); // 랜덤 테두리 색상, 80% 불투명도
  circle.fillCircle(0, 0, 25);
  circle.strokeCircle(0, 0, 25);
  circle.x = x;
  circle.y = y;

  // 하이라이트 효과 (구슬의 반짝임)
  const highlight = this.add.graphics();
  highlight.fillStyle(0xffffff, 0.4); // 흰색 하이라이트, 40% 불투명도
  highlight.fillEllipse(-8, -8, 12, 8); // 타원형 하이라이트
  highlight.x = x;
  highlight.y = y;

  // 그림자 효과를 위한 뒤쪽 원 (더 투명하게)
  const shadow = this.add.graphics();
  shadow.fillStyle(0x000000, 0.2); // 반투명 검은색, 20% 불투명도
  shadow.fillCircle(0, 0, 25);
  shadow.x = x + 2;
  shadow.y = y + 2;

  // 알파벳 텍스트 생성 (검정색으로 잘 보이게)
  const letterText = this.add.text(
    x,
    y,
    letter,
    { 
      fontSize: '28px',
      color: '#000000',
      fontWeight: '900',
      stroke: '#ffffff',
      strokeThickness: 3
    }
  ).setOrigin(0.5);

  // 컨테이너로 묶어서 함께 관리 (그림자, 원, 하이라이트, 텍스트 순서)
  const letterContainer = this.add.container(0, 0, [shadow, circle, highlight, letterText]);
  letterContainer.letter = letter;
  
  // fallingLetters 그룹에 추가
  fallingLetters.add(letterContainer);
}

function collectLetter(player, letterText) {
  // 게임이 비활성 상태이면 충돌 처리 중단
  if (!gameActive) return;

  const letter = letterText.letter;
  letterText.destroy();

  if (letter === targetWord[currentIndex]) {
    // 정답일 경우
    score += 10;
    collectedLetters += letter; // 모은 알파벳에 추가
    updateSimpleText(collectedText, `모은 알파벳: ${collectedLetters}`, this, false);
    currentIndex++;

    // 정답 효과: 플레이어 점프 + 크기 변화
    player.setVelocityX(0); // 플레이어 움직임 중단
    this.tweens.add({
      targets: player,
      y: player.y - 30, // 위로 점프
      duration: 150,
      ease: 'Sine.easeOut',
      yoyo: true,
      onComplete: () => {
        player.setVelocityX(0); // 애니메이션 후 움직임 중단
      }
    });

    // 단어 완성 체크
    if (currentIndex === targetWord.length) {
      // score += 200;
      updateSimpleText(scoreText, `Score: ${score}`, this);
      
      // 완성된 단어를 목록에 추가
      completedWords.push(targetWord);
      updateSimpleText(completedWordsText, `완성된 단어들: ${completedWords.join(', ')}`, this, false, true);
      
      // 게임 중단
      gameActive = false;
      letterSpawnTimer.remove(); // 알파벳 생성 타이머 중단
      player.setVelocityX(0); // 플레이어 움직임 중단
      
      this.time.delayedCall(300, () => {
        showCompletionScreen(this);
      });
    } else {
      updateSimpleText(scoreText, `Score: ${score}`, this);
    }
  } else {
    // 오답일 경우
    score -= 10;
    updateSimpleText(scoreText, `Score: ${score}`, this);

    player.setVelocityX(0); // 플레이어 움직임 중단
    this.tweens.add({
      targets: player,
      x: player.x + 20,
      duration: 100,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        player.setVelocityX(0); // 흔들림 후 움직임 중단
      }
    });
    
    // 점수가 -100 이하가 되면 게임 오버
    if (score <= -100) {
      gameActive = false;
      letterSpawnTimer.remove(); // 알파벳 생성 타이머 중단
      player.setVelocityX(0); // 플레이어 움직임 중단
      
      this.time.delayedCall(300, () => {
        showGameOverScreen(this);
      });
    }
  }
}

function resetGame(scene) {
  // 점수는 유지하고 게임 상태만 초기화
  currentIndex = 0;
  collectedLetters = ""; // 모은 알파벳 초기화
  gameActive = true; // 게임 상태 재활성화
  
  // 새로운 목표 단어 설정 (같은 카테고리에서)
  targetWord = Phaser.Utils.Array.GetRandom(wordList);
  
  // 목표 이미지 업데이트
  if (targetImage) {
    targetImage.setTexture(targetWord);
  }
  
  // 화면의 텍스트들 업데이트
  updateSimpleText(collectedText, '모은 알파벳: ', scene, false);
  
  // 떨어지는 알파벳들 제거
  fallingLetters.clear(true, true);
  
  // 알파벳 생성 타이머 재시작
  letterSpawnTimer = scene.time.addEvent({
    delay: 1000,
    callback: spawnLetter,
    callbackScope: scene,
    loop: true
  });
}

function restartGame(scene) {
  // 모든 상태를 완전히 초기화
  score = 0;
  currentIndex = 0;
  collectedLetters = "";
  completedWords = [];
  gameActive = false;
  gameStarted = false;
  selectedCategory = "";
  
  // 화면의 모든 요소들 제거
  scene.children.removeAll();
  
  // 배경 이미지 초기화
  backgroundImage = null;
  
  // 기본 배경 이미지 다시 추가
  scene.add.image(640, 360, 'background').setDisplaySize(1280, 720);
  
  // 주제 선택 화면 다시 표시
  showCategorySelection(scene);
}
