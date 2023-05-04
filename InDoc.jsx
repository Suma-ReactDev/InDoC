import React, { useState, useEffect } from "react";
import {FaEdit, FaTrash} from 'react-icons/fa';
import { useLocation, Link } from "react-router-dom";
import {DataGrid} from '@mui/x-data-grid';

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import Button from "../UI/Button";

const InDoc = () => {
  const [content, setContent] = useState([]);
  const {pathname} = useLocation();
  // console.log(pathname);
  // console.log(useLocation());
  useEffect(() => {
    UserService.getInDocBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);
  console.log(content);
  
  return (
    <div className="container ">
      <Link to={`${pathname}/add`}>Add a New Doc</Link>
        <table className="table table-striped">
          <thead className="table-dark " >
            <tr >
              <td>S.No</td>
              <td>In Date</td>
              <td>ION Date</td>
              <td>Dept</td>
              <td>Subject</td>
              <td>Forwarded To</td>
              <td>Status</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>{content? content.map(({id,indocDate,ionDate,subj,toWhom,fromWhom,status})=>{
              return <tr key={id}>
                <td>{id}</td>
                <td>{indocDate}</td>
                <td>{ionDate}</td>
                <td>{subj}</td>
                <td>{toWhom}</td>
                <td>{fromWhom}</td>
                <td>{status}</td>
                <td>
                  {/* <Button className='btn-primary'
                            btnName={<FaEdit />}
                            onClick={()=>{UserService.updateDoc(id)}}/> */}
                    <Link to={`${pathname}/edit/${id}`} 
                    className='btn badge badge-pill p-2 btn-primary'
                    >
                      <FaEdit />
                    </Link>
                    <Button className='btn-danger'
                            btnName={<FaTrash />} 
                            onClick={()=>{UserService.deleteDoc(id)}}/></td>
              </tr>
            }):null}
          </tbody>
        </table>
    </div>
  )
}

export default InDoc