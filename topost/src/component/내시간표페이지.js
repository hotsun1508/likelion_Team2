import React, {useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, Button,Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function 내시간표페이지(){
    const [time, settime] = useState([]); //서버로 받아온 시간id
    const [subject, setsubject] = useState([]); //서버로 받아온 과목명
    const [color,setcolor] = useState([]); //랜덤색깔
    const [gettime,setgettime] = useState([]); //선택된 강의 담아둔 

    const times =["1","2","3","4","5","6","7","8"];

    //시간표를 제자리에 띄우기위한 useEffect
    useEffect(() => {
        settime([]);
        setgettime([]);
        axios.get('http://localhost:3001/subject')
        .then(res => {
            return res.data;})
        .then(data => {
            let copy = [];
            let sub_copy = [];
            let color_copy = [];
            data.map(function(a,i){
                let time_data = data[i]['time'];
                let sub_data =  data[i]['name'];
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

    return(
        <>

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
                            <td id={"월"+a} style={{border: "2px solid #bdbdbd"}}></td>
                            <td id={"화"+a} style={{border: "2px solid #bdbdbd"}}></td>
                            <td id={"수"+a} style={{border: "2px solid #bdbdbd"}}></td>
                            <td id={"목"+a} style={{border: "2px solid #bdbdbd"}}></td>
                            <td id={"금"+a} style={{border: "2px solid #bdbdbd"}}></td>
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

        <Form>
            <div style={{padding:"50px",textAlign:"center"}}>
                <Link to = "/to-search">
                    <Button variant="success" type="submit" className="btn" size="lg">추가하기</Button>
                </Link>
                <Button variant="success" type="submit" className="btn" size="lg">시간표 저장</Button>
            </div>
        </Form>
        </>  
    )
    
}