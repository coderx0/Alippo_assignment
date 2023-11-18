import { ReactNode } from "react";
import styles from "./styles.module.css";

interface Props{
    header: string,
    children: ReactNode
}
const Modal = ({header, children}: Props) => {
  return (
    <div className={styles.modal}>
        <div className={styles.modal_container}>
        <h4 className={styles.modal_header}>{header}</h4>
        {children}
        </div>
    </div>
  )
}

export default Modal