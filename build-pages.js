const fs = require('fs');
const path = require('path');

// 디렉토리 경로 설정
const notesDir = path.join(__dirname, 'notes/book');
const pagesDir = path.join(__dirname, 'pages/book');

// 파일 병합 함수
(async () => {
  try {
    const books = fs.readdirSync(notesDir); // 책 폴더 목록 (예: book1, book2)

    for (const book of books) {
      const bookDir = path.join(notesDir, book);
      if (fs.lstatSync(bookDir).isDirectory()) {
        const members = fs.readdirSync(bookDir); // 멤버 폴더 목록
        const chaptersMap = {}; // 챕터별로 내용을 저장할 객체

        // 각 멤버의 챕터 파일 읽기
        for (const member of members) {
          const memberDir = path.join(bookDir, member);
          if (fs.lstatSync(memberDir).isDirectory()) {
            const files = fs.readdirSync(memberDir).filter((file) => file.endsWith('.mdx'));
            for (const file of files) {
              const chapter = file; // 챕터 이름 (예: ch1.mdx)
              const filePath = path.join(memberDir, file);
              const content = fs.readFileSync(filePath, 'utf-8');
              if (!chaptersMap[chapter]) chaptersMap[chapter] = [];
              chaptersMap[chapter].push(`<details>
<summary>${member}</summary>
${content}
</details>`);
            }
          }
        }

        // 결과 저장 경로 생성
        const outputBookDir = path.join(pagesDir, book);
        fs.mkdirSync(outputBookDir, { recursive: true });

        // 병합된 챕터 파일 생성
        for (const [chapter, contents] of Object.entries(chaptersMap)) {
          const outputPath = path.join(outputBookDir, chapter);
          const mergedContent = contents.join('\n\n'); // 멤버별 구분자 추가
          fs.writeFileSync(outputPath, mergedContent, 'utf-8');
          console.log(`✅ ${book}/${chapter} 생성 완료!`);
        }
      }
    }
  } catch (error) {
    console.error('❌ 에러 발생:', error);
  }
})();