import { FormEvent, useState } from 'react'

import styles from "./styles.module.css"
import sharedStyles from "../sharedStyles.module.css";
import { UpdatedUserData, UserData } from '../../types/userData'
import Modal from '../Modals/Modal';

interface Props{
    user: UpdatedUserData
    slno: number,
    handleDelete: (id:string)=>void
    handleEdit: ({id, newData}:{id: string, newData: UserData})=>void
}

const TableItem = ({slno,user,handleDelete,handleEdit}: Props) => {
    const [showDeleteModal,setShowDeleteModal] = useState(false);
    const [showEditModal,setShowEditModal] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        
        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get('name') as string;
        const age = parseInt(formData.get('age') as string, 10) || null;
        const city = formData.get('city') as string;
        const pinCode = formData.get('pinCode') as string;

        const newData = {name,age,city,pinCode};
        handleEdit({id: user.id, newData})

        setShowEditModal(false)
    }
    return (
    <>
        <td className={sharedStyles.column}>
            {slno}
        </td>
        <td className={sharedStyles.column}>
            {user.name || '-'}
        </td>
        <td className={sharedStyles.column}>
            {user.age || '-'}
        </td>
        <td className={sharedStyles.column}>
            {user.city || '-'}
        </td>
        <td className={sharedStyles.column}>
            {user.pinCode || '-'}
        </td>
        <td className={`${sharedStyles.column} ${styles.action_container}`}>
            <button className={styles.button} onClick={()=>setShowEditModal(true)}>
                Edit
            </button>
            <button className={styles.button} onClick={()=>setShowDeleteModal(true)}>
                Delete
            </button>
        </td>

        {
            showDeleteModal ? (
                <Modal header={`Delete ${slno}`} closeModal={()=>setShowDeleteModal(false)}>
                    <div className={styles.modal_action_container}>
                    <button className={styles.modal_action_button} onClick={()=>setShowDeleteModal(false)}>Cancel</button>
                    <button className={styles.modal_action_button}
                    onClick={()=>{
                        setShowDeleteModal(false)
                        handleDelete(user.id);
                    }}
                    >Confirm</button>
                </div>
                </Modal>
            ): null
        }

        {
            showEditModal ? (
                <Modal header={`Edit ${slno}`} closeModal={()=>setShowEditModal(false)}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={styles.label} htmlFor="name">Name</label>
                    <input className={styles.input} type="text" id="name" name="name" placeholder="Name" defaultValue={user.name || ''}/>

                    <label className={styles.label} htmlFor="age">Age</label>
                    <input className={styles.input} type="number" id="age" name="age" placeholder="Age" defaultValue={user.age || 0}/>

                    <label className={styles.label} htmlFor="city">City</label>
                    <input className={styles.input} type="text" id="city" name="city" placeholder="City" defaultValue={user.city || ''}/>

                    <label className={styles.label} htmlFor="pincode">Pincode</label>
                    <input className={styles.input} type="text" id="pincode" name="pincode" placeholder="Pincode" defaultValue={user.pinCode || ''}/>
                
                <div className={styles.modal_action_container}>
                    <button type='button' className={styles.modal_action_button} onClick={()=>setShowEditModal(false)}>Cancel</button>
                    <button type='submit' className={styles.modal_action_button}>Confirm</button>
                </div>
                </form>
                </Modal>
            ): null
        }
    </>
  )
}

export default TableItem