import core    from 'escomplex-core/src/core.js';
import walker  from 'escomplex-core/src/walker.js';

/**
 * Provides a direct entry point into ESComplex to process AST generated via Espree / ESDoc.
 *
 * @param {object}   ast - An AST for a single file.
 * @param {object}   options - ESComplex optional parameters.
 * @returns {*}
 */
export default function analyse(ast, options)
{
   return core.analyse(ast, walker, options);
}