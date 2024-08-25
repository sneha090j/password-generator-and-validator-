import React, { useState } from 'react'
import { MdContentCopy } from "react-icons/md";
import { MdOutlineRefresh } from "react-icons/md";
import Include from './Include';
import Options from './Options';
import '../css/Main.css'

function Main() {
  //---------------- generate password ---------------------
  const [password, setPassword] = useState('');
  const [includeDigits, setIncludeDigits] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [isCharacter, setIsCharacter] = useState(false);
  const [passwordLength, setPasswordLength] = useState(5);
  const [passwordStrength, setPasswordStrength] = useState('Strength');


  const handleToggle = (name, state) => {
    if (name === 'digits') {
      setIncludeDigits(state);
    } else if (name === 'symbols') {
      setIncludeSymbols(state);
    } else if (name === 'character') {
      setIsCharacter(state);
    }
  };

  const handleRange=(length)=>{
    setPasswordLength(parseInt(length));
  }

  const generatepassword = ()=>{
    let word='';
  if(isCharacter){
    word+='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  }
    if(includeDigits)
    {
      word+='1234567890';
    }
    if(includeSymbols){
      word+='!@#$^&*';
    }
    let newPassword='';
    if(word){
      for(let i=0;i<passwordLength;i++){
        newPassword+=i%2===0? word.charAt(Math.floor(Math.random()*word.length)):word.charAt(Math.floor(Math.random()*word.length));
      }
    }
    else{
      newPassword="select any options";
    }
   
    setPassword(newPassword);
    checkPasswordStrength(newPassword);

  }
// ------------ check password Strength ----------------------------

const checkPasswordStrength = (pwd) => {
  const hasCharacter = /[a-zA-Z]/.test(pwd);
  const hasDigit = /\d/.test(pwd);
  const hasSymbol = /[!@#$%^&*()\-_=+{};:,<.>]/.test(pwd);
  const isLongEnough = pwd.length >= 8;

  if (isLongEnough && hasCharacter && hasDigit && hasSymbol) {
    setPasswordStrength('Excellent');
  } else if (isLongEnough && hasCharacter && (hasDigit || hasSymbol)) {
    setPasswordStrength('Medium');
  } else {
    setPasswordStrength('Weak');
  }
};
 

  
  // ---------------------- copy password ----------------------
  const copy=()=>{
    navigator.clipboard.writeText(password).then(()=>{
      alert('password copied to clipboard!')
    })
    .catch(err=>{
      console.error('failed to copy',err);
    })

  }
  //------------------- refresh --------------------------
  const refreshPage = () => {
    window.location.reload();
}

  return (
    <>
      <div className="main">
        <div className="nav">
          <div className="left">
            <h1>Password Generator</h1>
          </div>
          <div className="right">
            <p className="copy" onClick={copy}> <MdContentCopy /></p>
            <p className='refresh'onClick={refreshPage}>  <MdOutlineRefresh /></p>
          

          </div>
        </div>
        <div className="password">
          <div className="passgen">
            <p> {password || 'Click on generate button'}</p>
          </div>
          <div className="passtype">
            <p>{passwordStrength}</p>
            <button onClick={generatepassword}>generate</button>
          </div>

        </div>
        
          <div className="options-container">
            <Include name="Digits" onToggle={handleToggle} />
            <Include name="Symbols" onToggle={handleToggle} />
            <Include name="Character" onToggle={handleToggle} />
            <Options name="Length" min={6} max={20} onRangeChange={handleRange} />
          </div>
      
      </div>

    </>
  )
}

export default Main
