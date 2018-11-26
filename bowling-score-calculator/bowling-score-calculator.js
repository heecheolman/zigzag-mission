






// isStrike : 스트라이크인지 여부를 알려주는 함수
// isSpare : 스페어인지 여부를 알려주는 함수
// 동일한 함수이지만 가독성을 위해 추가
const isStrike = score => score === 10;
const isSpare = score => score === 10;

// 각 횟수당 점수가 유효한지 체크하는 함수, 만약 프레임에 점수가 10이 넘는다면 true 를 return
const hasError = (rolls) => {
    for(let i = 0; i < rolls.length; i++) {
        if(rolls[i] === 10) {
            continue;
        } else if(rolls[i] + rolls[i + 1] > 10){
            return true;
        } else {
            i++;
        }
    }
    return false;
};

// 볼링점수가 적혀있는 pinString 을 정수형 점수로 변환후 반환해주는 parseScore 함수
const parseScore = (pinString) => {
    let rolls = [];
    // 만약 'A' 라면 10 을 저장하고 그렇지 않은경우에는 정수형으로 변환후 rolls 에 push
    for(let i = 0; i < pinString.length; i++) {
        let parsedScore = pinString.charAt(i) === 'A'
            ? 10
            : parseInt(pinString.charAt(i));
        rolls.push(parsedScore);
    }
    return rolls;
};

function calcBowlingScore(pinString) {
    // 전체 점수를 계산해주는 totalScore
    let totalScore = 0;
    // 점수가 나지는 프레임을 저장하는 배열 frame
    let frame = [];
    // pinString 으로 받은 문자열을 parseScore 함수를 이용하여 정수가 저장되어있는 점수를 rolls 에 받음
    let rolls = parseScore(pinString);

    // 만약 점수에 에러가 있다면 에러메세지를 보여주고 프로그램 종료
    if(hasError(rolls)) {
        console.error('점수가 유효하지 않습니다');
        return;
    }

    /**
     * 볼링 점수 계산 알고리즘
     *
     * [스트라이크일 경우]
     * 기본점수에 다음 두번째 roll까지 점수를 누적해서 계산
     *
     * [스페어일 경우]
     * 기본점수에 다음 첫번째 roll까지 점수를 누적해서 계산
     *
     * [일반적으로 점수를 내는 경우]
     * 두번 굴린 점수를 누적해서 계산한다.
     *
     *
     * 한 프레임이 끝난후에는 frame 배열에 push 해준다
     *
     * [예외]
     * 배열의 index 가 넘어가는경우에 NaN 또는 undefined 가 더해질 수 있으므로
     * 점수가 유효한 경우에만 frame 배열에 push 해준다
     *
     */
    for(let i = 0; i < rolls.length; i++) {
        // 스트라이크
        if(isStrike(rolls[i])) {
            totalScore += 10 + rolls[i + 1] + rolls[i + 2];
        // 스페어
        } else if(isSpare(rolls[i] + rolls[i + 1])){
            totalScore += 10 + rolls[i + 2];
            i++;
        // 일반점수
        } else {
            totalScore += rolls[i] + rolls[i + 1];
            i++;
        }
        // totalScore 가 NaN 이나 undefined 인 경우가 아니라면 frame 에 push
        if(totalScore) {
            frame.push(totalScore);
        }
    }
    // 프레임 출력
    console.log(`[${frame.toString()}]`);
}

/* Test Case  */
calcBowlingScore('AAAAAAAAAAAA');
calcBowlingScore('82A900519A');
calcBowlingScore('82A900538');


/* Output

[30,60,90,120,150,180,210,240,270,300]
[20,39,48,53,73]
점수가 유효하지 않습니다

 */