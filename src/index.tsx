import ReactDom from 'react-dom';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
//import CodeCell from './components/codeCell';
import TextEditor from './components/textEditor';

const App = () => {
  
  return (
  <div>
    {/* <CodeCell /> */}
    <TextEditor />
  </div>)
}

ReactDom.render(<App />,document.querySelector('#root'))