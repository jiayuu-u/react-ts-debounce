import "./styles.css";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Item from "./Item";

export interface ToDoItem {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export default function App() {
  const [value, setValue] = useState("");
  const [datas, setDatas] = useState<ToDoItem[]>([]);
  const [result, setResult] = useState<ToDoItem[]>([]);

  const filterResult = (searchValue: string) => {
    const resultData = datas.filter(({ title }) =>
      title.toLowerCase().includes(searchValue)
    );
    return resultData;
  };

  const sliceResult = (dataArray: ToDoItem[]) => {
    return dataArray.slice(0, 10);
  };

  const sliceAndReverseResult = (dataArray: ToDoItem[]) => {
    return sliceResult(dataArray.reverse());
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );
        setDatas(response.data);
        setResult(sliceAndReverseResult(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const debounce = (func: Function, delay: number) => {
    let timerId: ReturnType<typeof setTimeout>;
    return function (...args: any[]) {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleDebounceFn = (searchValue: string) => {
    console.log(searchValue);
    if (searchValue) {
      const result = filterResult(searchValue);
      setResult(sliceAndReverseResult(result));
    }
  };

  const debounceFn = useCallback(debounce(handleDebounceFn, 1000), []);

  useEffect(() => {
    if (value !== "") {
      debounceFn(value);
    }
    setResult(sliceAndReverseResult(datas));
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    debounceFn(event.target.value);
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <label>Search Box: </label>
      <input value={value} onChange={(e) => handleChange(e)} />
      {result.length ? (
        <ul>
          {result.map(({ userId, id, title, completed }) => (
            <Item
              key={id}
              id={id}
              userId={userId}
              title={title}
              completed={completed}
            />
          ))}
        </ul>
      ) : (
        <p style={{ color: "red" }}>No result</p>
      )}
    </div>
  );
}
