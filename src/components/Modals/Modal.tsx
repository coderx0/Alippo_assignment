import {createPortal} from 'react-dom'

import { ReactNode } from "react";
import styles from "./styles.module.css";

interface Props{
    header: string,
    children: ReactNode,
    closeModal: ()=>void
}
const Modal = ({header, closeModal,children}: Props) => {
  const portalRoot = document.getElementById('portal-root');

  if (!portalRoot) {
    console.error("Portal root element not found. Make sure to add a div with id 'portal-root' to your HTML.");
    return null;
  }

  return createPortal(
    <div className={styles.modal} onClick={closeModal}>
        <div className={`${styles.modal_container} ${styles.slide_in_top}`} onClick={e=>e.stopPropagation()}>
        <h4 className={styles.modal_header}>{header}</h4>
        {children}
        </div>
    </div>, portalRoot
  )
}

export default Modal