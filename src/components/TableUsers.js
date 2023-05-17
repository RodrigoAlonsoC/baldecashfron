'use client';
import { UserCircleIcon, UserIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import ModalAddUser from './ModalAddUser';
import ModalEditUser from './ModalEditUser';

import ErrorToast from '@/components/toast/ErrorToast';
import SuccessToast from '@/components/toast/SuccessToast';

import 'react-toastify/dist/ReactToastify.css';

const messageSuccessDelete = "Exito!";
const messageErrorDelete = "Ocurrio un erro! Por favor, contactar al equipo Help Desk";


const getData = `${process.env.HOST_ENDPOINT}/api/v1/user/destroy`;

export default function TableUsers({ data, columns, role, reloadTable }) {

  const ErrorChildToast = useRef(null)
  const SuccesChildToast = useRef(null);

  const [isShowAdd, setShowAdd] = useState(false);
  const [isShowEdit, setShowEdit] = useState(false);
  const [idRow, setIdRow] = useState(0);

  const delet = async (id) => {
    const response = await axios.delete(`${getData}/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => {
        reloadTable();
        SuccesChildToast.current();
      }).catch((error) => {
        ErrorChildToast.current();
      })
  }
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-10">
      <SuccessToast SuccesChildToast={SuccesChildToast} message={messageSuccessDelete} />
      <ErrorToast ErrorChildToast={ErrorChildToast} message={messageErrorDelete} />
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((column) => {
              return (

                <th scope="col" className="px-6 py-3">
                  {column}
                </th>

              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            return (
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={index} >
                <td className="px-6 py-4">{row.id}</td>
                <td className="px-6 py-4">{row.name}</td>
                <td className="px-6 py-4">{row.last_name}</td>
                <td className="px-6 py-4">{row.email}</td>
                <td className="px-6 py-4">{(row.role) ? <UserCircleIcon className="h-6 w-6 text-gray-500" /> : <UserIcon className="h-6 w-6 text-gray-500" />}
                  {(row.role) ? "Administrador" : "Supervisor"}
                </td>
                <td className="px-6 py-4">{row.created_at}</td>

                {(role) ?
                  (<td className="px-6 py-4">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => { delet(row.id) }}>
                      Eliminar</button> { }
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => { setIdRow(row.id); setShowEdit(true) }}>
                      Editar</button>
                  </td>) : ""
                }

              </tr>
            );
          })}
        </tbody>
      </table>

      <button className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => { setShowAdd(true) }}>
        Agregar Usuario</button>
      <ModalEditUser isShowEdit={isShowEdit} onClose={() => { setShowEdit(false) }} id={idRow} reloadTable={reloadTable}/>
      <ModalAddUser isShowAdd={isShowAdd} onClick={() => { setShowAdd(false)}} reloadTable={reloadTable} />
      <ToastContainer />
    </div>
  )
}