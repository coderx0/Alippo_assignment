import { useEffect, useState } from "react";
import DataTable from "./components/DataTable/DataTable";
import { UpdatedUserData, UserData } from "./types/userData";
import styles from "./styles.module.css";

export default function Home() {
  const [data, setData] = useState<UpdatedUserData[]>([]); // Provide initial type

  useEffect(() => {
    fetch('https://assets.alippo.com/catalog/static/data.json')
      .then(resp => resp.json())
      .then((fetchedData: UserData[]) => {
        const dataWithId: UpdatedUserData[] = fetchedData.map(item => ({
          ...item,
          id: `${item.name || '-'}${item.pinCode}`,
        }));
        setData(dataWithId);
      });
  }, []);


  return (
    <main className={styles.container}>
      <h3>Alippo Assignment</h3>
      {
        data.length === 0 ? (
          <div>
            Loading...
          </div>
        ) : <DataTable userData={data}/>
      }
      
    </main>
  );
}
