import "./todoCreater.css";
import { useState } from "react";

import Closer from "../../../assets/close_button.png";
import axios from "axios";

export const TodoCreater = ({ data, setData, hideCreater }) => {
  const [value, setValue] = useState("");

  const changeValue = (e) => {
    setValue(e.target.value);
  };

  const sendData = () => {
    const object = {
      name: value,
    };
    axios.post('https://61851c6723a2fe0017fff39d.mockapi.io/todos', object)
    
      const temp = [...data]
      temp.push(object)
      setData(temp)
      localStorage.setItem('data', JSON.stringify([...data], object))  
    }
    
      
  

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
              <button className="todoCreaterCreateButton" onClick={sendData}>Create</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
