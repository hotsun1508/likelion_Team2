function Introduce() {
    return(
        
        <div>
            <header className="scheduler">
                <h2>Smart Scheduler</h2>
            </header>

            <div className="service_intro">
                <h3>서비스 소개</h3>
                <p className>
                    자신이 작성한 시간표를 서버에 업로드하면
                    본인이 원하는 조건에 부합한 과목을 추천해주는 시스템입니다.
                </p>
            </div>

            <div className="main_function">
                <h3>주요 기능 소개</h3>
                <p>
                    • 전체 강의: 현재 학기에 개설된 강의 전체를 보여줍니다.<br />
                    • 조건 검색: 사용자가 원하는 과목의 조건으로 필터링된 강의 리스트를 보여줍니다.<br />
                        1. 내 시간표에서 추가하고 싶은 강의 시간대를 선택<br />
                        2. 개설영역, 별점을 작성한 후 조건 검색<br />
                    • 내 시간표: 작성 완료된 사용자 시간표를 보여줍니다.<br />
                        • 추가하기: 현재 사용자 시간표에서 수정, 추가<br />
                            - 조건 검색으로 이동<br />
                        • 시간표 저장: 내 시간표를 이미지로 저장
                </p>
            </div>
        </div>

        
    )
}
export default Introduce;