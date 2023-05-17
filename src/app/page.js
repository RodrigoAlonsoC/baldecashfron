'use client';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SuccessToast from '@/components/toast/SuccessToast';
import ErrorToast from '@/components/toast/ErrorToast';
import { useRef } from 'react';

const loginApi = `${process.env.HOST_ENDPOINT}/api/v1/login`;
const messageSuccessLogin = "Exito!";
const messageErrorLogin = "Ocurrio un erro!";

export default function Index() {

  const ErrorChildToast = useRef(null)
  const SuccesChildToast = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataForm = document.querySelector("form");
    const data = new FormData(dataForm);
    console.log(process.env.HOST_ENDPOINT);
    await axios.post(loginApi, data).then((response) => {
      const token = response.data.token;
      console.log(token.jwt);
      localStorage.setItem('token', token.jwt);
      SuccesChildToast.current();
      window.location.href = '/dashboard';
    }).catch((error) => {
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
    <main>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://uploads-ssl.webflow.com/62141f21700a64ab3f816206/62698bca9d9282dbef03c393_Logo-BaldeCash-Horizontal%202%20(5).png"
            alt="Baldecash"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Bienvenido
            <SuccessToast SuccesChildToast={SuccesChildToast} message={messageSuccessLogin} />
            <ErrorToast ErrorChildToast={ErrorChildToast} message={messageErrorLogin} />
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Contraseña
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Ingresar
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Sin cuenta?{' '}
            <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Registrarme
            </a>
          </p>
        </div>
      </div>

      <ToastContainer />
    </main>
  )
}
