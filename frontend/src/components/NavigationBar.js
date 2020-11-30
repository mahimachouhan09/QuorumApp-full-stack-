import React,{Component} from 'react';
import { connect } from 'react-redux'
import { logout } from '../actions/index'
import HomeIcon from '@material-ui/icons/Home';
import {Nav,Navbar,Form} from 'react-bootstrap'
import { Button} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

class NavigationBar extends Component {
    render() {
        const { isAuthenticated } = this.props.authlogin
        if (isAuthenticated) {
            const { username } = this.props.authlogin.user

            return (
                <Navbar style={{backgroundColor : "#3f51b5"}} variant="dark" fixed="top">
                <Navbar.Brand href="#"><HomeIcon/>&nbsp;Quorum</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/user-info">
                        {username} <i className="fa fa-user ml-1"></i>
                    </Nav.Link>
                    <Nav.Link href="/changepassword" variant="standard" to="/changepassword">
                        Change password
                    </Nav.Link>
                    <Nav.Link href="/questions">
                        questions list
                    </Nav.Link>
                    </Nav>
                    <Form inline>
                        <Button
                            to="/" 
                            onClick={this.props.logout} 
                            variant="contained"
                            startIcon={<ExitToAppIcon/>}
                            style={{ backgroundColor: "#587acc", margin: "auto 0" }}>
                            Logout
                        </Button>
                    </Form>
                </Navbar>
            )
        }
        else {
            return (
                <Navbar style={{backgroundColor : "#3f51b5"}} variant="dark" fixed="top">
                <Navbar.Brand href="#">Quorum</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/signup">Signup</Nav.Link>
                    <Nav.Link href="/forgetpassword">forget password</Nav.Link>
                </Nav>
                </Navbar>
            )
        }
    }
}

const mapStateToProps = ({ authlogin }) => {
    return { authlogin }
}

export default connect(mapStateToProps, { logout })(NavigationBar)