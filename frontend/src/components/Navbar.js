import React,{Component} from 'react';
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { logout } from '../actions/index'
import HomeIcon from '@material-ui/icons/Home';

class Navbar extends Component {
    render() {
        const { isAuthenticated } = this.props.authlogin
        if (isAuthenticated) {
            const { username ,pk} = this.props.authlogin.user
            return (
                <ul className="navbar-nav ml-auto">
                    <HomeIcon/>
                    <li className="nav-item" style={{ margin: "auto 0" }}>
                        <Link className="btn btn-sm btn-outline-info" to="/user-info">
                            {username} {pk}<i className="fa fa-user ml-1"></i>
                        </Link>
                    </li>

                    <li className="nav-item" style={{ margin: "auto 0" }}>
                        <button onClick={this.props.logout}
                            className="btn btn-sm btn-outline-danger ml-2" to="/">
                            Logout
                        </button>
                    </li>

                    <li className="nav-item" style={{ margin: "auto 0" }}>
                        <Link to="/changepassword">
                            Change password
                        </Link>
                    </li>
                </ul>
            )
        }
        else {
            return (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signup">Signup</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/forgetpassword">forget password</Link>
                    </li>
                </ul>
            )
        }
    }
}

const mapStateToProps = ({ authlogin }) => {
    return { authlogin }
}

export default connect(mapStateToProps, { logout })(Navbar)