"use client"
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'

interface UserData {
    email: string;
    password: string;
    name: string;
}


const Page = () => {
    const router = useRouter()
    const [user, setUser] = useState<UserData>({ email: '', password: '' ,name:' '});

    useEffect(() => {
        const data = localStorage.getItem('user');
        if (data) {
            const userData = JSON.parse(data);
            const userId = userData.id; // Assuming 'id' is a property of the user data

            fetchData().then(r => console.log('done'));
            // @ts-ignore
            async function fetchData() {
                try {
                    const url:string= `http://localhost:5000/users?id= ${userId}`;
                    const response = await fetch(url, {
                        method: 'GET'

                    });
                    if (response.ok) {
                        const user = await response.json();
                        setUser(user);
                    } else {

                        console.error('Failed to fetch user');
                    }
                } catch (e) {
                    console.error("error in fetching data:", e);
                }
            }


        } else {
            router.push('/login');
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/login?message=Logged out successfully!&type=success');

    };

    return (
        <div className="flex justify-center m-5">
            <div>
                <h1 className="text-2xl">Dashboard</h1>
                <h2 className="text-xl">hii, {user.name}</h2>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Page;