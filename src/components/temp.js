const PrimaryLayout = () => (
    <div className="App">
        <ul>
            <li><Link to="/">首页</Link></li>
            <li><Link to="/users">关于</Link></li>
            <li><Link to="/users">主题列表</Link></li>
        </ul>
        <main>
            <Route path="/" exact component={LoginControl} />
            <Route path="/users" component={UsersPage} />
        </main>
    </div>
)

const UsersPage = () => <div>Users Page</div>

const App = () => (
    <BrowserRouter>
        <PrimaryLayout />
    </BrowserRouter>
)


class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
        </p>
                <LoginControl />
            </div>
        );
    }
}

export default App;



// function UserGreeting(props) {
//     return <h1>Welcome back!</h1>;
// }

// function GuestGreeting(props) {
//     return <h1>Please sign up.</h1>;
// }

// function Greeting(props) {
//     const isLoggedIn = props.isLoggedIn;
//     if (isLoggedIn) {
//         return <UserGreeting />;
//     }
//     return <GuestGreeting />;
// }

// function LoginButton(props) {
//     return (
//         <button onClick={props.onClick}>
//             Login
//         </button>
//     );
// }

// function LogoutButton(props) {
//     return (
//         <button onClick={props.onClick}>
//             Logout
//         </button>
//     );
// }
class LoginControl extends Component {
    // constructor(props) {
    //     super(props);
    //     this.handleLoginClick = this.handleLoginClick.bind(this);
    //     this.handleLogoutClick = this.handleLogoutClick.bind(this);
    //     this.state = { isLoggedIn: false };
    // }

    // handleLoginClick() {
    //     this.setState({ isLoggedIn: true });
    // }

    // handleLogoutClick() {
    //     this.setState({ isLoggedIn: false });
    // }

    render() {
        // const isLoggedIn = this.state.isLoggedIn;

        // let button = null;
        // if (isLoggedIn) {
        //     button = <LogoutButton onClick={this.handleLogoutClick} />;
        // } else {
        //     button = <LoginButton onClick={this.handleLoginClick} />;
        // }

        return (

            <div className="login-bg">
                <Link to="/home">关于</Link>
                {/* <Greeting isLoggedIn={isLoggedIn} /> */}
                {/* {button} */}
            </div>
        );
    }
}
