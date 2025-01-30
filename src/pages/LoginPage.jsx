import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import { useInput } from "../customHooks/useInput";
import { Link } from "react-router";
import PropTypes from "prop-types";

function LoginPage({ loginHandler }) {
    const [email, onChangeEmail] = useInput();
    const [password, onChangePassword] = useInput();

    const [error, setError] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        try {
            loginHandler(email, password);
            console.log(email, password)
        } catch (error) {
            setError(error.message);
            console.log(error !== null ? error.message : "Error Tidak Sampe");
        }
    };
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 dark:bg-blue-950">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    {error && <div className="text-red-500 text-center mb-4">{error}</div>}

                    <div className="mb-4">
                        <Input
                            label="Email"
                            type="email"
                            value={email}
                            onChange={onChangeEmail}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <Input
                            label="Password"
                            type="password"
                            value={password}
                            onChange={onChangePassword}
                            required
                        />
                    </div>

                    <div className="flex justify-center">
                        <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white" onClick={handleSubmit}>
                            Login
                        </Button>
                    </div>
                </form>
                <div className="flex justify-center mt-4">
                    <span className="text-sm text-gray-600">
                        Belum Punya Akun? <Link to="/register" className="text-blue-500 hover:text-blue-700">Register</Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

LoginPage.propTypes = {
    loginHandler: PropTypes.func.isRequired
}

export { LoginPage }