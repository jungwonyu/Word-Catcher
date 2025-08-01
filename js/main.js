// 메인 게임 루프 함수들

function create() {
  // JSON에서 카테고리 데이터 불러오기
  const wordsData = this.cache.json.get('words');
  allCategories = wordsData.categories;

  // 기본 배경 이미지 추가 (전역 변수로 관리)
  backgroundImage = this.add.image(640, 360, 'background').setDisplaySize(1280, 720);
  backgroundImage.setDepth(-1); // 배경을 가장 뒤로

  // 주제 선택 화면 표시
  showCategorySelection(this);

  // 키 입력
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  // 게임이 비활성 상태이면 업데이트 중단
  if (!gameActive) return;

  player.setVelocityX(0);
  if (cursors.left.isDown) player.setVelocityX(-400);
  if (cursors.right.isDown) player.setVelocityX(400);

  // 알파벳들을 직접 아래로 이동시키기
  fallingLetters.children.entries.forEach(letter => {
    letter.y += 3; // 직접 y 좌표 증가
    
    // 화면 밖으로 나간 알파벳 제거
    if (letter.y > 720) {
      letter.destroy();
    }
    
    // 플레이어와 충돌 체크 (직접 구현)
    if (Phaser.Geom.Rectangle.Overlaps(player.getBounds(), letter.getBounds())) {
      collectLetter.call(this, player, letter);
    }
  });
}

// 게임 설정
const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  physics: { default: 'arcade', arcade: { debug: false } },
  scene: { preload, create, update }
};

// 게임 시작
const game = new Phaser.Game(config);
