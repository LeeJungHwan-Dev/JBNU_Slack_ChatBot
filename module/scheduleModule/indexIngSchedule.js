const scheduleList = {};
// key, value로 구성된 스케줄 리스트

const pattern = /^([1-9]|1[012])\/([1-9]|[12][0-9]|3[0-1])$/;

function shortDate(date, schedule) {
  // 단일 날짜에 대한 key value 저장 함수입니다.
  scheduleList[date.toString()] = schedule;
}

function longDate(date, schedule) {
  // 날짜 범위를 계산하여 인덱싱 및 저장 함수입니다.
  const firstDate = new Date(date[0]);
  const lastDate = new Date(date[2]);

  while (true) {
    scheduleList[`${firstDate.getMonth() + 1}/${firstDate.getDate()}`] =
      schedule;
    firstDate.setDate(firstDate.getDate() + 1);

    if (
      firstDate.getMonth() + 1 === lastDate.getMonth() + 1 &&
      firstDate.getDate() === lastDate.getDate()
    ) {
      scheduleList[`${firstDate.getMonth() + 1}/${firstDate.getDate()}`] =
        schedule;
      break;
    }
  }
}

function checkDate(dateList) {
  // 날짜 형식이 올바른지 검사하고 저장 함수로 넘겨주는 체크 함수입니다.
  for (let i = 0; i <= dateList.length - 1; i += 1) {
    const schedule = dateList[i].split(':');
    const date = dateList[i].split(' ');

    if (pattern.test(date[0]) && pattern.test(date[2])) {
      longDate(date, schedule[1].trim());
    } else if (pattern.test(date[0])) {
      shortDate(date[0], schedule[1].trim());
    }
  }
}

const indexing = function () {
  const fs = require('fs');

  fs.readFile('module/haksa.txt', 'utf8', (err, date) => {
    if (err) {
      console.error(err);
    }

    checkDate(date.split('\n'));
  });
};

module.exports.indexing = indexing;
module.exports.scheduleList = scheduleList;
