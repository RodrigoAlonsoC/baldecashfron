'use client';
import axios from "axios";
import { useRef } from "react";

import ErrorToast from '@/components/toast/ErrorToast';
import SuccessToast from '@/components/toast/SuccessToast';

const messageSuccesAdd = "Usuario Agregado!";
const messageErrorAdd = "Ocurrio un erro!";

const addUser = `${process.env.HOST_ENDPOINT}/api/v1/user/create`;

export default function ModalAddUser({isShowAdd, onClick, reloadTable}) {
    if (!isShowAdd) return null;

    const ErrorChildToast = useRef(null);
    const SuccesChildToast = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataForm = document.querySelector("form");
        const data = new FormData(dataForm);
        console.log(process.env.HOST_ENDPOINT);
        await axios.post(addUser, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            console.log(response);
            reloadTable();
            SuccesChildToast.current();
        }).catch((error) => {
            reloadTable();
            ErrorChildToast.current();
            if (error.response) {
                if (error.response.status == 401) {
                    console.log(error.response.status);
                    console.log("Wrong credentials");
                }
            }
            console.log(error.message);
        });
        console.log(data);
    };

    return (
        <div className=" fixed inset-0 bg-black gb-opacity-25 backdrop-blur-sm flex justify-center items-center
    ">
        <SuccessToast SuccesChildToast={SuccesChildToast} message={messageSuccesAdd} />
      <ErrorToast ErrorChildToast={ErrorChildToast} message={messageErrorAdd} />
            <div className="w-[600px]">

                <div className="bg-white p-2 rounded">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-12 p-10 ">


                            <div className="border-b border-gray-900/10 pb-12">

                                <center><h2 className="text-base font-semibold leading-7 text-gray-900">Registro</h2></center>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Nombre
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="name"
                                                id="first-name"
                                                autoComplete="given-name"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Apellidos
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="last_name"
                                                id="last-name"
                                                autoComplete="family-name"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Email
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                            Contraseña
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                autoComplete="family-name"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label forlabel="role" className="block text-sm font-medium leading-6 text-gray-900">Rol</label>
                                        <div className="mt-2">
                                            <select id="role" name="role" autoComplete="role-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                                <option value="1">Administrador</option>
                                                <option value="0">Revisor</option>
                                                
                                            </select>
                                        </div>
                                    </div>

                                </div>
                            </div>


                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6 pb-5">

                            <button onClick={()=> {onClick()}} className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                                Cerrar
                            </button>
       

                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Registrar
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}

