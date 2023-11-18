import { useEffect, useState } from "react";
import DataTable from "./components/DataTable/DataTable";
import { UpdatedUserData, UserData } from "./types/userData";
import styles from "./styles.module.css";

export default function Home() {
  const [data, setData] = useState<UpdatedUserData[]>([]);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('https://assets.alippo.com/catalog/static/data.json')
      .then(resp => resp.json())
      .then((fetchedData: UserData[]) => {
        const dataWithId: UpdatedUserData[] = fetchedData.map(item => ({
          ...item,
          id: `${item.name || '-'}${item.pinCode}`, // adding unique id to each element
        }));
        setData(dataWithId);
        setLoading(false);
      })
      .catch(()=>{
        setLoading(false);
      })
  }, []);


  if(loading){
    return (
      <main className={styles.container}>
        <h3>Loading...</h3>
      </main>
    )
  }

  return (
    <main className={styles.container}>
      <h3 className={styles.header}>User Data</h3>
      {
        data.length === 0 ? (<div>No data</div>):
        <DataTable userData={data}/>
      }
    </main>
  );
}
