import React, { useState } from 'react';
import axios from 'axios';
import Form from "react-bootstrap/Form"; 
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

function Signup() {
    const [inputName, setInputName] = useState('')
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
    const [confirmPw, setConfirmPw] = useState('')

	// input data의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputName = (e) => {
        setInputName(e.target.value)
        // console.log(e.target.value)
    }
    
    const handleInputId = (e) => {
        setInputId(e.target.value)
        // console.log(e.target.value)
    }

    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }

    const handleConfirmPw = (e) => {
        setConfirmPw(e.target.value)
    }

    // 회원가입 버튼 클릭 이벤트 (비밀번호와 비밀번호 확인 일치 여부)
    const onSubmit = (e) => {
        e.preventDefault()
        console.log(inputPw, confirmPw);
        if(inputPw !== confirmPw) {
          return alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.')
        }
        else {
            axios.post("url", {
                name: inputName,
                id: inputId,
                password: inputPw,
            })
            .then(function (response) {
                 alert("회원가입 성공");
                 return true;
            }).catch(function (error) {
                alert("오류");
                return false;
            });
        }
    }

	// // login 버튼 클릭 이벤트
    // const onClickLogin = () => {
    //     console.log('click login')
    //     console.log(inputId, inputPw)
    //     fetchLogin(inputId, inputPw)
    // }

        
    // // async await 함수를 사용할 때, 

    // try {
    //     const data = await axios.post("url");
    // } catch {
    //     // 오류 발생시 실행
    // }

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

	// 페이지 렌더링 후 가장 처음 호출되는 함수
    // useEffect(() => {
    //     axios.get('/user_inform/login')
    //     .then(res => console.log(res))
    //     .catch()
    // },
    // // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
    // [])

    return(
        <div className='line'>
            <h2>회원가입</h2>
            <Container className="pannel">
                <Form>
                    <Form.Group as={Row} className="mb-3">
                        <Col sm>
                            <Form.Control
                                size="lg" type="text" placeholder="이름 (최대 10글자)"
                                id='input_name' name='input_name' value={inputName}
                                onChange={handleInputName} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Col sm>
                            <Form.Control
                                size="lg" type="number" placeholder="아이디(학번)"
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
                    <Form.Group as={Row} className="mb-3">
                        <Col sm>
                            <Form.Control
                                size="lg" type="password" placeholder="비밀번호 확인" 
                                id='confirm_pw' name='confirm_pw' value={confirmPw} 
                                onChange={handleConfirmPw} />
                        </Col>
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button className="mb-3"
                            size="lg" variant="success" type="submit" onClick={onSubmit}>
                            회원가입
                        </Button>
                    </div>
                </Form>
            </Container>

            {/* <div>
                <label className='input_name'>이름 : </label>
                <input 
                    type='text' id='input_name' name='input_name' value={inputName} 
                    placeholder="이름 (최대 10글자)"
                    onChange={handleInputName} />
            </div>
            <div>
                <label className='input_id'>아이디(학번 8자리) : </label>
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
                <label className='confirm_pw'>비밀번호 확인 : </label>
                <input 
                    type='password' id='confirm_pw' name='confirm_pw' value={confirmPw} 
                    placeholder="비밀번호 확인"
                    onChange={handleConfirmPw} />
            </div>
            <div>
                <button className='button' type='submit' onClick={onSubmit}>회원가입</button>
            </div> */}
        </div>
    )
}

export default Signup;