var fs = require('fs');

// 파일을 비동기식 IO로 읽어 들임
fs.readFile('./package.json', 'utf8', function(err, data){
    // 읽어 들인 데이터를 출력함
    console.log(data);
});

console.log('프로젝트 폴더 안의 package.json 파일을 읽도록 요청했습니다.');
