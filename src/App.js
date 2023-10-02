
import './App.css';
import { useState, useCallback,useEffect, useRef} from 'react';
function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null) 

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyx"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+{}[];'"


    for (let i = 0; i < length; i++) {

      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copied= useCallback(()=>{
    passwordRef.current?.select();       //highlight the copied text
    passwordRef.current?.setSelectionRange(0,99); //select the values upto specific limit
    window.navigator.clipboard.writeText(password)  //copy the text
  }, [password])

  useEffect(()=>{
    passwordGenerator()
  }, [length,numberAllowed,charAllowed,passwordGenerator])

  return (

    <div>
     
      <div className="w-full max-w-md mx-auto shadow-md text-center rounded-lg px-4 my-8 text-orange-500 bg-gray-700 h-36"> 
      <h1 className=" text-4xl text-center">Password generator</h1>
      <div className=" flex flex-shadow rounded-lg overflow-hidden mb-4 mt-3">
        <input type ="text" value={password} placeholder='Password' readOnly className='outline-none w-full py-1 px-3' ref={passwordRef}/>
        <button onClick={copied} className="outlne-none bg-blue-700 text-white px-3 py-0.5 shrink-0">Copy</button>
      </div>
<div className="flex text-sm gap-x-2">
  <div className="flex items-center gap-x-1">
    <input type="range" min={6} max={100} value={length} className="cursor-pointer" onChange={(e)=>{setLength(e.target.value)}}/> 
      {/* this function helps us to change the range */}
    <label>Length: {length}</label>
  </div>
  <div className="flex items-center gap-x-1">
    <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={()=>{
      setNumberAllowed((prev)=>!prev); 
    }}
    />
    <label htmlFor="numberInput">Numbers</label>
  </div>
  <div className="flex items-center gap-x-1">
    <input type="checkbox" defaultChecked={charAllowed} id="characterInput" onChange={()=>{
      setCharAllowed((prev)=>!prev); // if previously u have checked it then this time it will be unchecked automatically
    }}
    />
    <label htmlFor="CharacterInput">Characters</label>
  </div>

</div>
      </div>
     
    </div>

  )
}

export default App;
