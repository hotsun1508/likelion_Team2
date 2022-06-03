import React, {useRef, useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, Button,Container,Row ,Col, FormCheck} from 'react-bootstrap';
import axios from 'axios';

export default function 조건검색결과페이지(props){
    const [강의정보,강의정보설정] = useState([]);
    const [선택강의,선택강의설정] = useState([]);
    console.log('조건검색결과페이지 들어옴');
    console.log('props.lectures.lecture_number: ', props.lectures.lecture_number);
    useEffect(()=>{
        fetch('http://localhost:8000/select-lecturelist')
        .then(res => {
            return res.data['lecture_infor'];})
        .then(data =>{
            강의정보설정(data);
        });
    },[]);

    function click(e){  
        const target_id = e.target.id;
        let copy = [...선택강의];
        let check = false;
        for(let i=0; i<copy.length; i++){
            if(copy[i] == target_id){
                copy.splice(i,1);
                i--;
                선택강의설정(copy)
                check = true;}
        }
        if(!check){copy.push(target_id); 선택강의설정(copy);}
        
    }

    function onSubmit(e){
        e.preventDefault();
        // fetch('http://localhost:3001/select_lecture', {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         선택강의목록 : 선택강의
        //     }),
        //   });
        axios.post("http://127.0.0.1:8000/lecturelist/", {
            start_point: "3.67",
            lecture_name: ""
        })
    }
        
    return(
        <>
        <Navbar bg="success" variant="dark" className="nav">
                <Container >
                <Navbar.Brand href="#home">SmartScheduler Logo</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">전체 강의</Nav.Link>
                    <Nav.Link href="#features">조건 검색</Nav.Link>
                    <Nav.Link href="#pricing">내 시간표</Nav.Link>
                    <Nav.Link href="#login" style={{margin:"0 0 0 auto"}}>Login</Nav.Link>
                </Nav>
                </Container>
        </Navbar>
        
        

        <h2>조건 검색 결과</h2>

        <div style={{width:"90%",margin:"auto"}}>
            
            <table className="lecture-table">
                <tr className="lecture-infor">
                    <td>개설영역</td>
                    <td>학년</td>
                    <td>학수번호</td>
                    <td>강의명</td>
                    <td>담당교수</td>
                    <td>학점</td>                
                    <td>시간</td>                
                    <td>강의시간</td>                
                    <td>강의실</td>                
                    <td>지원인원수</td>
                    <td>제한인원수</td>
                    <td>비고</td>
                    <td>평점</td>
                    <td>선택</td>
                </tr>
                <tbody>
                    {
                        강의정보.map((function(a,i){
                            return(
                                <tr className="lecture-infor">
                                    <td>{a['area']}</td>
                                    <td>{a['year']}</td>
                                    <td>{a["lecture_number"]}</td>
                                    <td>{a["lecture_name"]}</td>
                                    <td>{a["professor"]}</td>
                                    <td>{a["credit"]}</td>
                                    <td>{a["time"]}</td>
                                    <td>{a["lecture_time"]}</td>
                                    <td>{a["lecture_room"]}</td>
                                    <td>{a["apply_count"]}</td>
                                    <td>{a["limit_count"]}</td>
                                    <td>{a["note"]}</td>
                                    <td>{a["star_point"]}</td>
                                    <td><FormCheck id = {a["lecture_name"]} onClick={(e)=>click(e)}/></td>
                                </tr>
                            )
                        }))
                    }
                    
                </tbody>
            </table>
        </div>
        <div style={{paddingTop:"50px",textAlign:"center"}}>
            <Form onSubmit={onSubmit}>
                <Button variant="success" type="submit" className="btn" size="lg">추가하기</Button>
            </Form>
        </div>
        
      </>
    )
}