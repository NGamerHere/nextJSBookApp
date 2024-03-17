"use client";

import React, {useState,useEffect} from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"


interface BookData{
    name:string;
    author?:string;

}
const Page = () => {
    const [books, setBooks] = useState<BookData[]>([]);
    const [edit, setEdit] = useState<BookData>({name: ''});
    const [book, setBook] = useState<BookData>({name: "", author: ''});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const bookCopy = { ...book };
        setBook({ name: '' ,author:''});
        setBooks([...books, bookCopy]);
    };
    const editHandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEdit({ ...edit, [name]: value });
    }
    const editHandleSubmit = (e: React.FormEvent<HTMLFormElement>, index: number | undefined) => {
        e.preventDefault();
        if (index != null) {
            const booksCopy = [...books];
            booksCopy[index] = edit;
            setBooks(booksCopy);
        }

    }
    const handleDelete = (index: number | undefined) => {
        console.log(index);
        const booksCopy = [...books];
        if (index != null) {
            booksCopy.splice(index, 1);
        }
        setBooks(booksCopy);
    }



    const card= (bookName: string, author: string | undefined, index: number | undefined)=>{
        return <motion.div
        initial={{ opacity: 0 ,x:-5}}
        animate={{ opacity: 1 ,x:0}}
        transition={{ duration: 1 ,delay:0.5, type:"spring" ,stiffness:100}}
        >
            <Card>
                <CardHeader>
                    <CardTitle>{bookName}</CardTitle>
                    <CardDescription>written by {author}</CardDescription>
                </CardHeader>
               <CardFooter>
                   <div>

                       <Drawer >
                           <DrawerTrigger>edit </DrawerTrigger>
                           <DrawerContent>
                               <DrawerHeader>
                                   <DrawerTitle>edit the task</DrawerTitle>
                                   <DrawerDescription>
                                        <form onSubmit={(e)=>editHandleSubmit(e,index)}>
                                                <label>
                                                    enter book name:
                                                </label>
                                             <input type="text" name="name" value={edit.name} onChange={editHandleInputChange} />
                                             <label>
                                                 enter author name:
                                                </label>
                                            <input type="text" name="author" value={edit.author} onChange={editHandleInputChange} />

                                             <button type="submit" >Submit</button>
                                        </form>

                                   </DrawerDescription>
                               </DrawerHeader>
                                 <DrawerFooter>
                                   <DrawerClose>
                                       <Button variant="outline">Cancel</Button>
                                   </DrawerClose>
                               </DrawerFooter>
                           </DrawerContent>
                       </Drawer>


                       <Button onClick={()=>handleDelete(index)} variant="destructive" className="m-2">Delete</Button>
                   </div>

                </CardFooter>
            </Card>
        </motion.div>

    }


    useEffect(() => {
        console.log(books);
    }, [books]);


    return <div className="m-5">
        <h1>Page</h1>
        <form onSubmit={handleSubmit}>
            <label>
                enter book name:
            </label>
            <input type="text" name="name" value={book.name} onChange={handleInputChange} />
            <label>
                enter author name:
            </label>
            <input type="text" name="author" value={book.author} onChange={handleInputChange} />
            <button type="submit">Submit</button>
        </form>

        <div className="w-[1000px] m-6">
            <h1 className="text-2xl text-center">Books</h1>
            <div className="grid grid-cols-3 gap-2">

                {books.map((book, index) => (
                    card(book.name, book.author, index)
                ))}



            </div>
        </div>


    </div>
}
export default Page;