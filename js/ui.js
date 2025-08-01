// UI 관련 함수들

// 간단한 텍스트를 만드는 함수
function createSimpleText(scene, x, y, text, varName, color, rightAlign = false, bottomAlign = false) {
  let textX = x;
  let textY = y;
  
  // 텍스트 생성
  const textObj = scene.add.text(
    textX,
    textY,
    text,
    {
      fontSize: '20px',
      color: '#ffffff',
      fontWeight: 'bold',
      stroke: '#000000',
      strokeThickness: 2
    }
  );
  
  // 정렬 설정
  if (rightAlign) {
    textObj.setOrigin(1, 0); // 오른쪽 정렬
  } else if (bottomAlign) {
    textObj.setOrigin(0, 1); // 아래쪽 정렬
  } else {
    textObj.setOrigin(0, 0); // 기본 왼쪽 위 정렬
  }
  
  // 전역 변수에 할당
  if (varName === 'scoreText') {
    scoreText = textObj;
  } else if (varName === 'collectedText') {
    collectedText = textObj;
  } else if (varName === 'completedWordsText') {
    completedWordsText = textObj;
  }
}

// 간단한 텍스트 업데이트 함수
function updateSimpleText(textObj, newText, scene, rightAlign = false, bottomAlign = false) {
  textObj.setText(newText);
}

// 버튼 배경과 하이라이트 생성 함수
function createButtonBackground(scene, x, y, width, height, color, alpha = 0.4, borderRadius = 30) {
  const bg = scene.add.graphics();
  bg.fillStyle(color, alpha);
  bg.lineStyle(2, 0xffffff, 0.7);
  bg.fillRoundedRect(x, y, width, height, borderRadius);
  bg.strokeRoundedRect(x, y, width, height, borderRadius);
  
  // 하이라이트 효과 (큰 버튼에만 적용)
  let highlight = null;
  if (width >= 300) {
    highlight = scene.add.graphics();
    highlight.fillStyle(0xffffff, 0.3);
    highlight.fillEllipse(x + width/2, y + 25, width - 50, 25);
  }
  
  return { bg, highlight };
}

// 버튼 텍스트 생성 함수
function createButtonText(scene, x, y, text, color, fontSize = '28px') {
  return scene.add.text(x, y, text, {
    fontSize: fontSize,
    color: '#ffffff',
    fontWeight: 'bold',
    stroke: color,
    strokeThickness: 2
  }).setOrigin(0.5);
}

// 버튼 호버 효과 함수
function setupButtonHover(button, bg, color, x, y, width, height, borderRadius = 30) {
  button.on('pointerover', () => {
    bg.clear();
    bg.fillStyle(color, 0.6);
    bg.lineStyle(3, 0xffffff, 0.9);
    bg.fillRoundedRect(x, y, width, height, borderRadius);
    bg.strokeRoundedRect(x, y, width, height, borderRadius);
    button.setScale(1.05);
  });

  button.on('pointerout', () => {
    bg.clear();
    bg.fillStyle(color, 0.4);
    bg.lineStyle(2, 0xffffff, 0.7);
    bg.fillRoundedRect(x, y, width, height, borderRadius);
    bg.strokeRoundedRect(x, y, width, height, borderRadius);
    button.setScale(1);
  });
}

// 버튼 클릭 이벤트 설정 함수
function setupButtonClick(button, category, scene, allUIElements) {
  button.on('pointerdown', () => {
    selectedCategory = category;
    startGame(scene, ...allUIElements);
  });
}

// 완전한 버튼 생성 함수 (배경 + 텍스트 + 호버 + 클릭)
function createCompleteButton(scene, x, y, width, height, color, text, fontSize = '28px', borderRadius = 30) {
  const { bg, highlight } = createButtonBackground(scene, x, y, width, height, color, 0.8, borderRadius);
  const button = createButtonText(scene, x + width/2, y + height/2, text, color, fontSize);
  
  button.setInteractive({ useHandCursor: true });
  setupButtonHover(button, bg, color, x, y, width, height, borderRadius);
  
  return { bg, highlight, button };
}

