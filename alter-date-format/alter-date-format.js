/*

* 12시간제로 표현된 currentTime 으로 현재시간이 들어온다.
* N 초후의 시간을 24시간제로 표시


1. AM, PM 구분, split(' ')을 이용
2. PM일경우 hour 에 12를 더해줌, AM일경우 그대로 두지만, 12일 경우 0으로 변환
3. 더해질 N초를 계산
    * 60초 -> 1분
    * 60분 -> 1시간
    * 24시간 -> 00시
4. 각 단위시간에 더해줌
5. 각 시간단위의 기준에 초과될 경우 그다음 단위에 더해줌
6. 문자열로 parsing

*/


// 시, 분, 초 단위의 시간이 들어올때 두자리의 문자열로 변환해주는 makeTimeFormat 함수
function makeTimeFormat(time) {
    return time.toString().length === 1 ? '0' + time : time;
}

// 12시간제로 표현된 currentTime 을 입력받아 N 초후의 24시간제로 변환하는 parseTime 함수
function parseTime(currentTime, N) {
    // 공백을 기준으로 분할
    // ampm 에는 문자열 "AM" 또는 "PM" 이 저장
    // time 에는 문자열로 표현된 시간 정보가 저장
    let ampm = currentTime.split(' ')[0];
    let time = currentTime.split(' ')[1];

    // 문자열로 표현된 time 시간정보를 ':' 기준으로 분할 후 hour, min, sec 에 각각 저장
    let hour = parseInt(time.split(':')[0]);
    let min = parseInt(time.split(':')[1]);
    let sec = parseInt(time.split(':')[2]);

    // ampm 이 PM 일 경우 현재 hour 에 12를 더해줍니다.
    //        AM 일 경우에 AM이 12일 경우 0이 되고,
    //                   그렇지 않을경우 hour 는 그대로 유지합니다.
    ampm === "PM"
        ? hour += 12
        : hour === 12
            ? hour = 0
            : null;

    // 하루 기준 : 86400 초
    // 시간 기준 : 3600 초
    // 분  기준 : 60초

    // 86400초, 하루단위로 나눈나머지에서 3600으로 나눈 몫이 추가될 시간
    // 3600초, 시간단위로 나눈 나머지의 60으로 나눈 몫이 추가될 분
    // 60초, 분단위로 나눈 나머지가 추가될 초
    // 소수점계산은 필요없으므로 Math.floor() 사용
    let afterHour = Math.floor(N % 86400 / 3600);
    let afterMin = Math.floor(N % 86400 % 3600 / 60);
    let afterSec = Math.floor(N % 86400 % 3600 % 60);

    // 현재의 시간에 추가될 시간들을 더해줌
    hour += afterHour;
    min += afterMin;
    sec += afterSec;

    // 각 단위의 기준에 초과가 되면 몫을 시 단위, 분 단위에 더해주고 그 나머지를 갖는다.
    // 마찬가지로 소수점 계산은 필요없으므로 Math.floor() 사용
    min += Math.floor((sec / 60));
    sec %= 60;
    hour += Math.floor((min / 60));
    min %= 60;
    hour %= 24;

    hour = makeTimeFormat(hour);
    min = makeTimeFormat(min);
    sec = makeTimeFormat(sec);
    console.log(`${hour}:${min}:${sec}`);
}


/* Test Case  */
parseTime("PM 01:00:00", 10);
parseTime("PM 11:59:59", 1);
parseTime("AM 12:10:00", 40);
parseTime("AM 11:59:59", 1);
parseTime("AM 05:24:03", 102392);

/* Output

13:00:10
00:00:00
00:10:40
12:00:00
09:50:35

 */