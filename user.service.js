import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8081/api/test/";
const DocAPI_URL = "http://localhost:8081/api/doc/"

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getInDocBoard = () => {
  return axios.get(DocAPI_URL + "dcdt", { headers: authHeader() });
}

const postInDocForm = (data) => {
  const storageItem =authHeader();
  console.log(storageItem);
  return axios.post(DocAPI_URL + "ad", data,
    { headers: { 
        "Content-type": "application/json" ,
        "Authorization":storageItem.Authorization} })
     .then((response) => {console.log(response)});
    ;
}

const deleteDoc = (id) =>{
  console.log(id);
  const storageItem =authHeader();
  console.log(storageItem);
  console.log('Delete Button Clicked!')
  return axios.delete(DocAPI_URL + `dcdt/${id}`,
    { 
      headers: { 
      "Content-type": "application/json" ,
      "Authorization":storageItem.Authorization} 
    }).then((response)=>{console.log(response)})
    .then((response)=>{getInDocBoard()});
   
}

const updateDoc = (id,data) =>{
  const storageItem =authHeader();
  console.log(storageItem);
  console.log('Edit Button Clicked!')
  return axios.put(DocAPI_URL + `dcdt/${id}`,data,
  { 
    headers: { 
    "Content-type": "application/json" ,
    "Authorization":storageItem.Authorization} 
  }).then((response)=>{console.log(response)});
}

const getById=(id)=>{

  console.log('Inside getById',id)
  return axios.get(DocAPI_URL + `dcdt/${id}`,
  {
    headers: { 
      "Content-type": "application/json" ,
      "Authorization":authHeader().Authorization} 
  })
  // .then((response)=>{console.log(response.data)})
  // .then((data)=>{console.log(data)});
}

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getInDocBoard,
  postInDocForm,
  DocAPI_URL,
  deleteDoc,
  updateDoc,
  getById
};

export default UserService;