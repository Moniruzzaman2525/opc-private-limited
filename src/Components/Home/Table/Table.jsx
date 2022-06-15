import React, { useEffect, useState } from 'react';
import EditableTable from "./EditableTable";
import { BiUserPlus } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';
import Modal from './Modal';


function Table() {
  const [candidate, setCandidate] = useState([]);
  const [addItem, setAddItem] = useState(null);
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

  console.log(candidate)
  return (
    <>
      {
        spinner ? <Spinner /> :
          <div className='mb-10 pt-20'>
            <EditableTable columns={columns} rows={candidate} actions />
          </div>
      }
      <label
        for="my-modal-6"
        onClick={() => setAddItem(!addItem)}
        class="mt-2 ml-4 md:ml-0 flex items-center btn w-48 btn-primary text-white">
        ADD New <BiUserPlus className='ml-3 text-2xl'></BiUserPlus></label>
      {addItem && <Modal setAddItem={setAddItem} addItem={addItem}></Modal>}

    </>

  );
}

export default Table;
