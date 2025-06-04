
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/home",
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-XQB5NRKU.js"
    ],
    "route": "/home"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-OI2OKLDQ.js"
    ],
    "route": "/contact"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-K4VGREYK.js"
    ],
    "route": "/search"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23884, hash: '592a07c065cb0d95f7200e7c1813034c9e0b3dcd3220daf7a3f1697245373027', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17290, hash: '2a7d1ef33dcc3257566e02f5a300f267d9402480f9c5ed86eb8d6a0e48e656d5', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'home/index.html': {size: 93893, hash: '88bceabc7af85441b29e2b2343f944e37cc76d6554299b81f01d781f2ef79d95', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'search/index.html': {size: 34322, hash: '8f9087a4acf9f8a15739963322d338a546c306601e07b71abcb43551484f854b', text: () => import('./assets-chunks/search_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 34224, hash: 'c1febcf272eb12e7757ad208d56070771a0fb107c45e3c89d2224926b7be8898', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'styles-JYOYNZW3.css': {size: 7147, hash: 'X1rC4OCbOso', text: () => import('./assets-chunks/styles-JYOYNZW3_css.mjs').then(m => m.default)}
  },
};
