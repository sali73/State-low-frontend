import React from "react";
import "./App.css";

export default (props) => {
  const [formData, setFormData] = React.useState(props.initial);

  React.useEffect(() => {
    setFormData(props.initial);
  }, [props.initial]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div id="form_login">
        <div className="form-group w-50 " id="parent">
          <input
            type="text"
            name="id"
            value={formData.id}
            placeholder="ID"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group w-50">
          <input
            type="text"
            name="state"
            value={formData.state}
            placeholder="State"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group w-50">
          <input
            type="text"
            name="time"
            value={formData.time}
            placeholder="Time"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group w-50">
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Name"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group w-50">
          <input
            type="text"
            name="status"
            value={formData.status}
            placeholder="Status"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group w-50">
          <input
            type="text"
            name="legislative_process"
            value={formData.legislative_process}
            placeholder="Legislative Process"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button
          className="btn btn-danger me-2 sub"
          onClick={() => {
            props.handleSubmit(formData);
            setFormData(props.initial);
          }}
        >
          SUBMIT
        </button>
      </div>
    </>
  );
};
