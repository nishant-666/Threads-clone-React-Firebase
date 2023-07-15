import { toast } from "react-toastify";

function Toast(title, type) {
  toast[type](title);
}

export default Toast;
