'use client';
import Header from '@/components/Header';
import TableUsers from '@/components/TableUsers';
import '@/css/pagination.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

const getData = `${process.env.HOST_ENDPOINT}/api/v1/user/index`;

function index() {
    const [data, setData] = React.useState([])
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(10);
    const [columns, setColumns] = useState([]);
    const [role, setRole] = useState(0);
    const [nameUserLogged,setNamedUserLogged] = useState("");

    function handlePageClick(event) {
        console.log(event.selected);
        setPage(event.selected);
    }

    function reloadTable(){
        getUsers();
    }

    const getUsers =  async () => {
     
        const response = await axios.get(`${getData}/${page}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                console.log(res);
                setPage(res.data.page);
                setTotalPages(res.data.totalPages);
                setColumns(res.data.columns);
                setRole(res.data.role);
                setData(res.data.data);
                setNamedUserLogged(res.data.nameUserLogged);
            })
    }


    useEffect(() => {
        getUsers();
    }, [page])


    return (
        <>
        <Header nameUserLogged={nameUserLogged}/>
       
            {data.length > 0 &&
                <TableUsers data={data} columns={columns} role={role} reloadTable={reloadTable} />
            }
                <ReactPaginate
                initialPage={1}
                    breakLabel="..."
                    nextLabel="Siguiente >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={totalPages}
                    pageCount={totalPages}
                    previousLabel="< Anterior"
                    pageClassName={'pagination_component'}
                />
                
        </>
    )
}

export default index;