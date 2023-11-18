import { FormEvent, useState } from 'react'

import styles from "./styles.module.css"
import sharedStyles from "../sharedStyles.module.css";
import { UpdatedUserData, UserData } from '../../types/userData'
import Modal from '../Modals/Modal';

interface Props extends UpdatedUserData{
    // id: string,
    slno: number,
    // name: string | null,
    // age: number | null,
    // city: string | null,
    // pincode: string | null,
    handleDelete: (id:string)=>void
    handleEdit: ({id, newData}:{id: string, newData: UserData})=>void
}

const TableItem = ({id,slno,name, age, city,pinCode,handleDelete,handleEdit}: Props) => {
    const [showDeleteModal,setShowDeleteModal] = useState(false);
    const [showEditModal,setShowEditModal] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get('name') as string;
        const age = parseInt(formData.get('age') as string, 10) || null;
        const city = formData.get('city') as string;
        const pinCode = formData.get('pinCode') as string;

        console.log(age)
        const newData = {name,age,city,pinCode};
        handleEdit({id, newData})

        setShowEditModal(false)
    }
    return (
    <>
        <td className={sharedStyles.column}>
            {slno}
        </td>
        <td className={sharedStyles.column}>
            {name || '-'}
        </td>
        <td className={sharedStyles.column}>
            {age || '-'}
        </td>
        <td className={sharedStyles.column}>
            {city || '-'}
        </td>
        <td className={sharedStyles.column}>
            {pinCode || '-'}
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
                <Modal header={`Delete ${slno}`}>
                    <div className={styles.modal_action_container}>
                    <button className={styles.modal_action_button} onClick={()=>setShowDeleteModal(false)}>Cancel</button>
                    <button className={styles.modal_action_button}
                    onClick={()=>{
                        setShowDeleteModal(false)
                        handleDelete(id);
                    }}
                    >Confirm</button>
                </div>
                </Modal>
            ): null
        }

        {
            showEditModal ? (
                <Modal header={`Edit ${slno}`}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={styles.label} htmlFor="name">Name</label>
                    <input className={styles.input} type="text" id="name" name="name" placeholder="Name.." defaultValue={name || ''}/>

                    <label className={styles.label} htmlFor="age">Age</label>
                    <input className={styles.input} type="number" id="age" name="age" placeholder="Age" defaultValue={age || 0}/>

                    <label className={styles.label} htmlFor="city">City</label>
                    <input className={styles.input} type="text" id="city" name="city" placeholder="City" defaultValue={city || ''}/>

                    <label className={styles.label} htmlFor="pincode">Pincode</label>
                    <input className={styles.input} type="text" id="pincode" name="pincode" placeholder="Pincode" defaultValue={pinCode || ''}/>
                
                <div className={styles.modal_action_container}>
                    <button type='button' className={styles.modal_action_button} onClick={()=>setShowEditModal(false)}>Cancel</button>
                    <button type='submit' className={styles.modal_action_button}
                    >Confirm</button>
                </div>
                </form>
                </Modal>
            ): null
        }
    </>
  )
}

export default TableItem