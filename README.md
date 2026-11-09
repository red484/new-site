# Ashwood Friends

애쉬우드프렌즈의 여섯 가지 서비스를 소개하는 인터랙티브 B2C 랜딩 페이지입니다.

## 미리 보기

Python 3이 설치되어 있다면 의존성 설치 없이 실행할 수 있습니다.

```sh
npm start
# 또는
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

브라우저에서 http://127.0.0.1:4173 을 엽니다. dist/index.html을 직접 열어도 확인할 수 있습니다.

## 소스 구성

- dist/opening-sequence.js: 첫 화면의 블록·브랜드 애니메이션
- dist/collection.js: 앱 소개 콘텐츠, 스크롤, 장면 전환
- dist/refinement.css: 앱 소개와 마지막 목록의 디자인
- src/phone-3d.js: Three.js 디바이스 모델 및 화면 렌더링
- dist/assets/: 서비스 화면 캡처와 디바이스 에셋
- dist/screen-textures.js: 로컬 파일에서도 작동하는 화면 텍스처

첫 화면의 기존 연출을 유지하며, 별도의 대기 스플래시는 사용하지 않습니다. 기기 안의 서비스 화면은 캡처 이미지입니다.

## 3D 모델 빌드

Node.js와 npm이 필요합니다. 모델 소스를 수정한 경우 번들을 다시 생성합니다.

```sh
npm ci
npm run build
```

dist/index.html이 기본 진입점이며 dist/cover-study.html은 기존 파일명 호환용입니다. HTML 구조를 수정할 때 두 파일을 함께 갱신합니다.

## 정적 호스팅

게시 디렉터리는 dist입니다. 빌드 결과가 포함되어 있어 별도 빌드 없이 정적 호스팅할 수 있습니다. 자동 배포 워크플로는 설정하지 않았습니다.

## 에셋 및 라이선스

서비스 이미지와 제공받은 목업은 이 디자인 시안에 사용되었습니다. 외부 라이브러리와 에셋의 라이선스·출처는 dist/assets의 three-LICENSE.txt, device-LICENSE.txt, device-source.txt에 보관되어 있습니다.
