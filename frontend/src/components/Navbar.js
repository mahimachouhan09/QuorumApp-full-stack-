import React,{Component} from 'react';
// import { NavLink } from 'react-router-dom';
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { logout } from '../actions/index'
import HomeIcon from '@material-ui/icons/Home';
// const Navbar = props => {
//   return (
    
//     <div style={{ borderBottom: '2px solid black', paddingBottom: '8px', paddingTop: '8px', marginBottom: '2px' }}>
//       <NavLink style={{ marginRight: '500px', fontSize: 22 }} to="/">Quorum</NavLink>
//       <NavLink style={{ marginRight: '30px', fontSize: 15 }} to="/questions">Answer Question</NavLink>
//       <NavLink style={{ marginRight: '20px', fontSize: 15 }} to="/questions/new">Ask Question</NavLink>
//     </div>
//   );
// }
 
// export default Navbar;

class Navbar extends Component {
    render() {
        const { isAuthenticated } = this.props.authlogin
        if (isAuthenticated) {
            const { username } = this.props.authlogin.user
            return (
                <ul className="navbar-nav ml-auto">
                    <HomeIcon/>
                    <li className="nav-item" style={{ margin: "auto 0" }}>
                        <Link className="btn btn-sm btn-outline-info" to="/user-info">
                            {username}<i className="fa fa-user ml-1"></i>
                        </Link>
                    </li>

                    <li className="nav-item" style={{ margin: "auto 0" }}>
                        <Link className="btn btn-sm btn-outline-info" to="/update-profile/:id/">
                            <button onClick = { this.onClick } >
                                EDIT PROFILE
                            </button>
                        </Link>
                    </li>

                    <li className="nav-item" style={{ margin: "auto 0" }}>
                        <button onClick={this.props.logout}
                            className="btn btn-sm btn-outline-danger ml-2" to="/">
                            Logout
                        </button>
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
                </ul>
            )
        }
    }
}

const mapStateToProps = ({ authlogin }) => {
    return { authlogin }
}

export default connect(mapStateToProps, { logout })(Navbar)