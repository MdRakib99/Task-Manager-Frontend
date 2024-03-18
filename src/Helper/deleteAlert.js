import Swal from "sweetalert2";
import { taskDeleteRequest } from "../APIRequest/apiRequest";
export function deleteTask(id) {
  return Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to rever this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Delete It!",
  }).then((result) => {
    if (result.isConfirmed) {
      // Delete

      return taskDeleteRequest(id).then((deleteResult) => {
        return deleteResult;
      });
    }
  });
}
