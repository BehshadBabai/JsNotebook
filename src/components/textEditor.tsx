import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";
import './textEditor.css';

const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const [value,setValue] = useState('# Header');
  const Ref = useRef<HTMLDivElement | null>(null);

  useEffect(()=>{
    const listener = (event: MouseEvent) => {
      if(Ref.current && event.target && !Ref.current.contains(event.target as Node)){
        setEditing(false);
      }
    }
    document.addEventListener('click', listener, {capture: true});

    return () => {
      document.removeEventListener('click',listener,{capture: true});
    }
  },[]);
  
  if(editing) {
    return <div className="text-editor" ref={Ref}>
      <MDEditor value={value} onChange={(v)=>{
        setValue(v || '');
      }}/>
    </div>
  }

  return <div className="text-editor card" onClick={()=>{setEditing(true)}}>
    <div className="card-content">
      <MDEditor.Markdown source={value}/>
    </div>
  </div>
}

export default TextEditor;