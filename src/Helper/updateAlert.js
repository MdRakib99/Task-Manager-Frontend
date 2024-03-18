import Swal from "sweetalert2";
import { taskUpdateRequest } from "../APIRequest/apiRequest";

export function updateTask(id, status) {
  return Swal.fire({
    title: "Change Status?",
    input: "select",
    inputOptions: {
      new: "new",
      complete: "complete",
      progress: "progress",
      cancel: "cancel",
    },
    inputValue: status,
  }).then((result) => {
    return taskUpdateRequest(id, result.value).then((res) => {
      return res;
    });
  });
}
