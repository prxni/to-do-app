import { useEffect, useState } from "react"
import axios from "axios"
import Dialog from "./components/Dialog"

function App() {
  const [arr,setArr]=useState([])
  const [message,setMessage]=useState("")
  const [isLoading,setIsLoading]=useState(false)
  const [newpost,setNewpost]=useState(false)

  useEffect(()=>{
    blah()
  },[])
    
  function blah(){
    setIsLoading(true)
    axios.get(`http://localhost:3000/api`).then((res)=>
    {
      setArr(res.data)
      setIsLoading(false)
    })
  }
  useEffect(()=>{
      if(localStorage.dark=="true")
      document.documentElement.classList.add("dark")
  })

  function onStatusChange(id,newStatus){
    setArr((prevArr) => 
      prevArr.map(item => item._id === id ? { ...item, status: newStatus } : item)
  )}

  const toggleTheme=(evt)=>{
      localStorage.dark=localStorage.dark=="true" ? false : true
      document.documentElement.classList.toggle("dark")
  }

  return (
    <>
    <div className="flex flex-col gap-y-6 select-none items-center">
      <div className="h-12">
        <span onClick={toggleTheme} className="scale-0 dark:scale-100 delay-100 material-symbols-outlined text-rose-300 hover:text-rose-400 cursor-default absolute sm:right-5 right-[2%] top-5 sm:text-3xl text-2xl duration-150 select-none">light_mode</span>
        <span onClick={toggleTheme} className="scale-100 dark:scale-0 delay-100 material-symbols-outlined text-rose-300 hover:text-rose-400 cursor-default absolute sm:right-5 right-[2%] top-5 [font-variation-settings:'FILL'1] sm:text-3xl text-2xl duration-150 select-none">dark_mode</span>
      </div>
      <div className='flex flex-row align-middle items-center gap-20'>
        <div className='w-72 p-3 h-[80svh] gap-3 flex flex-col bg-red-400 opacity-90 dark:opacity-100 rounded rounded-lg'>
          <div className="font-sora font-bold border-2  border-rose-100 text-white p-3 rounded-md">
            To Do
          </div>
          {isLoading && <h2>Loading</h2>}
          {!isLoading && arr.filter(item => item.status == 0).map((item) => (
              <Dialog color={1} key={item._id} id={item._id} heading={item.heading} onStatusChange={onStatusChange}  body={item.text} />
            ))}
          {newpost && <div className="flex flex-col  cursor-pointer select-none w-64 h-20 p-3 gap-1  bg-rose-100 justify-center font-semibold rounded-md gap-y-1 text-gray-900">
            <input className="bg-inherit text-base border-b-2 border-white outline-none" id="head" placeholder="Heading"/>
            <input className="bg-inherit text-sm border-b-2 border-white outline-none" id="body" placeholder="Text"/>
          </div>}
          {message && <p className="text-red-600 font-bold font-sora">{message}</p>}
          {newpost && <div className="flex flex-row  text-sm gap-x-1 p-1">
              <span className="text-sm cursor-pointer justify-center flex items-center select-none w-16 h-6 p-2  bg-red-600  font-semibold rounded-md text-green-50  " onClick={()=>{
                setNewpost(!newpost)
                setMessage("")
              }
              }>cancel</span>
              <span className="text-sm cursor-pointer p-2 justify-center flex items-center select-none w-16 h-6 p-1  bg-green-600  font-semibold rounded-md text-red-50" onClick={()=>{
                axios.post("http://localhost:3000/api/create",{
                  heading:document.getElementById('head').value,
                  text:document.getElementById('body').value,
                  status:0
                }).then((res)=>{
                  blah()
                  setNewpost(!newpost)
                  setMessage("")
                })
                .catch((err)=>setMessage(err.response.data.message))
                
              }}>post</span>
            </div>}
          {!newpost&& <div className="text-sm cursor-pointer select-none w-16 h-7 p-1 mx-[26svh] bg-rose-100 justify-center font-semibold rounded-md gap-y-1 text-gray-900 flex items-center " onClick={()=>{
              if(!newpost)
                return setNewpost(!newpost)
            }}>
            <span className="material-symbols-outlined text-lg font-semibold cursor-pointer">
            add
            </span>Post
          </div>}

        </div>
        <div className="w-72 p-3 gap-3  h-[80svh] bg-yellow-300 opacity-90 dark:opacity-100 rounded-lg flex flex-col">
          <div className="font-sora border-2 border-rose-100 font-semibold text-white p-3 rounded-md">
            In Progress
          </div>
          {isLoading && <h2>Loading</h2>}
          {!isLoading && arr.filter(item => item.status == 1).map((item) => (
              <Dialog color={3} key={item._id} id={item._id} heading={item.heading} onStatusChange={onStatusChange} body={item.text}/>
            ))}
        </div>
        <div className="w-72 p-3 gap-3 h-[80svh]  flex flex-col rounded-lg dark:opacity-100 bg-purple-400 opacity-90">
          <div className="font-sora border-2 border-rose-100 font-semibold text-white p-3 rounded-md">
            In Review
          </div>
          {isLoading && <h2>Loading</h2>}
          {!isLoading && arr.filter(item => item.status == 2).map((item) => (
              <Dialog color={3} key={item._id} id={item._id} heading={item.heading} onStatusChange={onStatusChange}  body={item.text}/>
            ))}
        </div>
        <div className="w-72 p-3 gap-3 flex flex-col h-[80svh] bg-green-300  dark:opacity-100  rounded-lg opacity-90">
          <div className="font-sora border-2 border-rose-100 font-semibold text-white p-3 rounded-md">
            Done
          </div>
          {isLoading && <h2>Loading</h2>}
          {!isLoading && arr.filter(item => item.status == 3).map((item) => (
              <Dialog color={2} key={item._id} id={item._id} heading={item.heading} onStatusChange={onStatusChange} body={item.text} />
            ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default App
