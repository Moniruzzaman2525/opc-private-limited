import React, { useEffect, useState } from 'react';
import EditableTable from "./EditableTable";
import { BiUserPlus } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';

function Table() {
  const [candidate, setCandidate] = useState([]);
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const columns = [
    { field: 'id', fieldName: '#' },
    { field: 'name', fieldName: 'Name' },
    { field: 'Phone', fieldName: 'Phone Number' },
    { field: 'email', fieldName: 'Email' },
    { field: 'Hobbies', fieldName: 'Hobbies' },
    // { field: 'select', fieldName: 'Select' },
    { field: 'action', fieldName: 'Action' },
  ];


  useEffect(() => {
    // setSpinner(true);
    fetch('https://murmuring-ridge-59282.herokuapp.com/candidates')
      .then(res => res.json())
      .then(data => {
        setCandidate(data);
        // setSpinner(false);
      })
  }, [candidate]);

  // console.log(candidate)
  return (
    <>
      {
        spinner ? <Spinner /> :
          <div className='mb-10 pt-20'>
            <EditableTable columns={columns} rows={candidate} actions />
            <button onClick={() => navigate('/create-candidate')} className='mt-2 ml-4 md:ml-0 flex items-center btn btn-primary text-white'>Add Candidate <BiUserPlus className='ml-3 text-2xl'></BiUserPlus></button>
          </div>
      }

    </>

  );
}

export default Table;
