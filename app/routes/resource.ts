import { Router } from 'express';
import createError from 'http-errors';

import { RDF_BASE_URI } from '../config';
import { execSelect } from '../util/sparql';

const typeTable = new Map([
  ['http://schema.org/MusicComposition', 'song'],
  ['http://schema.org/MusicAlbum', 'album'],
  ['https://mltd.pikopikopla.net/mltd-schema#VoiceActor', 'voice-actor'],
  ['https://mltd.pikopikopla.net/mltd-schema#Idol', 'idol'],
  ['http://schema.org/CreativeWorkSeries', 'album-series'],
  ['https://mltd.pikopikopla.net/mltd-schema#TalentAgency', 'talent-agency'],
  ['http://schema.org/MusicGroup', 'unit']
]);

const router = Router();

router.get('/:name', async (req, res, next) => {
  const encodedName = encodeURIComponent(req.params.name);

  if (!req.accepts('html')) {
    return res.redirect(303, '/data/' + encodedName);
  }

  const uri = RDF_BASE_URI + req.params.name;
  const query = `SELECT ?type WHERE { <${uri}> a ?type }`;

  try {
    const [ binding ] = await execSelect(query);
    if (!binding) {
      return next(createError(404));
    }

    const type = typeTable.get(binding.type.value) ?? 'doc';
    return res.redirect(303, `/${type}/${encodedName}`);
  } catch (e) {
    return next(createError(500, e));
  }
});

export default router;
