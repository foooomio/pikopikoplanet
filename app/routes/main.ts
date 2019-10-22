import { Router } from 'express';
import path from 'path';
import proxy from 'http-proxy-middleware';

import { FUSEKI_HOST, FUSEKI_PATH } from '../config';

const router = Router();

router.get('/sparql', proxy({
  target: FUSEKI_HOST,
  pathRewrite: {
    '^/sparql': FUSEKI_PATH
  }
}));

router.get('/mltd-schema', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../../dataset/mltd-schema.ttl'));
});

export default router;
