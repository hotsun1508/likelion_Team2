import React, {useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function 내시간표페이지(){
    const [time, settime] = useState([]); //서버로 받아온 시간id
    const [subject, setsubject] = useState([]); //서버로 받아온 과목명
    const [color,setcolor] = useState([]); //랜덤색깔
    const [getdel,setgetdel] = useState([]); //삭제하기 전 선택된 강의 담아둔 

    const times =["1","2","3","4","5","6","7","8"];
    let all_id = []
    for(let i = 0; i<times.length; i++){
        all_id.push(["월"+times[i],"화"+times[i],"수"+times[i],"목"+times[i],"금"+times[i]]);
    }

    //시간표를 제자리에 띄우기위한 useEffect
    useEffect(() => {
        settime([]);
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
    
    //삭제하기 위해 클릭시 해당 과목 list에 담음
    function get_del(e){
        const target_id = e.target.id;
        const del_subject = document.getElementById(target_id).innerText;

        let copy = [...getdel];
        let check = false;
        for(let i=0; i<copy.length; i++){
            if(copy[i] == del_subject){
                copy.splice(i,1);
                i--;
                setgetdel(copy)
                check = true;}
        }
        if(!check){if(del_subject!=='.'){
            copy.push(del_subject); setgetdel(copy);} }//뭘 담을까요? 시간? 과목명?
    }

    //빨간테두리 띄우기 위한 useEffect
    useEffect(()=>{
        all_id.forEach((item,i)=>{
            for(let i = 0; i<item.length; i++){
                document.getElementById(item[i]).style.border = "1px solid #bdbdbd";
                for(let k = 0; k<getdel.length; k++){
                    if(document.getElementById(item[i]).innerText === getdel[k]){
                        if(document.getElementById(item[i]).innerText !== "."){
                            document.getElementById(item[i]).style.border = "5px solid red";
                        }
                    }
                }
            }
        })
        console.log(getdel);
    },[getdel])

    function deleting(){
        axios.post('http://localhost:3001/delete_lecture',{
            del_list : getdel
        })
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
                            <td><button id={"월"+a} onClick={get_del}>.</button></td>
                            <td><button id={"화"+a} onClick={get_del}>.</button></td>
                            <td><button id={"수"+a} onClick={get_del}>.</button></td>
                            <td><button id={"목"+a} onClick={get_del}>.</button></td>
                            <td><button id={"금"+a} onClick={get_del}>.</button></td>
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
            <div style={{padding:"50px",textAlign:"center"}} className="add_del">
                <div>
                <Link to = "/to-search">
                    <Button variant="success" type="submit" className="btn_in_내시간표" size="lg">과목 추가하기</Button>
                </Link>
                <p style={{padding:"10px",fontSize:"5px"}}>조건 검색 페이지로 이동합니다.</p>
                </div>
                <div>
                {/* <Button variant="success" type="submit" className="btn_in_내시간표" size="lg">시간표 저장</Button> */}
                <Button variant="danger" type="submit" className="btn_in_내시간표" size="lg" onClick={deleting}>과목 삭제하기</Button>
                <p style={{padding:"10px",fontSize:"5px"}}>삭제할 과목을 선택 후 클릭해주세요!</p>
                </div>
            </div>
        </Form>
        </>  
    )
    
}