import React, { useState } from 'react';

export interface Metadata {
    title: string;
    name: string;
}

interface HeroTesterProps {
    onNameChange: (name: string) => void;
}

const HeroTester: React.FC<HeroTesterProps> = ({ onNameChange }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setName(name);
        onNameChange(name); // Call the callback function with the name
        console.log(name);
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={name} onChange={handleNameChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default HeroTester;
