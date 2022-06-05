import logo from '../img/hufs_logo.png';
import { Link } from 'react-router-dom';
function Introduce() {
    return(
        <div className="scheduler">
            <header>
                <Link to="/" style={{textDecoration:'none'}}>
                    <h2>Smart Scheduler</h2>
                </Link>
            </header>
            
            <img className="logoImage" src={logo}></img>
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
                    <strong>• 전체 강의:</strong> 현재 학기에 개설된 강의 전체를 보여줍니다.<br />
                    <strong>• 조건 검색:</strong> 사용자가 원하는 과목의 조건으로 필터링된 강의 리스트를 보여줍니다.<br />
                        <div className="indent">1. 내 시간표에서 추가하고 싶은 강의 시간대를 선택</div>
                        <div className="indent">2. 개설영역, 별점을 작성한 후 조건 검색</div>
                    <strong>• 내 시간표:</strong> 작성 완료된 사용자 시간표를 보여줍니다.<br />
                        <div className="indent">• 추가하기: 현재 사용자 시간표에서 수정, 추가</div>
                            <div className="indent2">- 조건 검색으로 이동</div>
                        <div className="indent">• 시간표 저장: 내 시간표를 이미지로 저장</div>
                </div>
            </div>

            <div className="members">
                <h3>팀원 소개</h3>
            </div>

            <div className="circle_box">
                <div>
                    <div className="circle">민선아</div>
                    <p className="text">팀장<br /> 기획/디자인 <br /> 백엔드</p>
                </div>

                <div>
                    <div className="circle">고경환</div>
                    <p className="text">기획/디자인 <br /> 백엔드</p>
                </div>
                <div>
                    <div className="circle">조성민</div>
                    <p className="text">백엔드</p>
                </div>
                <div>
                    <div className="circle">김윤경</div>
                    <p className="text">프론트엔드</p>
                </div>
                <div>
                    <div className="circle">심재성</div>
                    <p>프론트엔드</p>
                </div>
                <div>
                    <div className="circle">이연지</div>
                    <p className="text">기획/디자인</p>
                </div>
            </div>
        </div>        
    )
}
export default Introduce;