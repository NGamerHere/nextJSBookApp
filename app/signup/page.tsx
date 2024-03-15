"use client"
import React, {useState} from "react";

interface Form {
    name: string;
    email: string;
    password: string;
}

const App = () => {
    const [form, setForm] = useState<Form>({name:"",email: "", password: ""});
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Signing up...');
        console.log(form);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col">
                    <h1 className="text-2xl text-center pr-3 pb-2">Sign up</h1>
                <form onSubmit={handleSubmit} className="bg-gray-200 p-6 rounded-lg shadow-md">
                    <div className="mb-4">

                        <label htmlFor="name" className="block text-gray-700">Name:</label>
                        <input
                            type="name"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleInputChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300"
                        />
                    </div>
                    <div className="mb-4">

                        <label htmlFor="email" className="block text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
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
                            value={form.password}
                            onChange={handleInputChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300"
                        />
                    </div>
                    <button type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border">
                        Submit
                    </button>
                </form>
            </div>
        </div>);

}
export default App;

