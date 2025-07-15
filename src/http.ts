import http from 'node:http';
import https from 'node:https';

const PROTOCOLS = {
  http,
  https,
};

export const httpClient = {};

const getClient = (protocol: 'http' | 'https') => {
  return PROTOCOLS[protocol];
};

const createRequestOptions = () => {};
