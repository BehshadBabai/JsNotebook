import path from 'path';
import { Command } from 'commander';
import { serve } from '@jsnotebook-behshad/local-api';

const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'Port to run server on', '4005')
  .action(async (filename = 'notebook.js', options: { port: string }) => {
    try {
      const { port } = options;
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(parseInt(port), path.basename(filename), dir, !isProduction);
      console.log('Listening on port ', port);
      console.log(
        `Opened ${filename}. Navigate to http://localhost:${port} to edit the file!`
      );
    } catch (err: any) {
      if (err.code === 'EADDRINUSE') {
        console.error('Port is in use. Try running on a different port.');
      } else {
        console.log("Here's the problem: ", err.message);
      }
      process.exit(1);
    }
  });
