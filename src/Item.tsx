import { ToDoItem } from "./App";

const Item = ({ id, userId, title, completed }: ToDoItem) => {
  return (
    <li>
      <p>Id: {id}</p>
      <p>Title: {title}</p>
      <p>UserId: {userId}</p>
      <p>Status: {completed ? "Completed" : "Not Completed"}</p>
    </li>
  );
};

export default Item;
