import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./form.js";

const Employee = () => {
  const [values, setValues] = useState([
    {
      id: "",
      state: "",
      name: "",
      status: "",
      legislative_process: "",
      time: "",
      details: "",
    },
  ]);
  const [editLow, setEditLow] = React.useState({
    id: "",
    state: "",
    name: "",
    status: "",
    legislative_process: "",
    time: "",
    details: "",
  });
  const [isActive, setIsActive] = useState(true);
  const [keyWord, setKeyWord] = useState("");
  const [selectedState, setSelectedState] = useState(null);
  const blank = {
    id: "",
    state: "",
    name: "",
    status: "",
    legislative_process: "",
    time: "",
    details: "",
  };

  ///////////////
  ///update data
  //////////////
  useEffect(() => {
    getInfo();
  }, []);

  //////////////////
  //// get data
  /////////////////
  const getInfo = async () => {
    const response = await fetch("https://employee-backends.herokuapp.com/emp");
    const result = await response.json();
    // console.log(result);
    setValues(result);
  };

  ////////////////
  /// add new data
  //////////////
  const handleCreate = async (data) => {
    const response = await fetch(
      "https://employee-backends.herokuapp.com/emp/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    getInfo(); // Update the list
  };

  ////////////////
  ////Delete
  ///////////////
  const handleDelete = async (id) => {
    const response = await fetch(
      `https://employee-backends.herokuapp.com/emp/${id}`,
      {
        method: "DELETE",
      }
    );
    console.log(response);
    getInfo(); // Update the list
  };

  ////////////////
  //edit
  ///////////////
  const handleSelect = async (data) => {
    setIsActive(false);
    setEditLow(data);
  };

  const handleEdit = async (data) => {
    setIsActive(true);
    const response = await fetch(
      `https://employee-backends.herokuapp.com/emp/${data._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    console.log(data);
    getInfo();
  };

  /////////////
  //fillter
  ////////////
  const searchHandler = (e) => {
    setKeyWord(e.target.value);
  };

  const searchState = (keyWord) => {
    return (x) => {
      return x.state.toLowerCase().includes(keyWord.toLowerCase()) || !keyWord;
    };
  };
  return (
    <div className="container-fluid">
      <h1>Employee</h1>
      <nav>
        {isActive ? (
          <article>
            <div className="title">
              <h4>Add</h4>
            </div>
            <Form
              className="form"
              initial={blank}
              handleSubmit={handleCreate}
            ></Form>
          </article>
        ) : (
          <article>
            <h4>Edit</h4>
            <Form
              className="form"
              initial={editLow}
              handleSubmit={handleEdit}
            />
          </article>
        )}
      </nav>
      <hr />
      <h2>State List</h2>
      <span class="input">
        <input
          className="form-control form-control-lg"
          type="text"
          onChange={searchHandler}
          placeholder="Search by title..."
          value={keyWord}
        />
        <span></span>
      </span>
      <table>
        <thead>
          <tr className="table-headers">
            <th>ID</th>
            <th>State</th>
            <th>Time</th>
            <th>Name</th>
            <th>Status</th>
            <th>Legislative Process</th>
            <th>Button</th>
          </tr>
        </thead>
        {values.filter(searchState(keyWord)).map((item) => {
          console.log(item);
          const {
            id,
            state,
            time,
            name,
            status,
            legislative_process,
            details,
          } = item;
          return (
            <tbody>
              <tr>
                <td>{id}</td>
                <td>{state}</td>
                <td>{time}</td>
                <td>{name}</td>
                <td>{status}</td>
                <td>{legislative_process}</td>
                <td>
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => {
                      handleDelete(item._id);
                    }}
                  >
                    DELETE
                  </button>
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => {
                      handleSelect(item);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default Employee;
