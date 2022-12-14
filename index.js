const { RTMClient } = require('@slack/rtm-api');
const check = require('./module/seletedCheckModule');
const greeting = require('./module/greeting');
const infoFood = require('./module/getMenuModule/infoFood');
const token = require('./module/token');
const square = require('./module/square');
const schedule = require('./module/scheduleModule/indexIngSchedule');
const scheduleSender = require('./module/scheduleModule/scheduleSender');
const sendAddress = require('./module/officeModule/sendAddress');

schedule.indexing();
const greetings = ['hi', 'hello', '안녕', '안녕하세요', '누구세요'];

const rtm = new RTMClient(token);
rtm.start();
const today = new Date();
const day = today.getDay();

rtm.on('message', (message) => {
  const { channel } = message;
  const { text } = message;

  if (check.getDateCheck()) {
    scheduleSender(text, rtm, channel);
  } else if (check.getCheck()) {
    sendAddress(rtm, channel, text);
  } else if (!isNaN(text)) {
    square(rtm, text, channel);
  } else if (greetings.includes(text)) {
    greeting(rtm, channel);
  } else if (text === '학사일정 조회') {
    rtm.sendMessage('안내 받을 날짜를 이야기해주세요.', channel);
    check.setDateCheck(true);
  } else if (text === '오늘 학식 뭐야') {
    infoFood.infoFoodDay(rtm, day, channel);
  } else if (text === '이번주 뭐 나와') {
    infoFood.infoFoodWeek(rtm, channel);
  } else if (text === '학과 사무실 조회') {
    rtm.sendMessage('학과 이름을 입력해주세요.', channel);
    check.setCheck(true);
  } else {
    rtm.sendMessage(" I'm alives", channel);
  }
});
