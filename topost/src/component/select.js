import React, {useRef, useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Navbar, Nav, Form, Button,Container,Row ,Col} from 'react-bootstrap';

export default function Selecting() {
    

    function onSubmit(e){
        e.preventDefault();
        fetch(`http://localhost:3001/selecting`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                subject_val: subjectRef.current.value,
                professor_val : professor.current.value,
                area_val : areaRef.current.value,
                grade_val: gradeRef.current.value,
                star_val: starRef.current.value,
                type_val : checkbox,
                credit_val : creditRef.current.value,
                time_val : timeRef.current.value,
                competition_val : competitiontRef.current.value
            }),
          });
        }

    const subjectRef = useRef("-"); //과목
    const professor = useRef("-"); //교수-
    const areaRef = useRef("-"); //개설영역
    const gradeRef = useRef("-"); //학년
    const starRef = useRef("-"); //별점
    const [checkbox,setcheckbox] = useState([]); //강의유형
    useEffect(()=>{setcheckbox([])},[]);
    const creditRef = useRef("-"); //학점
    const timeRef = useRef("-"); //강의시간
    const competitiontRef = useRef("-"); //경쟁률

    return(
        <div className="select-page">
            
            <Navbar bg="dark" variant="dark" className="nav">
                <Container>
                <Navbar.Brand href="#home">SmartScheduler</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">전체 강의</Nav.Link>
                    <Nav.Link href="#features">조건 검색</Nav.Link>
                    <Nav.Link href="#pricing">내 시간표</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
            
            <Form className="form" onSubmit={onSubmit}>
                
                <Row className="mb-3">
                    <Form.Group as={Col}>
                    <Form.Label>교과목명</Form.Label>
                    <Form.Control placeholder="-"  ref={subjectRef} />
                    </Form.Group>

                    <Form.Group as={Col}>
                    <Form.Label>담당교수</Form.Label>
                    <Form.Control placeholder="-" ref={professor}/>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                    <Form.Label>개설영역</Form.Label>
                    <Form.Select ref={areaRef}>
                        <option>-</option>
                        <option>전공</option>
                        <option>교양</option>
                    </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col}>
                    <Form.Label>학년</Form.Label>
                    <Form.Select defaultValue="Choose..." ref={gradeRef}>
                        <option>-</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </Form.Select>
                    </Form.Group>
                </Row>

                <Row className="">
                    <Form.Group as={Col} className="box1">
                    <Form.Label>별점</Form.Label>
                    <Form.Control placeholder="~" ref={starRef} />
                    <p>입력한 별점보다 같거나 큰 결과가 검색됩니다.</p>
                    </Form.Group>

                    <Col>
                        <Form.Group as={Row}>
                        <Form.Label>강의 유형</Form.Label>
                        <div className="checkbox">
                            <div>
                            <input type="checkbox" onClick={()=>{
                                let copy = [...checkbox];
                                let check = false;
                                for(let i=0; i<copy.length; i++){
                                    if(copy[i]=='일반'){
                                        let copy2 = copy.splice(i,i);
                                        setcheckbox(copy2)
                                        check = true;}
                                }
                                if(!check){copy.push('일반'); setcheckbox(copy);}
                            }}/>일반 
                            </div>
                            <div>
                            <input type="checkbox" onClick={()=>{
                                let copy = [...checkbox];
                                let check = false;
                                for(let i=0; i<copy.length; i++){
                                    if(copy[i]=='원어민'){
                                        let copy2 = copy.splice(i,i);
                                        setcheckbox(copy2)
                                        check = true;}
                                }
                                if(!check){copy.push('원어민'); setcheckbox(copy);}
                            }} />원어민
                            </div>
                            <div>
                            <input type="checkbox" onClick={()=>{
                                let copy = [...checkbox];
                                let check = false;
                                for(let i=0; i<copy.length; i++){
                                    if(copy[i]=='Pass/Fail'){
                                        let copy2 = copy.splice(i,i);
                                        setcheckbox(copy2)
                                        check = true;}
                                }
                                if(!check){copy.push('Pass/Fail'); setcheckbox(copy);}
                            }}/>Pass/Fail
                            </div>
                        </div>

                        </Form.Group>
                        <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>학년</Form.Label>
                            <Form.Select defaultValue="Choose..." ref={creditRef}>
                                <option>-</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col}></Form.Group>
                        </Row>
                    </Col>
                </Row>
                <Row className="">
                    <Form.Group as={Col}>
                    <Form.Label>강의 시간</Form.Label>
                    <Form.Control placeholder="~" ref={timeRef}/>
                    </Form.Group>

                    <Form.Group as={Col}  className="box2">
                    <Form.Label>경쟁률(담은인원/정원)</Form.Label>
                    <Form.Control placeholder="사용자 직접 입력" ref={competitiontRef}/>
                    <p>입력한 경쟁률보다 같거나 작은 결과가 검색됩니다.</p>
                    </Form.Group>
                </Row>
                <br/>
                    <Button variant="success" type="submit" >검색하기</Button>
                
            </Form>
        </div>
    )
}