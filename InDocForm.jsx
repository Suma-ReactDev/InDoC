import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";
import UserService from "../services/user.service";
import { useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';


const InDocForm = () => {
  const [user, setUser] = useState({});

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  // const {pathname} = useLocation();
  const {id} = useParams();
  // console.log(pathname);
  // console.log(id);
  const editMode = id;
  // console.log(editMode);

  const onSubmitHandler = (data) => {
    const jsonData = JSON.stringify(data);
    console.log("JSONDATA", jsonData);
    editMode
      ? UserService.updateDoc(id, jsonData)
      : UserService.postInDocForm(jsonData);
    reset();
  }

  useEffect(() => {
    if (editMode) {
        // get user and set form fields
        UserService.getById(id).then(response => {
            const item= response.data;
            const fields = ['id', 'indocDate', 'ionDate', 'fromWhom', 'subj', 'toWhom', 'status'];
            fields.forEach(field => setValue(field, item[field]));
            setUser(response.data);
        });
    }
}, []);

  return (
    <div className="col-md-12 w-50 card container card border-primary p-3">
        <form onSubmit={handleSubmit(onSubmitHandler)} className="jumbotron">
          <div className="form-group">
            <label>S.NO</label>
            <input
              name="id"
              type="number"
              {...register("id", {
                required: "Please Enter Reference Number!",
              })}
              className={`form-control ${errors.id ? "is-invalid" : ""}`}
            />
            {/* <div className='invalid-feedback'>{errors.id?.message}</div> */}
            <ErrorMessage
              errors={errors}
              name="id"
              as="p"
              className="invalid-feedback"
            />
          </div>
          <div className="form-group">
            <label>InDoc Date</label>
            <input
              name="indocDate"
              type="date"
              {...register("indocDate", {
                required: "Please select DOC Received Date",
              })}
              className={`form-control ${errors.indocDate ? "is-invalid" : ""}`}
            />
            {/* <div className='invalid-feedback'>{errors.indocDate?.message}</div> */}
            <ErrorMessage
              errors={errors}
              name="indocDate"
              as="p"
              className="invalid-feedback"
            />
          </div>

          <div className="form-group">
            <label>ION Date</label>
            <input
              name="ionDate"
              type="date"
              {...register("ionDate", {
                required: "Please select ION Date",
              })}
              className={`form-control ${errors.ionDate ? "is-invalid" : ""}`}
            />
            {/* <div className='invalid-feedback'>{errors.ionDate?.message}</div> */}
            <ErrorMessage
              errors={errors}
              name="ionDate"
              as="p"
              className="invalid-feedback"
            />
          </div>

          <div className="form-group">
            <label>Div/Dir</label>
            <input
              name="fromWhom"
              type="text"
              {...register("fromWhom", {
                required: "Directorate/Division is required",
              })}
              className={`form-control ${errors.fromWhom ? "is-invalid" : ""}`}
            />
            {/* <div className='invalid-feedback'>{errors.fromWhom?.message}</div> */}
            <ErrorMessage
              errors={errors}
              name="fromWhom"
              as="p"
              className="invalid-feedback"
            />
          </div>

          <div className="form-group">
            <label>Subject</label>
            <input
              name="subj"
              type="text"
              {...register("subj", {
                required: "Subject is required",
              })}
              className={`form-control ${errors.subj ? "is-invalid" : ""}`}
            />
            {/* <div className='invalid-feedback'>{errors.subj?.message}</div> */}
            <ErrorMessage
              errors={errors}
              name="subj"
              as="p"
              className="invalid-feedback"
            />
          </div>

          <div className="form-group">
            <label>Forwarded To</label>
            <input
              name="toWhom"
              type="text"
              {...register("toWhom", {
                required: "This field is required",
              })}
              className={`form-control ${errors.toWhom ? "is-invalid" : ""}`}
            />
            {/* <div className='invalid-feedback'>{errors.toWhom?.message}</div> */}
            <ErrorMessage
              errors={errors}
              name="toWhom"
              as="p"
              className="invalid-feedback"
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <input
              name="status"
              type="text"
              {...register("status", {
                required: "Please specify Status!",
              })}
              className={`form-control ${errors.status ? "is-invalid" : ""}`}
            />
            {/* <div className='invalid-feedback'>{errors.status?.message}</div> */}
            <ErrorMessage
              errors={errors}
              name="status"
              as="p"
              className="invalid-feedback"
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              type="button"
              onClick={reset}
              className="btn btn-warning float-right"
            >
              Reset
            </button>
          </div>
        </form>
    </div>
  );
}

export default InDocForm