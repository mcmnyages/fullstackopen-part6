import { useContext } from "react";
import NotificationContext from "../NotifificationContext";

const useNotify =()=> useContext(NotificationContext)

export default useNotify
