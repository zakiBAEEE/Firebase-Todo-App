import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import { useInput } from "../customHooks/useInput";
import { Link, useNavigate } from "react-router";
import { logout, register } from "../firebase/firebaseAuth";

function RegisterPage() {
    const [error, setError] = useState(null);
    const [nama, onChangeNama] = useInput();
    const [email, onChangeEmail] = useInput();
    const [password, onChangePassword] = useInput();
    const [confPassword, onChangeConfPassword] = useInput();
    const navigate = useNavigate();

    function validation(email, password, confPassword, nama) {
        email = email.trim();
        nama = nama.trim();

        if (!email || !password || !confPassword || !nama) {
            return new Error("Semua kolom harus diisi!");
        }
        if (password !== confPassword) {
            return new Error("Password dan Confirm Password tidak cocok!");
        }
        return null;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const error = validation(email, password, confPassword, nama);
        if (error) {
            setError(error.message);
            return;
        }
        try {
            await register(email, password, nama);
            await logout();
            navigate('/');
        } catch (error) {
            console.log(error.message);
            setError(error.message);
        }
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                <form onSubmit={handleSubmit}>
                    {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                    <div className="mb-4">
                        <Input
                            label="Nama"
                            type="text"
                            value={nama}
                            onChange={onChangeNama}
                            required
                        />
                    </div>
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
                    <div className="mb-6">
                        <Input
                            label="Confirm Password"
                            type="password"
                            value={confPassword}
                            onChange={onChangeConfPassword}
                            required
                        />
                    </div>
                    <div className="flex justify-center">
                        <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white">
                            Register
                        </Button>
                    </div>
                </form>
                <div className="flex justify-center mt-4">
                    <span className="text-sm text-gray-600">
                        Sudah Punya Akun? <Link to="/" className="text-blue-500 hover:text-blue-700">Login</Link>
                    </span>
                </div>
            </div>
        </div>
    );
}


export { RegisterPage }