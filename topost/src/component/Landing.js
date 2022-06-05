import logo from '../img/hufs_logo.png';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button,Container} from 'react-bootstrap';

function Landing() {
    return(
        <>
   
        <div className='' style={{height:"120%"}}>
            <div style={{height:"100px"}}></div>
            <img className="logoImage" src={logo}></img>

            <div style={{padding:"100px",textAlign:"center"}}>
                <Link to='/introduce'>
                    <Button variant="success" className="btn_land" size="lg">서비스 소개</Button>
                </Link>
                <Link to='/all-lecture'>
                <Button variant="success" className="btn_land" size="lg">시간표 채우러 가기</Button>
                </Link>
            </div>
        </div>
        </>
    )
}

export default Landing;