// 주제 선택 화면을 보여주는 함수
function showCategorySelection(scene) {
  // 반투명 배경
  const overlay = scene.add.graphics();
  overlay.fillRect(0, 0, 1280, 720); 

  // 제목 배경 (물방울 효과)
  const titleBox = scene.add.graphics();
  titleBox.fillStyle(0x4a90e2, 0.3); // 더 투명하게
  titleBox.lineStyle(3, 0xffffff, 0.6); // 더 부드러운 테두리
  titleBox.fillRoundedRect(340, 100, 600, 100, 50); // 더 둥글게
  titleBox.strokeRoundedRect(340, 100, 600, 100, 50);
  
  // 제목 하이라이트 효과
  const titleHighlight = scene.add.graphics();
  titleHighlight.fillStyle(0xffffff, 0.2);
  titleHighlight.fillEllipse(640, 130, 500, 40); // 타원형 하이라이트

  // 제목 텍스트
  const titleText = scene.add.text(640, 150, '🎮 주제를 선택하세요! 🎮', {
    fontSize: '30px',
    color: '#ffffff',
    fontWeight: 'bold',
    stroke: '#4a90e2',
    strokeThickness: 3
  }).setOrigin(0.5);

  // 과일 버튼
  const { bg: fruitBg, highlight: fruitHighlight } = createButtonBackground(scene, 440, 250, 400, 60, 0xff6b6b);
  const fruitButton = createButtonText(scene, 640, 280, '🍎 과일 (Fruits)', '#ff6b6b');

  // 동물 버튼
  const { bg: animalBg, highlight: animalHighlight } = createButtonBackground(scene, 440, 330, 400, 60, 0x4ecdc4);
  const animalButton = createButtonText(scene, 640, 360, '🐾 동물 (Animals)', '#4ecdc4');

  // 나라 버튼
  const { bg: countryBg, highlight: countryHighlight } = createButtonBackground(scene, 440, 410, 400, 60, 0x45b7d1);
  const countryButton = createButtonText(scene, 640, 440, '🌍 나라 (Countries)', '#45b7d1');

  // 게임 방법 버튼
  const { bg: helpBg, highlight: helpHighlight } = createButtonBackground(scene, 440, 490, 400, 60, 0x9b59b6);
  const helpButton = createButtonText(scene, 640, 520, '❓ 게임 방법', '#9b59b6');

  // 버튼 인터랙션 설정
  [fruitButton, animalButton, countryButton, helpButton].forEach(button => {
    button.setInteractive({ useHandCursor: true });
  });

  // 호버 효과 설정
  setupButtonHover(fruitButton, fruitBg, 0xff6b6b, 440, 250, 400, 60, 30);
  setupButtonHover(animalButton, animalBg, 0x4ecdc4, 440, 330, 400, 60, 30);
  setupButtonHover(countryButton, countryBg, 0x45b7d1, 440, 410, 400, 60, 30);
  setupButtonHover(helpButton, helpBg, 0x9b59b6, 440, 490, 400, 60, 30);

  // 버튼 클릭 이벤트 설정
  const allUIElements = [
    overlay, titleBox, titleHighlight, titleText,
    fruitBg, fruitHighlight, fruitButton,
    animalBg, animalHighlight, animalButton,
    countryBg, countryHighlight, countryButton,
    helpBg, helpHighlight, helpButton
  ];
  
  setupButtonClick(fruitButton, "fruits", scene, allUIElements);
  setupButtonClick(animalButton, "animals", scene, allUIElements);
  setupButtonClick(countryButton, "countries", scene, allUIElements);
  
  // 게임 방법 버튼 클릭 이벤트
  helpButton.on('pointerdown', () => {
    showHelpScreen(scene, allUIElements);
  });
}

// 게임 방법 화면을 보여주는 함수
function showHelpScreen(scene, allUIElements) {
  // 기존 UI 요소들 숨기기
  allUIElements.forEach(element => {
    if (element && element.setVisible) {
      element.setVisible(false);
    }
  });

  // 도움말 배경
  const helpOverlay = scene.add.graphics();
  helpOverlay.fillStyle(0x000000, 0.8);
  helpOverlay.fillRect(0, 0, 1280, 720);

  // 도움말 박스
  const helpBox = scene.add.graphics();
  helpBox.fillStyle(0x2c3e50, 0.95);
  helpBox.lineStyle(3, 0xffffff, 0.8);
  helpBox.fillRoundedRect(200, 100, 880, 520, 30);
  helpBox.strokeRoundedRect(200, 100, 880, 520, 30);

  // 제목
  const helpTitle = scene.add.text(640, 150, '🎮 게임 방법 🎮', {
    fontSize: '32px',
    color: '#ffffff',
    fontWeight: 'bold',
    stroke: '#2c3e50',
    strokeThickness: 3
  }).setOrigin(0.5);

  // 게임 방법 텍스트
  const helpText = scene.add.text(250, 220, HELP_TEXT, {
    fontSize: '18px',
    color: '#ffffff',
    fontWeight: 'normal',
    lineSpacing: 8
  });

  // 돌아가기 버튼 (오른쪽 하단)
  const { bg: backBg, button: backButton } = createCompleteButton(
    scene, 850, 540, 200, 50, '#27ae60', '← 돌아가기', '20px', 25
  );

  // 돌아가기 버튼 클릭
  backButton.on('pointerdown', () => {
    // 도움말 화면 요소들 제거
    helpOverlay.destroy();
    helpBox.destroy();
    helpTitle.destroy();
    helpText.destroy();
    backBg.destroy();
    backButton.destroy();

    // 기존 UI 요소들 다시 보이기
    allUIElements.forEach(element => {
      if (element && element.setVisible) {
        element.setVisible(true);
      }
    });
  });
}