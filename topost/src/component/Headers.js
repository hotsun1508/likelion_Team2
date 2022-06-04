import { Navbar, Nav,Container} from 'react-bootstrap';

export default function Headers(){
    return(
        <Navbar bg="success" variant="dark" className="nav">
                <Container >
                <Navbar.Brand href="/">SmartScheduler</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/all-lecture">전체 강의</Nav.Link>
                    <Nav.Link href="/to-search">조건 검색</Nav.Link>
                    <Nav.Link href="/mytimetable">내 시간표</Nav.Link>
                    <Nav.Link href="/login" style={{margin:"0 0 0 auto"}}>Login</Nav.Link>
                </Nav>
                </Container>
        </Navbar>
    )
}