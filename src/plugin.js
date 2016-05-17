/**
 * esdoc-plugin-escomplex -- In development / creates complexity analysis reports with ESComplex.
 */

'use strict';

// import cheerio    from 'cheerio';
// import fs         from 'fs-extra';
// import path       from 'path';
// import { taffy }  from 'taffydb';

import analyse    from './analyse.js';

// Must store ESDoc configuration file and options to use later with ReportDocBuilder.
// let config;
let options;
// let tags;

// ESDoc plugin callbacks -------------------------------------------------------------------------------------------

/**
 * Sanitizes optional parameters.
 *
 * @param {object}   ev - Event from ESDoc containing data field.
 */
export function onStart(ev)
{
   // Stores sanitized option map.
   options = typeof ev.data.option === 'object' ? ev.data.option : {};

   // Stores option that if true silences logging output.
   options.silent = typeof options.silent === 'boolean' ? options.silent : true;
   options.verbose = typeof options.verbose === 'boolean' ? options.verbose : false;
}

/**
 * Stores the ESDoc configuration file for later use with ReportDocBuilder.
 *
 * @param {object}   ev - Event from ESDoc containing data field.
 */
// export function onHandleConfig(ev)
// {
//   config = ev.data.config;
// }

/**
 * Must save tags to eventually feed ReportDocBuilder with taffydb converted data.
 *
 * @param {object}   ev - Event from ESDoc containing data field
 */
// export function onHandleTag(ev)
// {
//   tags = ev.data.tag;
// }

/**
 * Processes the AST through ESComplex writing these files via given relative path under `<docs destination>/escomplex`.
 *
 * @param {object}   ev - Event from ESDoc containing data field.
 */
 export function onHandleAST(ev)
 {
    try
    {
       const result = analyse(ev.data.ast);
       console.log(`esdoc-plugin-escomplex - onHandleAST - result: ${JSON.stringify(result)}`);
    }
    catch (err)
    {
       console.log(`esdoc-plugin-escomplex - onHandleAST - err: ${err}`);
    }
 }

/**
 * Process all HTML files adding a `Complexity` link to the top header navigation bar.
 *
 * @param {object}   ev - Event from ESDoc containing data field
 */
// export function onHandleHTML(ev)
// {
//    if (ev.data.fileName.endsWith('.html'))
//    {
//       const $ = cheerio.load(ev.data.html, { decodeEntities: false });
//
//       $('<a href="complexity/report/index.html">Complexity</a>').insertAfter('header a[href="identifiers.html"]');
//
//       ev.data.html = $.html();
//    }
// }

/**
 * Completes report generation and then builds the HTML index pages.
 */
export function onComplete()
{
}

/**
 * Provides a callback for ReportDocBuilder to export HTML files delegating to the local `onHandleHTML` function.
 *
 * @param {string}   html - HTML to save.
 * @param {string}   fileName - name for file output.
 */
// const s_WRITE_HTML = (html, fileName) =>
// {
//    // Must match plugin event data format.
//    const ev = { data: { html, fileName } };
//
//    onHandleHTML(ev);
//
//    const filePath = path.resolve(config.destination, fileName);
//    fs.outputFileSync(filePath, ev.data.html, { encoding: 'utf8' });
// };