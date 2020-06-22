const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') =>
   cookie
     .split(';')
     .map(v => v.split('='))
     
