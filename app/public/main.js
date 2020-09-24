/* eslint-disable */

(() => {
  'use strict';

  const $ = document.getElementById.bind(document);

  const Settings = Object.freeze({
    endpoint: location.origin + '/sparql',
    defaultQuery: `
BASE <https://mltd.pikopikopla.net/resource/>
PREFIX mltd: <https://mltd.pikopikopla.net/mltd-schema#>
PREFIX : <http://schema.org/>
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT *
WHERE {
  <アイドルマスター_ミリオンライブ!_シアターデイズ> ?p ?o .
}`.trim(),
  });

  // CodeMirror 設定
  const editor = CodeMirror.fromTextArea($('query'), {
    mode: 'application/sparql-query',
    theme: 'mdn-like',
    lineNumbers: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    styleActiveLine: true,
  });
  editor.setValue(Settings.defaultQuery);

  const output = CodeMirror.fromTextArea($('result'), {
    mode: 'application/json',
    theme: 'mdn-like',
    lineNumbers: true,
    readOnly: true,
    styleActiveLine: true,
  });

  // クエリ実行
  $('submit').addEventListener('click', async () => {
    console.log(editor.getValue());

    const accept = $('accept').value;

    const url = new URL(Settings.endpoint);
    url.searchParams.set('query', editor.getValue());

    const options = {
      method: 'GET',
      headers: {
        Accept: accept
      }
    };

    const response = await fetch(url, options);
    const text = await response.text();

    const acceptList = accept.split(', ');
    const contentType = response.headers.get('content-type');

    if (response.ok && !acceptList.some(mime => contentType.includes(mime))) {
      output.setValue('対応していない形式です');
    } else {
      output.setValue(text);
    }
  });

  // リセットボタン
  $('reset').addEventListener('click', () => {
    editor.setValue(Settings.defaultQuery);
  });

  // Ctrl+Enter/Cmd+Enter で実行
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.code === 'Enter') {
      $('submit').click();
    }
  });
})();
