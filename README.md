## LocalTum (localhost + momentum clone project)

![](photo1.PNG)

## 2017년 5월 26일 수정 사항

- **[완료]** 한국어 문구를 적용하기 위하여 앞서 사용하던 구글의 `Arvo` 폰트를 `제주특별자치도청`의 `제주고딕`으로 바꿈.

    - 깨끗해서 선택하게 되었음

    - `Arvo`는 한국어 폰트를 지원하지 않음

- **[완료]** 앞서 사용하던 `영어` 에서 `한국어`로 작업중

    - 날씨, 미세먼지, 버스 정보 싹 `한국어`로 교체 예정 **[완료]**

        - 다행이 OpenWeatherMap에서 날씨 코드에 따른 설명을 달아놔서 교체 완료

        - 날씨 코드 설명: https://openweathermap.org/weather-conditions

    - 날씨 코드 받아다가 처리하는 것으로 바꿀 예정 **[완료]**

        - 교체완료, 날씨 코드에 대응하도록 추가

    - ~~기상청 RSS 쪽에서 날씨 받아다가 처리하는 방안도 생각해보고 있음~~

        - KWeather 해봤는데, 바로 되지 않고 관리자 승인이 필요함

        - 그냥 OpenWeatherMap 사용하는걸로 결정, 필요가 없음

            - 기상청은 왜 알러지 예보같은 API는 안주는지 이해 불가

## 2017년 5월 27일 해야될 개발사항

- ~~**[Depricated]** 기상청 동네예보 RSS 가져와서 표시해주기, 매일 오후 9시에 자동 동기화 시킬 생각.~~

    - (그냥 안하기로)

- ~~**[Depricated]** 한글 명언 가져다가 하단에 표시해주기, 어디에서 가져와야 할지는 모름.~~

    - 명언따위는 x나 주기로 함, 지금 그런걸 읽을 시간이나 있을지는 모르겠음 ㅡㅡ

    - 하여간 안하기로
## 소개

- 크롬에서 모멘텀 사용하고 있었는데 돈내라는게 많아서 제 손으로 만들었습니다, 모멘텀하고 좀 다르죠? 제가 좀 필요한것만 넣어서 만들었습니다

- 데이터는요

    - 날씨 데이터는 OpenWeatherMap에서 가져오구요 **[API무료]**

        - 케이웨더 서볼려고 했는데 신청하고 좀 기다려야 해서 안 씁니다

        - OWM만 사용해도 차고 넘칩니다

    - 미세먼지 데이터는 AQICN에서 가져오고 있습니다 **[API무료]**

    - 버스 데이터는

        - 경남여객의 버스 시간표를 가져와서 사용하고 있습니다

        - 평균시간 구해서 사용하고 있습니다

        - 버스 API를 사용할 **예정**이지만, 아직 사용해야 할 이유를 마땅히 느끼지 못하고 있습니다

- DB는 사용하고 있지 않습니다 

    - JSON만 사용해도 차고 넘칠꺼 같아서 사용 안하고 있습니다

    - 만약에 사용한다면 CouchDB 사용할 예정입니다

- node.js에서 express, request 사용해서 만들었습니다

## 설치 & 셋팅방법

1. `git clone` 하세요.

2. 그 폴더에 이동하세요

3. `node`가 설치되어있다는 가정하에

    - **모두 이 폴더에서 진행하시는 겁니다!**

    - npm install 을 하세요, `express`와 `request`가 설치되어 있어야 합니다

    - Aqicn.org 에 가셔서 API를 발급받으세요, 무료에요.

    - OpenWeatherMap 에 가셔서 API를 발급받으세요, 무료에요.

    - 최 상단에 위치한 `config.json`을 만져야 합니다.

        - 앞에서 발급받으신 두 키를 복사해서, aqicn에서 발급받으신 키는 `aqikey`에다가 복사하시고.

        - OpenWeatherMap 에서 발급받으신 키는, `owmkey`에다가 복사해 넣어주세용

        - 그리고 위치 설정은 다음과 같이 하면 됩니다, 

            - aqicn 사이트에 들어가셔서 오른쪽 검색창에 검색을 해봅니다, 내가 용인에 살고있으면 yongin 이라고 입력하면 결과가 주르륵 나오는데 그것 중 선택하시면 다음과 같은 주소로 이동이 되요.

            - http://aqicn.org/city/korea/gyeonggi/yongin-si/ 

            - 그럼 여기에서 city를 뒤로 하고, `korea/gyeonggi/yongin-si`를 복사해주세요 **반드시 앞에 / 를 빼고, 뒤에도 / 를 빼고 복사해주세요!**

            - 그런 다음에 `aqiloc`에다가 붙여넣어 주세요!, 반드시 `"korea/gyeonggi/yongin-si"` 와 같이 붙여넣어 주셔야 합니다

            - 그럼 이제 OpenWeatherMap을 봐야 합니다, [사이트](https://openweathermap.org/)에 들어가셔서 앞에 있는 `your city name`에 영문으로 도시 이름을 넣고 검색하세요, 저는 위와 같이 yongin을 넣고 검색합니다.

            - 그럼 검색 결과로 `yongin`이 뜨는데요, 들어가시면 다음과 비슷한 URL이 뜹니다

            - https://openweathermap.org/city/1832427

                - 그럼 여기에서 뒤에 있는 7자리 숫자를 복사해서, `config.json`에 있는 `owmloc`에다가 붙여넣어 줍니다.

    - 그럼 이제 위치 설정은 끝이 났구요, 명령 프롬프트 혹은 터미널에서 `npm start`를 입력하시면 실행 됩니다.

    - 데이터 다운로드 때문에 한 10초 정도만 기다리시면 됩니다, 시간 동기화는 프로그램에서 알아서 `1시간 30분`, `2시간`에 한번씩 할껍니다.

    - 그럼 자신이 좋아하는 웹 브라우저로 `http://localhost` 를 입력하세요, 그럼 위와 같이 이쁜 화면이 나올껍니다.