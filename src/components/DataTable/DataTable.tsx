import { useState } from 'react'
import styles from "./styles.module.css"
import sharedStyles from "../sharedStyles.module.css";
import TableItem from '../TableItem/TableItem'
import { UpdatedUserData, UserData } from '../../types/userData'
import {toast} from 'sonner';

interface Props{
    userData: UpdatedUserData[]
}


const DataTable = ({userData}: Props) => {
  const [data,setData] = useState(userData);

  const handleDelete = (id:string)=>{
    setData(prev=> prev.filter(data=>data.id !== id))
    toast.success("Deleted Successfully!")
  }

  const handleEdit = ({id, newData}: {id: string, newData: UserData})=>{
    setData((prevData)=>{
      return prevData.map(item=>{
        if(item.id === id){
          return {...item,...newData};
        }
        return item;
      })
    })
    toast.success("Edited Successfully!")
  }

  return (
     <div className={styles.main_container}>
      <table className={styles.table_container}>
        <thead className={styles.table_head}>
          <tr className={`${styles.table_row} ${styles.row_header}`}>
          <th className={sharedStyles.column}>Sl. No</th>
          <th className={sharedStyles.column}>Name</th>
          <th className={sharedStyles.column}>Age</th>
          <th className={sharedStyles.column}>City</th>
          <th className={sharedStyles.column}>Pincode</th>
          <th className={sharedStyles.column}>Actions</th>
          </tr>
        </thead>
      <tbody className={styles.table_body}>
      {
        data.map((user,idx)=>(
          <tr key={user.id} className={styles.table_row}>
            <TableItem 
              user={user}
              slno={idx} 
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              />
          </tr>
        ))
      }
      </tbody>
      </table>
     </div>
  )
}

export default DataTable