import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';
import User from '../images/user.jpg'

const FourthTask = () => {

    //fetch data from given link(json placeholder)
    const { data: usersData, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await res.json();
            return data;
        }
    })

    const handleDeleteUser = (id) => {
        fetch(`http://localhost:7000/user/delete-client/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                if (result.acknowledged === true) {
                    toast.success('User Successfully Deleted!')
                    refetch()
                }
            })
    }
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="max-w-6xl px-6 py-10 mx-auto">
                <div className="grid grid-cols-1">
                    {
                        usersData.map(users =>
                            <main className="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12">
                                <div className="absolute w-full bg-green-500 -z-10 md:h-96 rounded-2xl"></div>
                                <div className="w-full p-6 bg-green-500 md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly">
                                    <img className="h-24 w-24 md:mx-6 rounded-full object-cover shadow-md md:h-[32rem] md:w-80 lg:h-[36rem] lg:w-[26rem] md:rounded-2xl" src={User} alt="user photo" />

                                    <div className="mt-2 md:mx-6 flex">
                                        <div className="">
                                            <h1 className="my-4 text-xl font-semibold text-white">User Name: {users.username}  </h1>
                                            <h1 className="my-4 text-xl font-semibold text-white">Full Name: {users.name} </h1>
                                            <h1 className="my-4 text-xl font-semibold text-white">Mobile: {users.phone}  </h1>
                                            <h1 className="my-4 text-xl font-semibold text-white">Address: {users.address.city}  </h1>
                                            <h1 className="my-4 text-xl font-semibold text-white">Website: {users.website}  </h1>
                                            <h1 className="my-4 text-xl font-semibold text-white">Company: {users.company.name}  </h1>
                                        </div>
                                        <div className="flex justify-end items-end">
                                            <button onClick={() => handleDeleteUser(users.id)} className="h-8 w-24 ml-20 bg-red-100 hover:bg-red-400 hover:text-white rounded-xl">Delete User</button>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        )
                    }
                </div>
            </div>
        </section>
    );
};

export default FourthTask;