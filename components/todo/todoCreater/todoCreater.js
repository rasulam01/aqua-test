import "./todoCreater.css";
import { useState } from "react";
import Closer from "../../../assets/close_button.png";
import axios from "axios";

export const TodoCreater = ({ data, setData, hideCreater }) => {
  const [value, setValue] = useState("");
  const [done, setDone] = useState(false);
  // Переменные

  // Контролируемый инпут
  const changeValue = (e) => {
    setValue(e.target.value);
  };

  // Функция отправки объекта с содержанием в бэк
  const sendData = () => {
    // Объект: 1) name - текст; 2) time: время на момент создания; 3) done - состояние. В клиенте отображается полосой справа.
    const object = {
      name: value,
      time: new Date().toLocaleString(),
      done: done,
    };
    axios.post("https://61851c6723a2fe0017fff39d.mockapi.io/todos", object);

    // Добавление объекта в массив с целью вызвать ре-рендер
    const temp = [...data];
    temp.push(object);
    setData(temp);
  };

  return (
    <>
      <div className="todoCreater">
        <div className="todoCreaterShell">
          <div className="todoCreaterContent">
            <div className="todoCreaterTitleName">
              Create your goal{" "}
              <img src={Closer} alt="Close" onClick={hideCreater} />
            </div>
            <div>
              <input
                type="text"
                placeholder="Goal name?"
                value={value}
                onChange={changeValue}
                autoFocus
              />
            </div>
            <div>
              <button className="todoCreaterCreateButton" onClick={sendData}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
