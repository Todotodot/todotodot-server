## TODOTODOT

[나만의 TODOTODOT 만들러 가기](https://www.todotodot.com)

## ☑️ TODOTODOT 이란?

TODOTODOT(투둣투둣)은 일반적인 Todo 어플리케이션에 게임의 요소를 가미한 웹 어플리케이션입니다.

평소 우리는 Todo 어플리케이션을 다운받으면 짧으면 3일, 길면 일주일 정도만 쓰고 다운받았던 사실조차 잊어버립니다.
그래서 Todo 어플리케이션을 어떻게 하면 유저가 오랫동안 재밌게 사용할 수 있을지에 대한 고민을 해보았습니다.
Todo 플랫폼에 미니 게임을 넣으면 어떨까하는 생각이 제일 먼저 들었고, 그 게임을 혼자 아닌 여러 유저들이 참여하게 하면 우리만의 Todo 어플리케이션을 만들 수 있을 것 같다는 생각을 했습니다.

TODOTODOT의 핵심 기능은 유저가 Todo를 완료하고 싶으면 게임에 참여하여 승리해야만 완료할 수 있는 플랫폼을 가지고 있습니다.
만약 게임에 패배하면 Todo를 완료하지 못하고 다시 게임에 참여할 수 있습니다.
게임은 Todo 어플리케이션이라는 점을 염두에 두고 간단한 게임(Clicker Game)으로 구성하였습니다.
그룹의 경우 모든 인원이 참여해야만 게임을 시작할 수 있다는 조건을 추가하여 난이도 조절을 하였습니다.

그렇다면 이제 저희 TODOTODOT에 한번 참여해보세요!

## ☑️ 실행 방법

### 원격 저장소 내려받는 법

```javascript
https://github.com/Todotodot/todotodot-server.git
npm install
```

### 환경 변수 설정법

```javascript
PORT=<YOUR_PORT>
MONGO_URL=<MONGODB_URL>
SECRET_KEY=<YOUR_SECRET_KEY>
CLIENT_URL=https://www.todotodot.com
```

### 실행법

```javascript
npm run dev
```

### 테스트

```javascript
npm test
```

## ☑️ 개발 기간

2022년 5월 30일 ~ 2022년 6월 17일

### 상세 일정

- Week 1 - 기획 및 설계

  - 아이디어 검토 및 기술 검증
  - Figma 및 Lucid chart 작성
  - Flow chart 작성
  - 칸반 작업
  - Initial set up

- Week 2 - 기능 개발

  - Firebase를 활용한 구글 소셜 로그인 구현
  - 개인 또는 그룹의 todo를 생성, 수정 및 삭제하는 기능 구현
  - 그룹을 생성, 수정 및 삭제하는 기능 구현

- Week 3 - 기능 개발 및 배포
  - client 소켓 연동
  - 그룹 멤버 추가 기능 구현
  - 배포 (Netlify, AWS)
  - 테스트 코드 작성

## ☑️ 기술 스택

### Deploy : <img alt="AmazonAWS" src ="https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-appveyor&logo=amazon-aws&logoColor=white"/>

### Backend : <img alt="Node.js" src ="https://img.shields.io/badge/Node.js-43853D?style=for-the-appveyor&logo=node.js&logoColor=white"/> <img alt="Express.js" src ="https://img.shields.io/badge/Express.js-404D59?style=for-the-appveyor"/> <img alt="mongoDB" src ="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-appveyor&logo=mongodb&logoColor=white"/>
