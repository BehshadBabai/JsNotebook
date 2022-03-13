import bundler from '../bundler'
import { useState, useEffect} from 'react';
import CodeEditor from './codeEditor';
import Preview from './preview';
import Resizable from './resizable';

const CodeCell = () => {
  const [input,setInput] = useState('');
  const [code,setCode] = useState('');
  const [error,setError] = useState('');

  useEffect(()=>{
    const timer = setTimeout(async ()=>{
      const output = await bundler(input);
      setCode(output.code);
      setError(output.err)
    },750);
    
    return () => {
      clearTimeout(timer);
    }
  },[input]);
  
  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue="const a = 1;"
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} err={error}/>
      </div>
    </Resizable>
    )
}

export default CodeCell;