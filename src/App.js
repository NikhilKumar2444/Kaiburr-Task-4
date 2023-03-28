import './App.css';
import axios from 'axios';
import { useState,useEffect } from 'react';
import Navbar from './Navbar';


function App() {
  const [IDDel,setIDDel]=useState('');
  const [IDGet,setIDGet]=useState('');
  const [individualStu,setIndividualStu]=useState({fullname:"",ID:"",framework:"",language:""});


  const [newStu,setNewStu]=useState({framework:"",language:"",fullname:"",ID:""});
  const handleData=(e)=>{
    setNewStu({...newStu,[e.target.name]:e.target.value});
  }

  const handleOCIDGet=(event)=>{
    setIDGet(event.target.value);
  }
  const handleChangedel=(event)=>{
      setIDDel(event.target.value);
  }

  const createNewStudent=async(e)=>{
    try{
      const res=await axios.post("http://localhost:8080/students/register",newStu)
      .then((res)=>{
        alert("Created!");
      }).catch((error)=>{
        alert("Please use a different ID number")
      });
      
    }catch(e){
      console.log(e);
    }
  }
  const getByID=async(e)=>{
    try{
      axios.get(`http://localhost:8080/students/${IDGet}`)
      .then((res)=>{
        setIndividualStu(res.data);
      }).catch((error)=>{
        alert("Unable to find student!");
      });
      
    }
    catch(e){
      console.log(e);
    }
  }

  const deleteByID=async(e)=>{
    try{
      axios.delete(`http://localhost:8080/students/delete/${IDDel}`)
      .then((res)=>{
        alert("Successfully Removed")
      }).catch((error)=>{
        alert("Student is not in records")
      });
    }catch(e){
      console.log(e);
    }
  }

const [items,setItems]=useState([]);
useEffect(()=>{
  fetch("http://localhost:8080/students")
  .then((res)=>res.json())
  .then((data)=>setItems(data))
})
  
  
  
  return (
    
    <>
    <Navbar/>
    <div className='flex justify-center items-center text-2xl m-10'>
    <h1>Welcome to student info</h1>
    </div>

    <div className='flex' style={{backgroundColor:"#f6fceb",widht:"100vw",overflowX:"scroll",height:"auto"}}>
    {
      items.map(items=>(
        <div className='m-2' style={{border:"2px solid orange",borderRadius:"10px"}}>
          <div className='flex m-2'>
            <div className='text-xl'>ID:-</div>
            <div className='text-xl'>{items.ID}</div>
          </div>
          <div className='flex m-2'>
            <div className='text-xl'>Name:-</div>
            <div className='text-xl'>{items.fullname}</div>
          </div>
          <div className='flex m-2'>
            <div className='text-xl'>Language:-</div>
            <div className='text-xl'>{items.language}</div>
          </div>
          <div className='flex m-2'>
            <div className='text-xl'>Framework:-</div>
            <div className='text-xl'>{items.framework}</div>
          </div>
        </div>
      ))
    }
    </div>
    <h1 className='flex justify-center items-center text-2xl m-10'>Create new </h1>
    <div className='md:flex justify-center items-center text-2xl m-10'>
        <div className='Reg' style={{border:"1px solid lightgreen",borderRadius:"10px"}}>
          
          <input style={{border:"none"}} name="ID" onChange={handleData} placeholder="ID"></input>
          <input style={{border:"none"}} name="fullname" onChange={handleData} placeholder="Name"></input>
          <input style={{border:"none"}} name="language" onChange={handleData} placeholder="Language"></input>
          <input onChange={handleData} name="framework" style={{border:"none"}} placeholder="Framework"></input>
          <button type="button" onClick={createNewStudent} style={{color:"black"}} className="btn btn-success">Create new</button>
        </div>
    </div>

    <div className='md:flex justify-center items-center text-2xl m-10'>
        <h1 className='mr-2'>Delete by ID:</h1>
        <input input="text" value={IDDel} placeholder="Enter ID to remove" onChange={handleChangedel} style={{outline:"none"}} ></input>
        <button type="button" className="btn btn-danger" style={{color:"black"}} onClick={deleteByID}>Delete Student</button>
    </div>
    <div style={{backgroundColor:"gray"}}>
    <h1 className='md:flex justify-center items-center text-2xl m-10' style={{color:"white"}}>Find by ID</h1>
    <div className='md:flex justify-center items-center text-2xl m-10'>
        <div className=''>
          <input type="text" placeholder='Enter ID to Find' value={IDGet} onChange={handleOCIDGet} style={{outline:"none",width:"200px",borderRadius:"5px"}} ></input>  
          <button type="button" style={{backgroundColor:"lightgreen"}} className="btn btn-success" onClick={getByID}>Get Student</button>
                <div className='md:flex'>
                <h1 className="text-xl m-2" style={{color:"white"}}>Registratiton no:-</h1>
                <h1 className="text-xl m-2" style={{color:"white"}} >{individualStu.ID}</h1>
                </div>
                <div className='md:flex'>
                <h1 className="text-xl m-2" style={{color:"white"}}>Name:-</h1>
                <h1 className="text-xl m-2" style={{color:"white"}} >{individualStu.fullname}</h1>
                </div>
                <div className='md:flex'>
                <h1 className="text-xl m-2" style={{color:"white"}}>Language:-</h1>
                <h1 className="text-xl m-2" style={{color:"white"}}>{individualStu.language}</h1>
                </div>
                <div className='md:flex'>
                <h1 className="text-xl m-2" style={{color:"white"}}>Framework:-</h1>
                <h1 className="text-xl m-2" style={{color:"white"}}>{individualStu.framework}</h1>
                </div>
          </div>
    </div>
    </div>
    
    </>
  );
}

export default App;
