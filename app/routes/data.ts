import { Router } from 'express';
import path from 'path';
import proxy from 'http-proxy-middleware';

import { RDF_BASE_URI, FUSEKI_HOST, FUSEKI_PATH } from '../config';

const formatTable = new Map([
  ['.json', 'json'],
  ['.jsonld', 'json'],
  ['.rdf', 'xml'],
  ['.xml', 'xml'],
  ['.ttl', 'ttl']
]);

const router = Router();

router.get('/:name', proxy({
  target: FUSEKI_HOST,
  pathRewrite (reqPath) {
    const extname = path.extname(reqPath);

    const format = formatTable.get(extname) ?? '';
    const uri = RDF_BASE_URI + path.basename(reqPath, extname);

    return `${FUSEKI_PATH}?output=${format}&query=DESCRIBE+<${uri}>`;
  }
}))

export default router;
