"use client"
import React, {useEffect, useState} from 'react';
import {useRouter,useSearchParams} from "next/navigation";

const Form: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const message = searchParams.get("message");
    const type = searchParams.get("type");
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showMessage, setShowMessage] = useState(false);
    //for rendering the page when the user is not found or the user is not logged in
    const [dep,setDep]=useState(false);


    useEffect(() => {
        if (type === 'success') {
            setShowMessage(true);
            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [dep]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            console.log('Logging in...');
            const email:string= formData.email;
            const password:string= formData.password;
            const url= `http://localhost:5000/login?email=${email}&password=${password}`;
            const response = await fetch(url, {
                method: 'GET' // Specify the method explicitly

            });
            if (response.ok) {
                const user = await response.json();
                console.log("okk");
                console.log('Login successful');
                console.log(user._id);
                const idData={
                    id:user._id
                }

                localStorage.setItem('user', JSON.stringify(idData));
                router.push('/dashboard');

            } else {

                const errorMessage = await response.json();
                console.log(errorMessage.message);

                const url = `/login?message=${errorMessage.message}&type=success`;
                router.push(url);
                setDep(!dep);
                console.error('Login failed:', errorMessage.message);
            }
        } catch (error) {
            console.error('Login failed:', error);

        }
    };

    return (
        <div className="flex justify-center items-center h-screen">

            <div className="flex flex-col w-[300px] h-[400px]">
                {showMessage && (
                    <div className="bg-green-200 p-2 mb-4 text-green-700 text-center">
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="bg-gray-200 p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Form;
