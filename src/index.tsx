import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
//import CodeCell from './components/codeCell';
import TextEditor from './components/textEditor';

const App = () => {
  
  return (
  <Provider store={store}>
    <div>
      {/* <CodeCell /> */}
      <TextEditor />
    </div>
  </Provider>
  )
}

ReactDom.render(<App />,document.querySelector('#root'))