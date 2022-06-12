import SignUp from "./components/SignUp";
import {
    Routes, Route, Link, BrowserRouter
} from "react-router-dom"
import LoginForm from "./components/LoginForm";


const App = () => {

    return (
        <BrowserRouter>
            <Link to="/login">login page</Link>
            <Link to="/signup">Sign up page</Link>

            <Routes>
                <Route path="/login" element={<LoginForm/>}>
                </Route>
                <Route path="/signup" element={<SignUp/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
