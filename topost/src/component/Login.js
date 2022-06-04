import axios from 'axios';
import React, { useState } from 'react';
import Form from "react-bootstrap/Form"; 
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

function Login() {
    
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')

	// input data의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputId = (e) => {
        setInputId(e.target.value)
        // console.log(e.target.value)
    }

    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }

	// 로그인 버튼 클릭 이벤트
    const onClickLogin = (e) => {
        e.preventDefault()
        console.log('click login')
        console.log(inputId, inputPw)

        axios.post("http://localhost:4000/users", {
            id: inputId,
            password: inputPw,
        })
        // 서버에서 보내준 결과값이 response
        .then(function (response) {
                alert("로그인 성공");
                return true;
        }).catch(function (error) {
            alert("로그인 실패");
            return false;
        });
    }


    // 회원가입 버튼 클릭 이벤트
    const onClickSignup = () => {
        console.log('click signup')
    }
    

    // const fetchLogin = async ({ id, password }) => {
    //     console.log(id, password)
    //     id = inputId;
    //     password = inputPw;
    //     const response = await fetch("http://localhost:4000/users");
      
    //     if (response.ok) {
    //         //서버통신이 성공적으로 이루어지면 users에 json값 대입
    //       const users = await response.json();
    //       console.log(users);
      
    //       // users 안 객체들을 순회하면서 그 객체들의 id값과 form 컴포넌트에서 받은 account의 id값과 비교
    //       // 서로 일치하는 것만 user에 대입
    //       const user = users.find((user) => user.id === id);
    //       //일치하는 user가 없거나, 비밀번호가 틀리면 해당 에러 생성
    //         if (!user || user.password !== password) {
    //             throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
    //       }
      
    //       // 모든게 일치하면 그 user 정보 return -> 이 return값이 form 컴포넌트 내 fetchLogin 함수 값으로 출력됨
    //       // form 컴포넌트에서 setUser값에 넣어야 함
    //       return user;
    //     }
      
    //     // 서버 통신이 안 이루어졌을 떄
    //     throw new Error("서버 통신이 원할하지 않습니다.");
    //   };

    return(
        <div className='line'>
            <h2>로그인</h2>
            <Container className="pannel" style={{width:"50%"}}>
                <Form>
                    
                    <Form.Group as={Row} className="mb-3">
                        <Col sm>
                            <Form.Control
                                size="lg" type="" placeholder="아이디(학번)"
                                id='input_id' name='input_id' value={inputId}
                                onChange={handleInputId} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Col sm>
                            <Form.Control
                                size="lg" type="password" placeholder="비밀번호" 
                                id='input_pw' name='input_pw' value={inputPw}
                                onChange={handleInputPw} />
                        </Col>
                    </Form.Group>
                    <br />
                    <div className="d-grid gap-1">
                        <Button className="mb-3"
                            size="lg" variant="success" type="submit" onClick={onClickLogin}>
                            로그인
                        </Button>
                    </div>
                    <div className="d-grid gap-2">
                        <Link to="/signup">
                            <Button className="mb-3 w-25 p-2"
                                size="sm" variant="outline-success" type="button">
                                회원가입
                            </Button>
                        </Link>
                    </div>
                </Form>
            </Container>
            
            {/* <div>
                <label className='input_id'>아이디(학번) : </label>
                <input 
                    type='text' id='input_id' name='input_id' value={inputId} 
                    placeholder="아이디(학번)"
                    onChange={handleInputId} />
            </div>
            <div>
                <label className='input_pw'>비밀번호 : </label>
                <input 
                    type='password' id='input_pw' name='input_pw' value={inputPw} 
                    placeholder="비밀번호"
                    onChange={handleInputPw} />
            </div>
            <div>
                <button className='button' type='submit' onClick={onClickLogin}>로그인</button>
            </div>
                <button className='button' type='button'>회원가입</button> */}
            </div>
    )
}

export default Login;