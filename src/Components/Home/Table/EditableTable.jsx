import React, {useEffect, useMemo, useState} from 'react';
import { BsPencilSquare, BsSaveFill, BsFillTrashFill, BsXSquareFill } from 'react-icons/bs';
import {TiArrowSortedDown} from 'react-icons/ti';
import './EditableTable.css';

const EditableTable = ({ columns, rows, actions }) => {
  // console.log(rows)
  const [isEditMode, setIsEditMode] = useState(undefined);
  const [rowIDToEdit, setRowIDToEdit] = useState(undefined);
  const [rowsState, setRowsState] = useState(rows);
  const [result, setResult] = useState('');
  const [open, setOpen] = useState(undefined);
  const [rowID, setRowID] = useState(undefined);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');


  useEffect(() => {
    setRowsState(rows)
   }, [rows])
  const [editedRow, setEditedRow] = useState();

  const [pageSize, setPageSize] = useState(10);
  // console.log(result);
  const handleEdit = (rowID) => {
    setIsEditMode(true);
    setEditedRow(undefined);
    setRowIDToEdit(rowID);
    setOpen(true);
  }

  //Delete row
  const handleRemoveRow = (rowID) => {

    //Delete row from database
    // if (window.confirm('Are you sure you want to delete this row?')) {
      fetch(`https://murmuring-ridge-59282.herokuapp.com/candidates/${rowID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setRowsState(data)
      }
      )
    // } else {
    //   alert('nothing')
    // }
  }

  const handleOnChangeField = (e, rowID) => {
    const { name: fieldName, value } = e.target;

    setEditedRow({
      id: rowID,
      [fieldName]: value
    })
  }

  const handleCancelEditing = () => {
    setIsEditMode(undefined);
    setEditedRow(undefined);
    setOpen(undefined);
  }

  const handleSaveRowChanges = () => {
    console.log('save row changes');
    let newObject = {}
    setTimeout(() => {
      setIsEditMode(undefined);

      const newData = rowsState.map(row => {
        if (row._id === editedRow.id) {
          newObject.name = name || row.name;
          newObject.dob = dob || row.dob;
          newObject.email = email || row.email;
          newObject.result = result || row.result;

          // console.log(name, dob, email, result);
        }

        return row;
      })

     console.log(newObject);

      //PUT newData to API
      
        fetch(`https://murmuring-ridge-59282.herokuapp.com/candidates/${editedRow.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newObject)
        })
          .then(res => res.json())
          .then(data => {
            // alert('Successfully updated');
            // console.log('data', data);
            if (data) {
              setOpen(undefined)
            }
          }
      )
      setRowsState(newData);
      setEditedRow(undefined)
      
    }, 1000)
  }
// console.log(result);
  
  return (
    <div className='overflow-x-auto overflow-y-hidden'>
      <h1 className='text-xl font-medium mb-10 md:mb-2 text-center md:text-left'>Data of { rowsState?.length} Candidates</h1>
      <table className='w-full table'>
        <thead >
        <tr>
          {columns.map((column) => {
            return <th key={column.field}>{ column.fieldName }</th>
          })}
                  </tr>
        </thead>
        <tbody>
          {rowsState.map((row, index) => {
          
          if (index < pageSize) {
            return <tr key={row._id}>
              <td>
                {index + 1}
              </td>
              <td>
                { isEditMode && rowIDToEdit === row._id
                  ? <input
                    className='input input-bordered w-full max-w-xs'
                    type='text'
                    defaultValue={editedRow ? editedRow.name : row.name}
                    id={row._id}
                    name='name'
                    onChange={(e) => {
                      handleOnChangeField(e, row._id)
                      setName(e.target.value)
                    } }
                  />
                  : row.name
                }
              </td>
              <td>
                { isEditMode && rowIDToEdit === row._id
                  ? <input
                  className='input input-bordered w-full max-w-xs'
                    type='date'
                    defaultValue={editedRow ? editedRow.dob : row.dob}
                    id={row._id}
                    name='dob'
                    onChange={(e) => {
                      handleOnChangeField(e, row._id)
                      setDob(e.target.value)
                    } }
                  />
                  : row.dob
                }
              </td>
              <td className='col-span-2'>
                { isEditMode && rowIDToEdit === row._id
                  ? <input
                  className='input input-bordered w-full max-w-xs'
                    onChange={e => {
                    handleOnChangeField(e, row._id)
                    setEmail(e.target.value)
                  }} name="email" defaultValue={row.email}>
                    
                  </input>
                  : row.email
                }
              </td>
              
              <td>
                { isEditMode && rowIDToEdit === row._id
                  ? <p
                    type='text'
                    // defaultValue=
                    id={row._id}
                    name='result'
                    
                  >{result ? result : row.result}</p>
                  : row.result
                }
              </td>
                <td>
                    <div className="dropdown dropdown-end">
                  <label onClick={() => {
                    // setOpen(open)

                    setRowID(row._id)
                    // handleEdit(row._id)
                        }} tabIndex="0" className="m-1"><TiArrowSortedDown className='ml-5 mt-1'/></label>
                        <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li onClick={() => {
                      setResult("Shortlist")
                      setEditedRow({
                        id: rowID,
                        result: result
                      })
                            }}><a>Shortlist</a></li>
                    <li onClick={() => {
                      setResult("Reject")
                      setEditedRow({
                        id: rowID,
                        result: result
                      })
                            }}><a>Reject</a></li>
                        </ul>
                    </div>
                </td>
              {actions &&
              <td>
                { isEditMode && rowIDToEdit === row._id
                  ? <button onClick={ () => handleSaveRowChanges() } className='custom-table__action-btn ' disabled={!editedRow}>
                    <BsSaveFill />
                  </button>
                  : <button  onClick={ () => handleEdit(row._id) } className='custom-table__action-btn'>
                    <BsPencilSquare />
                  </button>
                }

                { open && rowIDToEdit === row._id
                  ? <button onClick={() => handleCancelEditing()} className='custom-table__action-btn'>
                    <BsXSquareFill />
                  </button>
                  : <button onClick={() => handleRemoveRow(row._id)} className='custom-table__action-btn'>
                    <BsFillTrashFill />
                  </button>
                }
              </td>
              }
            </tr>
          }
        })}
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;