import fetch from 'node-fetch';
import { URL } from 'url';
import { Parser } from 'xml2js';
import { stripPrefix, parseNumbers, parseBooleans } from 'xml2js/lib/processors';

import { FUSEKI_ENDPOINT } from '../config';

const url = new URL(FUSEKI_ENDPOINT);

export const execSelect = async (query: string): Promise<any[]> => {
  url.searchParams.set('output', 'json');
  url.searchParams.set('query', query.replace(/\s+/g, ' '));
  const data = await fetch(url)
    .then(res => res.json())
    .catch(e => { throw e; });
  return data.results.bindings;
};

const xmlParser = new Parser({
  explicitRoot: false,
  explicitArray: false,
  mergeAttrs: true,
  attrNameProcessors: [ stripPrefix ],
  valueProcessors: [ parseNumbers, parseBooleans ]
});

export const execDescribe = async (query: string): Promise<any> => {
  url.searchParams.set('output', 'xml');
  url.searchParams.set('query', query.replace(/\s+/g, ' '));
  const data = await fetch(url)
    .then(res => res.text())
    .catch(e => { throw e; });
  return await xmlParser.parseStringPromise(data);
};
