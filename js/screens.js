// 화면 표시 관련 함수들

function showCompletionScreen(scene) {
  // 반투명 배경
  const overlay = scene.add.graphics();
  overlay.fillStyle(0x000000, 0.7);
  overlay.fillRect(0, 0, 1280, 720);

  // 완성 메시지 배경
  const messageBox = scene.add.graphics();
  messageBox.fillStyle(0x4a90e2, 0.9);
  messageBox.lineStyle(4, 0xffffff);
  messageBox.fillRoundedRect(340, 200, 600, 320, 20);
  messageBox.strokeRoundedRect(340, 200, 600, 320, 20);

  // 축하 텍스트
  const congratsText = scene.add.text(640, 280, '🎉 축하합니다! 🎉', {
    fontSize: '40px',
    color: '#ffffff',
    fontWeight: 'bold'
  }).setOrigin(0.5);

  // 완성된 단어 표시
  const wordText = scene.add.text(640, 340, `"${targetWord}" 완성!`, {
    fontSize: '30px',
    color: '#ffff00',
    fontWeight: 'bold'
  }).setOrigin(0.5);

  // 점수 표시
  const scoreDisplay = scene.add.text(640, 400, `현재 점수: ${score}점`, {
    fontSize: '28px',
    color: '#ffffff'
  }).setOrigin(0.5);

  // 계속하기 버튼
  const continueButton = scene.add.text(640, 470, '계속하기', {
    fontSize: '24px',
    color: '#ffffff',
    backgroundColor: '#28a745',
    padding: { x: 20, y: 10 }
  }).setOrigin(0.5);

  // 버튼 인터랙션
  continueButton.setInteractive({ useHandCursor: true });
  continueButton.on('pointerdown', () => {
    overlay.destroy();
    messageBox.destroy();
    congratsText.destroy();
    wordText.destroy();
    scoreDisplay.destroy();
    continueButton.destroy();
    resetGame(scene);
  });

  continueButton.on('pointerover', () => {
    continueButton.setStyle({ backgroundColor: '#218838' });
  });

  continueButton.on('pointerout', () => {
    continueButton.setStyle({ backgroundColor: '#28a745' });
  });

  // 컨테이너로 그룹화
  completionScreen = scene.add.container(0, 0, [
    overlay, messageBox, congratsText, wordText, scoreDisplay, continueButton
  ]);
}

function showGameOverScreen(scene) {
  // 반투명 배경
  const overlay = scene.add.graphics();
  overlay.fillStyle(0x000000, 0.8);
  overlay.fillRect(0, 0, 1280, 720);

  // 게임 오버 메시지 배경
  const messageBox = scene.add.graphics();
  messageBox.fillStyle(0xff0000, 0.9); // 빨간색 배경
  messageBox.lineStyle(4, 0xffffff);
  messageBox.fillRoundedRect(340, 200, 600, 320, 20);
  messageBox.strokeRoundedRect(340, 200, 600, 320, 20);

  // 게임 오버 텍스트
  const gameOverText = scene.add.text(640, 280, '💀 게임 오버! 💀', {
    fontSize: '48px',
    color: '#ffffff',
    fontWeight: 'bold'
  }).setOrigin(0.5);

  // 최종 점수 표시
  const finalScoreText = scene.add.text(640, 340, `최종 점수: ${score}점`, {
    fontSize: '32px',
    color: '#ffff00',
    fontWeight: 'bold'
  }).setOrigin(0.5);

  // 완성한 단어 수 표시
  const wordsCountText = scene.add.text(640, 380, `완성한 단어: ${completedWords.length}개`, {
    fontSize: '24px',
    color: '#ffffff'
  }).setOrigin(0.5);

  // 다시하기 버튼
  const restartButton = scene.add.text(640, 450, '다시하기', {
    fontSize: '28px',
    color: '#ffffff',
    backgroundColor: '#dc3545',
    padding: { x: 25, y: 12 }
  }).setOrigin(0.5);

  // 버튼 인터랙션
  restartButton.setInteractive({ useHandCursor: true });
  restartButton.on('pointerdown', () => {
    overlay.destroy();
    messageBox.destroy();
    gameOverText.destroy();
    finalScoreText.destroy();
    wordsCountText.destroy();
    restartButton.destroy();
    restartGame(scene);
  });

  restartButton.on('pointerover', () => {
    restartButton.setStyle({ backgroundColor: '#c82333' });
  });

  restartButton.on('pointerout', () => {
    restartButton.setStyle({ backgroundColor: '#dc3545' });
  });

  // 컨테이너로 그룹화
  const gameOverScreen = scene.add.container(0, 0, [
    overlay, messageBox, gameOverText, finalScoreText, wordsCountText, restartButton
  ]);
}
