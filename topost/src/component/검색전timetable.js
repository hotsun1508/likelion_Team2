import React, { useEffect, useState } from "react";

export default function 검색전Table(){
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
                if(document.getElementById(item[i]).style.background = "#b3e5fc"){
                    document.getElementById(item[i]).style.background = "white";
                }
            }
        })
        gettime.forEach((item,i)=> {
            document.getElementById(item).style.background = "#b3e5fc";
            document.getElementById(item).style.color = "#b3e5fc";})
    },[gettime])
    
        
    return(     
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
    )
}