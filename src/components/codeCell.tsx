import bundler from '../bundler'
import { useState, useEffect} from 'react';
import CodeEditor from './codeEditor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../state';
import {useActions} from '../hooks/useActions';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({cell}) => {
  const [code,setCode] = useState('');
  const [error,setError] = useState('');

  const { updateCell } = useActions();

  useEffect(()=>{
    const timer = setTimeout(async ()=>{
      const output = await bundler(cell.content);
      setCode(output.code);
      setError(output.err)
    },750);
    
    return () => {
      clearTimeout(timer);
    }
  },[cell.content]);
  
  return (
    <Resizable direction="vertical">
      <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <Preview code={code} err={error}/>
      </div>
    </Resizable>
    )
}

export default CodeCell;