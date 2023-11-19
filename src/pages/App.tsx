import { useEffect, useState } from "react";
import DataTable from "../components/DataTable/DataTable";
import { UpdatedUserData, UserData } from "../types/userData";
import styles from "./styles.module.css";
import {Toaster} from "sonner";

const PUBLIC_DATA_URL = 'https://assets.alippo.com/catalog/static/data.json'

export default function Home() {
  const [data, setData] = useState<UpdatedUserData[]>([]);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(PUBLIC_DATA_URL)
      .then(resp => resp.json())
      .then((fetchedData: UserData[] | null) => {
        // adding unique id to each element
        try {
          if (fetchedData) {
            const dataWithId: UpdatedUserData[] = fetchedData.map((item) => ({
              ...item,
              id: `${item.name || "-"}${item.pinCode}`,
            }));
            setData(dataWithId);
          } else {
            throw new Error("Some error happened");
          }
        } catch (error) {
          console.error("Error processing data:", error);
        } finally {
          setLoading(false);
        }
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
      <Toaster richColors/>
    </main>
  );
}
