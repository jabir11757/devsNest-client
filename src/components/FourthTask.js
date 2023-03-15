import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';
import User from '../images/user.jpg'

const FourthTask = () => {

    //fetch data from given link(json placeholder)
    let { data: usersData, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://job-task-server-gilt.vercel.app/client/get-client');
            const data = await res.json();
            console.log(data)
            return data;
        }
    })

    const handleDeleteUser = (id) => {

        fetch(`https://job-task-server-gilt.vercel.app/client/delete-client/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                if (result.acknowledged === true) {
                    toast.success('Card Successfully Removed')
                    refetch()
                }
            })
    }
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="max-w-6xl px-6 py-10 mx-auto">
                <div className="grid grid-cols-1">
                    {
                        usersData?.map(users =>
                            <main className="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12">
                                <div className="absolute w-full outline-dashed -z-10 md:h-96 rounded-2xl"></div>
                                <div className="w-full p-6 md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly">
                                    <img className="h-24 w-24 md:mx-6 rounded-full object-cover shadow-md md:h-[32rem] md:w-80 lg:h-[36rem] lg:w-[26rem] md:rounded-2xl" src={User} alt="" />

                                    <div className="mt-2 md:mx-6 flex">
                                        <div className="">
                                            <h1 className="my-4 text-xl font-bold ">User Name: {users?.username}  </h1>
                                            <h1 className="my-4 text-xl font-bold ">Full Name: {users?.name} </h1>
                                            <h1 className="my-4 text-xl font-bold ">Mobile: {users?.phone}  </h1>
                                            <h1 className="my-4 text-xl font-bold ">Email: {users?.email}  </h1>
                                            <h1 className="my-4 text-xl font-bold ">Address: {users?.address.city}  </h1>
                                            <h1 className="my-4 text-xl font-bold ">Website: {users?.website}  </h1>
                                            <h1 className="my-4 text-xl font-bold ">Company: {users?.company.name}  </h1>
                                        </div>
                                        <div className="flex justify-end items-end">
                                            <button onClick={() => handleDeleteUser(users?._id)} className="h-8 w-28 ml-20 mb-5 bg-green-600 text-white hover:bg-red-500 hover:text-white rounded-xl">Remove Card</button>
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