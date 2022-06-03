import React, {useRef, useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, Button,Container,Row ,Col, Fade} from 'react-bootstrap';
import axios from 'axios';
import 조건검색결과페이지 from './조건검색결과페이지'

export default function 조건검색페이지(){
    const areaRef = useRef(""); //개설영역
    const starRef = useRef(""); //별점

    const [gettime,setgettime] = useState([]); //선택된 강의 담아둔 
    const times =["1","2","3","4","5","6","7","8"];

    let all_id = []
    for(let i = 0; i<times.length; i++){
        all_id.push(["월"+times[i],"화"+times[i],"수"+times[i],"목"+times[i],"금"+times[i]]);
    }

    function get_time(e){
        const target_id = e.target.id;
        let copy = [...gettime];
        let check = false;
        for(let i=0; i<copy.length; i++){
            if(copy[i] == target_id){
                copy.splice(i,1);
                i--;
                setgettime(copy)
                check = true;}
        }
        if(!check){copy.push(target_id); setgettime(copy);}
    }

    useEffect(()=>{
        all_id.forEach((item,i)=>{
            for(let i = 0; i<item.length; i++){
                if(document.getElementById(item[i]).style.background = "#b9f6ca"){
                    document.getElementById(item[i]).style.background = "white";
                    document.getElementById(item[i]).style.color = "white";
                }
            }
        })
        gettime.forEach((item,i)=> {
            document.getElementById(item).style.background = "#b9f6ca";
            document.getElementById(item).style.color = "#b9f6ca";})
    },[gettime])


    function onSubmit(e){
        e.preventDefault();
        console.log('조건검색페이지/onSubmit()들어옴')
        // fetch(`http://localhost:3001/search`, {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         times : gettime.join(''),
        //         개설영역 : areaRef.current.value,
        //         별점: starRef.current.value,
        //     }),
        //   });
        console.log('start_point: ', starRef.current.value)
        console.log('lecture_area: ', areaRef.current.value)
        axios.post("http://127.0.0.1:8000/lecturelist/", {
            star_point: starRef.current.value,
            lecture_area: areaRef.current.value,
            times: gettime.join(''),
        })
        .then(function(res){
            console.log('res.data: ', res.data)
            console.log('res.data[lecture_infor]: ', res.data['lecture_infor'])
            console.log('type of res.data[lec_info]: ', typeof(res.data['lecture_infor']))
            // axios.post()
            // react-router()
            return <조건검색결과페이지 lectures={res.data['lecture_infor']} />;  // 잘 된다 -> 페이지 넘길때 데이터 같이 넘기면 된다.
            // return 'hello';
        }).catch(function(err){
            alert('조건검색 실패');
            return false;
        })
    }

    return(
        <>
        <Navbar bg="success" variant="dark" className="nav">
                <Container>
                <Navbar.Brand href="#home">SmartScheduler Logo</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">전체 강의</Nav.Link>
                    <Nav.Link href="#features">조건 검색</Nav.Link>
                    <Nav.Link href="#pricing">내 시간표</Nav.Link>
                    <Nav.Link href="#login" style={{margin:"0 0 0 auto"}}>Login</Nav.Link>
                </Nav>
                </Container>
        </Navbar>

        <div style={{width:"70%",margin:"auto"}}>
            <h3 style={{marginLeft:"auto",marginRight:"auto"}}>2022-1 시간표</h3>
        <table className="timetable">
                <tr className="date">
                    <td style={{border:"0px"}}></td>
                    <td>Mon</td>
                    <td>Tues</td>
                    <td>Wednes</td>
                    <td>Thurs</td>
                    <td>Fri</td>                
                </tr>
            <tbody>
                {
                    times.map(function(a,i){
                        return(
                        <tr>
                            <td style={{border: "2px solid #bdbdbd",width:"10%"}}>{a}</td>
                            <td><button id={"월"+a} onClick={get_time}>.</button></td>
                            <td><button id={"화"+a} onClick={get_time}>.</button></td>
                            <td><button id={"수"+a} onClick={get_time}>.</button></td>
                            <td><button id={"목"+a} onClick={get_time}>.</button></td>
                            <td><button id={"금"+a} onClick={get_time}>.</button></td>
                        </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </div>
        <Form onSubmit={onSubmit}>
            <div className="select-page">
                <Row className="mb-3">
                    <Form.Group as={Col}/>
                        <Form.Group as={Col}>
                        <Form.Label className="select-text">개설영역</Form.Label>
                        <Form.Select ref={areaRef}>
                            <option></option>
                            <option>전공</option>
                            <option>교양</option>
                        </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label className="select-text">별점</Form.Label>
                        <Form.Control placeholder="사용자 직접입력" ref={starRef} />
                        <p style={{padding:"10px"}}>입력한 별점보다 같거나 큰 결과가 검색됩니다.</p>
                        </Form.Group>
                    <Form.Group as={Col}/>
                </Row>
                <div style={{paddingBottom:"50px",textAlign:"center"}}>
                    <Button variant="success" type="submit" size="lg">검색하기</Button>
                </div>
            </div>
        </Form>
        </>  
    )
    
}