import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const FifthTask = () => {
    const { register, handleSubmit, reset } = useForm();
    const [isClick, setIsClick] = useState(false);

    //fetch all user data
    const { data: userData, refetch } = useQuery({
        queryKey: ['get-user'],
        queryFn: async () => {
            const res = await fetch('https://job-task-server-gilt.vercel.app/user/get-user');
            const data = res.json();
            return data
        }
    })

    const handleClickShow = () => {
        setIsClick(false)
    }
    const handleClickInsert = () => {
        setIsClick(true)
    }

    const onInsertSubmit = async (data) => {
        const postData = {
            name: data.user_name,
            email: data.user_email,
            mobile: data.user_number,
            age: data.user_age
        }

        //create user
        fetch('https://job-task-server-gilt.vercel.app/user/post-user', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                reset()
                toast.success('User Successfully Inserted!')
                refetch()
            })
            .catch(err => console.error(err))
    }



    //delete user
    const handleDeleteUser = async (id) => {
        console.log(id)
        fetch(`https://job-task-server-gilt.vercel.app/user/delete-user/${id}`, {
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
            .catch(err => console.error(err))

    }
    return (
        <div className="w-1/2 mx-auto">

            {
                isClick ?

                    <h1 onClick={handleClickShow} className='mt-12 w-1/4 mx-auto hover:bg-green-50 outline outline-green-50 text-xl text-center font-bold'><Link>Show User</Link></h1>
                    :
                    <h1 onClick={handleClickInsert} className='mt-12 w-1/4 mx-auto hover:bg-green-50 outline outline-green-50 text-xl text-center font-bold'><Link>Insert User</Link></h1>
            }

            {
                !isClick ?
                    <div id='table'>
                        <h1 className='mt-8 mb-4 text-xl text-center text-green-600'>Users Info Table</h1>
                        <table className="min-w-full divide-y-2 divide-gray-200 text-sm outline outline-green-100">
                            <thead>
                                <tr>
                                    <th
                                        className="whitespace-nowrap px-4 py-2 text-left font-bold text-gray-900"
                                    >
                                        Name
                                    </th>
                                    <th
                                        className="whitespace-nowrap px-4 py-2 text-left font-bold text-gray-900"
                                    >
                                        Email
                                    </th>
                                    <th
                                        className="whitespace-nowrap px-4 py-2 text-left font-bold text-gray-900"
                                    >
                                        Age
                                    </th>
                                    <th
                                        className="whitespace-nowrap px-4 py-2 text-left font-bold text-gray-900"
                                    >
                                        Mobile
                                    </th>
                                    <th
                                        className="whitespace-nowrap px-4 py-2 text-left font-bold text-gray-900"
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {
                                    userData?.map((user, index) =>
                                        <tr key={index}>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{user?.name}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user?.email}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user?.age}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user?.mobile}</td>
                                            <td><button onClick={() => handleDeleteUser(user?._id)} className="w-14 h-6 mx-2 bg-red-300 hover:bg-red-400 rounded-lg">Delete</button></td>
                                        </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                    :
                    <div>
                        <section className="bg-gray-100">
                            <div className="mx-auto max-w-screen-xl my-6 px-4 py-12 sm:px-6 lg:px-8">
                                <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                                    <h1 className='-mt-6 my-6 text-xl text-center text-green-600'>Insert User</h1>
                                    <form onSubmit={handleSubmit(onInsertSubmit)} className="space-y-4">

                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div>
                                                <label className="sr-only" htmlFor="user_name">User Name</label>
                                                <input
                                                    {...register("user_name", { required: true })}
                                                    className="w-full outline-slate-200 rounded-lg border-gray-200 p-3 text-sm"
                                                    placeholder="User Name"
                                                    type="text"
                                                    id="user_name"
                                                />
                                            </div>

                                            <div>
                                                <label className="sr-only" htmlFor="user_email">User Email</label>
                                                <input
                                                    {...register("user_email", { required: true })}
                                                    className="w-full outline-slate-200 rounded-lg border-gray-200 p-3 text-sm"
                                                    placeholder="User Email"
                                                    type="text"
                                                    id="user_email"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                <div>
                                                    <label className="sr-only" htmlFor="user_number">Phone Number</label>
                                                    <input
                                                        {...register("user_number", { required: true })}
                                                        className="w-full outline-slate-200 rounded-lg border-gray-200 p-3 text-sm"
                                                        placeholder="User Phone Number"
                                                        type="text"
                                                        id="user_number"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                <div>
                                                    <label className="sr-only" htmlFor="user_age">Age</label>
                                                    <input
                                                        {...register("user_age", { required: true })}
                                                        className="w-full outline-slate-200 rounded-lg border-gray-200 p-3 text-sm"
                                                        placeholder="User Age"
                                                        type="number"
                                                        id="user_age"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end mt-4">
                                            <button
                                                type="submit"
                                                className="inline-block w-full rounded-lg bg-green-600 hover:bg-green-500 px-5 py-3 font-medium text-white sm:w-auto"
                                            >
                                                Insert
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </section>
                    </div>

            }


        </div>

    );
};

export default FifthTask;