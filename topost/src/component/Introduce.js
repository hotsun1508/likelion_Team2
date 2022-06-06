import logo from '../img/hufs_logo.png';
import picture from '../img/picture1.png';

function Introduce() {
    return(
        <div className="scheduler">
            <header>
                <img className="logo" src={logo}></img>
                <h2>Smart Scheduler</h2>
            </header>

            <div className="service_intro">
                <h3>서비스 소개</h3>
            <p>
                자신이 작성한 시간표를 서버에 업로드하면<br />
                본인이 원하는 조건에 부합한 과목을 추천해주는 시스템입니다.
            </p>
            </div>

            <div className="main_function">
                <h3>주요 기능 소개</h3>
                <div className="function_text">
                    <div>
                        <nav>전체 강의</nav> 
                        <p>현재 학기에 개설된 강의 전체를 보여줍니다.</p>
                    </div>
                    
                    <div>
                        <nav>조건 검색</nav>
                        <p>
                            사용자가 원하는 과목의 조건으로 필터링된 강의 리스트를 보여줍니다.<br />
                            <div className="indent">1. 내 시간표에서 추가하고 싶은 강의 시간대를 선택</div>
                            <div className="indent">2. 개설영역, 별점을 작성한 후 조건 검색</div>
                        </p>
                    </div>

                    <div>
                        <nav>내 시간표</nav>
                        <p>
                            작성 완료된 사용자 시간표를 보여줍니다.<br />
                            <div className="indent">1. 추가하기: 현재 사용자 시간표에서 수정, 추가</div>
                            <div className="indent">2. 시간표 저장: 내 시간표를 이미지로 저장</div>
                        </p>
                    </div>
                </div>

                {/* <div className="function_text">
                    <strong>• 전체 강의:</strong> 현재 학기에 개설된 강의 전체를 보여줍니다.<br />
                    <strong>• 조건 검색:</strong> 사용자가 원하는 과목의 조건으로 필터링된 강의 리스트를 보여줍니다.<br />
                        <div className="indent">1. 내 시간표에서 추가하고 싶은 강의 시간대를 선택</div>
                        <div className="indent">2. 개설영역, 별점을 작성한 후 조건 검색</div>
                    <strong>• 내 시간표:</strong> 작성 완료된 사용자 시간표를 보여줍니다.<br />
                        <div className="indent">• 추가하기: 현재 사용자 시간표에서 수정, 추가</div>
                            <div className="indent2">- 조건 검색으로 이동</div>
                        <div className="indent">• 시간표 저장: 내 시간표를 이미지로 저장</div>
                </div> */}
            </div>

            <div className="members">
                <h3>팀원 소개</h3>
            </div>

            <div className="circle_box">
                <div>
                    <div className="circle"><a href="https://github.com/hotsun1508">민선아</a></div>
                    <p className="text">팀장<br /> 기획/디자인 <br /> 백엔드</p>
                </div>

                <div>
                    <div className="circle"><a href="https://github.com/kyunghwan1207">고경환</a></div>
                    <p className="text">기획/디자인 <br /> 백엔드</p>
                </div>
                <div>
                    <div className="circle"><a href="https://github.com/kyunghwan1207">조성민</a></div>
                    <p className="text">백엔드</p>
                </div>
                <div>
                    <div className="circle"><a href="https://github.com/Yoonkyoungme">김윤경</a></div>
                    <p className="text">프론트엔드</p>
                </div>
                <div>
                    <div className="circle"><a href="https://github.com/simjaesung">심재성</a></div>
                    <p>프론트엔드</p>
                </div>
                <div>
                    <div className="circle"><a href="https://github.com/lee-yeonji">이연지</a></div>
                    <p className="text">기획/디자인</p>
                </div>
            </div>
            
            <div className='picture_box'>
                <img className="picture" src={picture}></img>
            </div>
        </div>        
    )
}
export default Introduce;