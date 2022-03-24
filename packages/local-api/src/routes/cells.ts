import express from 'express';
import fs from 'fs/promises';
import path from 'path';

interface Cell {
  id: string;
  content: string;
  variant: 'text' | 'code';
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());

  const fullPath = path.join(dir, filename);

  router.get('/cells', async (req, res) => {
    // Read the file and debug if fails
    try {
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' });

      res.send(JSON.parse(result));
    } catch (err: any) {
      if (err.code === 'ENOENT') {
        // create a file and add default cells
        await fs.writeFile(fullPath, '[]', 'utf-8');
        res.send([]);
      } else {
        throw err;
      }
    }
  });

  router.post('/cells', async (req, res) => {
    // take the list of cells
    // serialize them
    const { cells }: { cells: Cell[] } = req.body;
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

    res.send({ status: 'ok' });
  });

  return router;
};