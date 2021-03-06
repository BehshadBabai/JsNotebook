import {useEffect, useRef} from 'react';
import './preview.css'

interface PreviewProps {
  code: string;
  err: string;
}

const html = `
<html>
  <head>
    <style>html{background-color: white}</style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      const handleError = (err) => {
        const root = document.querySelector("#root");
        root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
      }

      window.addEventListener('error', (event) => {
        event.preventDefault();
        handleError(event.error);
      });

      window.addEventListener("message", (event)=>{
        try{
          eval(event.data);
        } catch (err) {
          handleError(err);
        }
      }, false);
    </script>
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({code, err}) => {
  const iframe = useRef<any>();

  useEffect(()=>{
    iframe.current.srcdoc = html;
    setTimeout(()=>{
      iframe.current.contentWindow.postMessage(code, '*');
    },50); 
  }, [code]);

  return (
  <div className='preview-wrapper'>
    <iframe title='Preview' srcDoc={html} sandbox='allow-scripts' ref={iframe}/>
    {err && <div className='preview-error'><h3 style={{fontWeight: 900}}>Syntax Error: </h3>{err}</div>}
  </div>
  )
}

export default Preview;