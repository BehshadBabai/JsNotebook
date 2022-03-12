import ReactDom from 'react-dom';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import CodeCell from './components/codeCell';

const App = () => {
  
  return (
  <div>
    <CodeCell />
  </div>)
}

ReactDom.render(<App />,document.querySelector('#root'))