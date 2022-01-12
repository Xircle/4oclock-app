# 4oclock-app
4oclock Application, powered by React Native

##Update Log
2021.01.12 2차 업데이트 1.12 업데이트 버전 1.2x

혼자
1. 번개 개설시 12자 제한 너무 적음 (20자 이상) - done
2. 잔여석 0석이면 마감 - done
	2-1. 잔여석이 남더라도 마감됐다면 마감 오버레이, not 잔여 tag - done
	2-2. 마이/후기 잔여석 및 마 감 로직 재설정 - done
3. 취소 기능 넣기
    1. user: 취소 버튼을 누른다 - done
        1. 취소 당일
            1. frontend: 당일에 취소를 누르면 모달 뜨고 당일에는 취소가 불가능합니다. 띄우기 - done
        2. else
            1. frontend: 취소 장소 및 정보와 설명 + 취소 사유를 받는 모달을 띄운다 - done
            2. user: 취소 사유를 입력하고, 취소 버튼을 누른다 - done (현재 공란이어도 가능한 구조가 더 나아보임 — 취소가 많아질 경우 바꾸는 쪽으로)
            3. frontend: cancelReservation api call한다 - done
            4. backend: cancelReservation call을 처리한다 - done
            5. frontend: 취소 완료를 알리고, myPlace를 refetch한다 - done

4. 번개 개설시 사진 1장만으로도 가능하게 - done
이든
- 번개 개설시 사진 1장만으로도 가능하게 - done
- 모레 - done

2022.01.21 3차 업데이트 1.3x
혼자
1. 채팅
    1. 메인 스크린 UI
    2. 채팅 룸 UI
    3. 채팅 메시지 UI
    4. 채팅 소켓 통신
2. 메인 스크린 pagenation (스크롤 끝나면 다음 페이지가 로드되는거) threshold 조정 — done
이든이랑 같이
2. 선택 업데이트, 강제 업데이트
3. 랜덤 프로필 재기획 + 기능
    1. 기수 구분 및 기존 유저 케이스 나누기
        1. 기수가 array of int 면 좋을 거같음 (다수 참여자)
