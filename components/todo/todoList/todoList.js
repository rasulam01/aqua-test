import "./todoList.css";
import Create from "../../../assets/create.png";
import Edit from "../../../assets/edit.png";
import Delete from "../../../assets/delete.png";
import axios from "axios";
import { useState, useEffect } from "react";
import { TodoCreater } from "../todoCreater/todoCreater";

// Здесь расположен основной файл

export const TodoList = () => {
  // Объявляются переменные
  const [data, setData] = useState([]);
  const [createrVisible, setCreaterVisible] = useState(false);
  const [editingMode, setEditingMode] = useState(null);
  const [editingModeValue, setEditingModeValue] = useState("");

  // Получаем данные с бэка
  const getData = async () => {
    const response = await axios.get(
      "https://61851c6723a2fe0017fff39d.mockapi.io/todos"
    );
    setData(response.data);
  };

  // Функция редактирования
  const editData = (id) => {
    const updatedData = [...data].map((info) => {
      if (info.id === id) {
        info.name = editingModeValue;
      }
      return info;
    });
    setData(updatedData);
    setEditingMode(null);
    setEditingModeValue("");
  };

  // Функция удаления
  const deleteData = (id) => {
    axios.delete(`https://61851c6723a2fe0017fff39d.mockapi.io/todos/${id}`);
    const filtered = [...data].filter((item) => item.id !== id);
    console.log(data);
    setData(filtered);
  };

  // Делаем инпут контролируемым
  const setEditingValue = (e) => {
    setEditingModeValue(e.target.value);
  };

  // Рычаги видимости модального окна создания целей
  const showCreater = () => {
    setCreaterVisible(true);
  };

  const hideCreater = () => {
    setCreaterVisible(false);
  };

  // Запускаем получение данных при маунте компонента
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="todoList">
        <div className="todoListShell">
          <div className="todoListContent">
            <div className="todoListTitle">
              <div className="todoListTitleName">Goal Creator</div>{" "}
              <div>
                <img src={Create} alt="Create" onClick={showCreater} />
              </div>
            </div>
            <div className="todoListData">
              {data.map((info) => (
                <>
                  <li key={info.id} className="todoListDataContent">
                    {editingMode === info.id ? (
                      <>
                        <input
                          type="text"
                          value={editingModeValue}
                          onChange={setEditingValue}
                        />
                      </>
                    ) : (
                      <>
                        <div className="name">{info.name}</div>
                        <div className="time">{info.time}</div>
                      </>
                    )}
                    {editingMode ? (
                      <img
                        src={Edit}
                        alt="edit"
                        className="icon"
                        onClick={() => editData(info.id)}
                      />
                    ) : (
                      <img
                        src={Edit}
                        alt="edit"
                        className="icon"
                        onClick={() => setEditingMode(info.id)}
                      />
                    )}

                    <img
                      src={Delete}
                      alt="delete"
                      className="icon"
                      onClick={() => deleteData(info.id)}
                    />
                  </li>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
      {createrVisible ? (
        <>
          <TodoCreater
            data={data}
            setData={setData}
            hideCreater={hideCreater}
          />
          <div className="cover" onClick={hideCreater} />
        </>
      ) : null}
    </>
  );
};
