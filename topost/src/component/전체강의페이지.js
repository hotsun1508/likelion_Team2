import React, {useRef, useState,useEffect,render } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, Button,Container, Modal, FormCheck} from 'react-bootstrap';

export default function 조건검색결과페이지(){
    const [강의정보,강의정보설정] = useState([]);
    const [선택강의,선택강의설정] = useState([]);
    const [강의명검색, 강의명검색설정] = useState(null);

    const 검색어 = useRef("-"); 

    console.log(강의명검색);

    useEffect(()=>{
        fetch('http://localhost:3001/lecture_infor')
        .then(res => {
            return res.json();})
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
        <Example />
        e.preventDefault();
        fetch(`http://localhost:3001/select_lecture`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                선택강의목록 : 선택강의
            }),
          });
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
        
        <div style={{textAlign:"center",paddingTop:"30px",paddingBottom:"30px"}}>
            <form>
            <input type="text" className="search-form" placeholder=" 과목명 검색하기" ref={검색어}/>
            <button class="btn btn-outline-success" 
            style={{paddingBottom:"3px",paddingTop:"7px", margin:"0px"}} type="submit" onClick={()=>{강의명검색설정(검색어.current.value)}}>
                Search</button>
            </form>
        </div>
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
                            {
                                if(강의명검색 !== null){
                                    if(a["lecture_name"].includes(강의명검색)){
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
                                            </tr>)
                                    }
                                }
                                else{
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
                                        </tr>)
                                }
                            }
                           
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

function Example() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  render(<Example />);