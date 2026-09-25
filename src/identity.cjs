'use strict';
const BASE58=/^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
function normalizeAddress(v){const s=typeof v==='string'?v.trim():'';return BASE58.test(s)?s:null;}
function isAddress(v){return normalizeAddress(v)!==null;}
function normalizeSignature(v){const s=typeof v==='string'?v.trim():'';return /^[1-9A-HJ-NP-Za-km-z]{64,88}$/.test(s)?s:null;}
module.exports={BASE58,normalizeAddress,isAddress,normalizeSignature};
