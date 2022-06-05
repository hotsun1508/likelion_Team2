import React, {useRef, useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button,Row ,Col} from 'react-bootstrap';
import axios from 'axios';
//import { Link } from 'react-router-dom';
import {useHistory} from "react-router";

export default function 조건검색페이지(){
    const history = useHistory(); //선택된걸 다음페이지에 보내기위한 history

    const areaRef = useRef(""); //개설영역
    const starRef = useRef(""); //별점

    const [time, settime] = useState([]); //서버로 받아온 시간id
    const [subject, setsubject] = useState([]); //서버로 받아온 과목명
    const [color,setcolor] = useState([]); //랜덤색깔

    const [gettime,setgettime] = useState([]); //선택된 강의 담아둔 

    

    const times =["1","2","3","4","5","6","7","8"];

    //시간표를 제자리에 띄우기위한 useEffect
    useEffect(() => {
        settime([]);
        setgettime([]);
        // axios.get('http://localhost:3001/subject')
        axios.get('http://localhost:8000/schedule')
        .then(res => {
            return res.data['lecture_infor'];})
        .then(data => {
            let copy = [];
            let sub_copy = [];
            let color_copy = [];
            data.map(function(a,i){
                let time_data = data[i]['lecture_time'];
                let sub_data =  data[i]['lecture_name'];
                const what_color = getRandomColor();
                if(time_data.length == 3){
                    copy.push(time_data[0]+time_data[1]);
                    copy.push(time_data[0]+time_data[2]);
                    for(let i = 1; i < time_data.length; i++){
                        sub_copy.push(sub_data);
                        color_copy.push(what_color);
                    }
                }
                else{
                    let day = time_data[0];
                    for(let i = 1; i < time_data.length; i++){
                        if(!parseInt(time_data[i])){
                            day = time_data[i];
                            continue;
                        }
                        copy.push(day+time_data[i]);
                        sub_copy.push(sub_data);
                        color_copy.push(what_color);
                    }
                }
            })
            settime(copy);   
            setsubject(sub_copy);
            setcolor(color_copy);
        })
        },[]);  

        function getRandomColor() {
            return `rgb( ${new Array(3).fill().map(v => Math.random() * 127 + 128).join(", ")} )`;
        }

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

    //색깔 onoff 및 JSON에있는 현재 저장된 시간표 띄우기
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


        time.forEach((item,i)=> {
            document.getElementById(item).style.background = color[i];
            document.getElementById(item).innerText = subject[i];
            document.getElementById(item).style.color = "black";
        })

        

    },[gettime])


    function onSubmit(e){
        e.preventDefault();
        console.log('조건부여버튼 클릭!!')
        // axios.post("http://localhost:3001/search"
        // axios.post("http://127.0.0.1:8000/lecturelist", {
        //     times: gettime.join(''),
        //     star_point: starRef.current.value,
        //     lecture_area: areaRef.current.value,
        // })
        console.log(gettime.join(''))
        console.log(starRef.current.value)
        console.log(areaRef.current.value)
        fetch("http://127.0.0.1:8000/lecturelist/",{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                times: gettime.join(''),
                star_point: starRef.current.value,
                lecture_area: areaRef.current.value
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('data: ', data);
            console.log('data[lecture_inofr]: ', data['lecture_infor']);
            history.push({pathname:"/search-result", state:{props:data['lecture_infor']}});
        })
        // .then(response => {
        //     console.log('response.json(): ', response.json());
        //     console.log('response.data:', response.data);
        //     // history.push({pathname:"/search-result", state:{props:res.data['lecture_infor']}});
        // })
    }


    return(
        <>
        <div style={{width:"70%",margin:"auto"}}>
            <h3 style={{marginLeft:"auto",marginRight:"auto"}}>조건검색</h3>
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
        {
            time.forEach((item,i)=> {
                document.getElementById(item).style.background = color[i];
                document.getElementById(item).innerText = subject[i];
                document.getElementById(item).style.color = "black";
            })
        }
        </div>
        
            <div className="select-page">
                <Row className="mb-3" style={{marginTop:"50px"}}>
                    <Form.Group as={Col}/>
                        <Form.Group as={Col}>
                        <Form.Label className="select-text">개설영역</Form.Label>
                        <Form.Select ref={areaRef}>
                            <option></option>
                            <option>전공</option>
                            <option>교양</option>
                            <option>문화와예술</option>
                        </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label className="select-text">별점</Form.Label>
                        <Form.Control placeholder="사용자 직접입력" ref={starRef} />
                        <p style={{padding:"10px",fontSize:"5px"}}>입력한 별점보다 같거나 큰 결과가 검색됩니다.</p>
                        </Form.Group>
                    <Form.Group as={Col}/>
                </Row>
                <div style={{paddingBottom:"50px",textAlign:"center"}}>

                    {/* link넘어가면서 post하는 방법 */}
                    <Button variant="success"size="lg" onClick={onSubmit}>
                        {/* <Link to ="/search-result" style={{textDecoration: 'none',color:'white'}}> */}
                            검색하기
                        {/* </Link> */}
                    </Button>
                    
                </div>
            </div>
        
        </>  
    )
    
}