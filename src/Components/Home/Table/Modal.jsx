import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Modal = ({ setAddItem }) => {
    const [open, setOpen] = useState(null)
    const addHandleItem = e => {
        e.preventDefault();


        const newData = {
            name: e.target.name.value,
            dob: e.target.dob.value,
            email: e.target.email.value,
            hobby: e.target.hobby.value
        }



        fetch('https://murmuring-ridge-59282.herokuapp.com/candidates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        }).then(res => res.json())
            .then(data => {
                toast.success("Candidate successfully added");
                e.target.reset()
                setAddItem(null)
            }
            )
    }
    return (
        <div>
            <input type="checkbox" id="my-modal-6" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <label for="my-modal-6" class="btn btn-sm text-white btn-primary btn-circle absolute right-2 top-2">✕</label>
                    <form className='mt-5' onSubmit={addHandleItem}>
                        <input type="text" name='name' placeholder="Your Name" class="input input-bordered mt-5 input-primary w-full " required />
                        <input type="text" name='dob' placeholder="Your Phone Number" class="input input-bordered mt-5 input-primary w-full " required />
                        <input type="email" name='email' placeholder="Your Email" class="input input-bordered mt-5 input-primary w-full" required />
                        <input type="text" name='hobby' placeholder="Hobbies" class="input input-bordered mt-5 input-primary w-full " required />
                        <input type="submit" for="my-modal-6" class="mt-4 ml-4 md:ml-0 flex items-center btn w-48 btn-primary text-white" value="Save button" />

                    </form>
                </div>

            </div>
        </div>
    );
};

export default Modal;