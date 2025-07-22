import type { HttpResponse, HttpOptions } from './original/types.js';
import { AllowedProtocols, headers, MimeTypes, type Protocol } from './constants.js';
import http from 'node:http';
import https from 'node:https';
import qs from 'node:querystring';
import { TorHttpException } from './original/exceptions.js';
import { buildResponse, preventDNSLookup } from './utils.js';

const PROTOCOLS = {
  'http:': http,
  'https:': https,
};

export const httpClient = {
  get: async (url: string, options: HttpOptions = {}) => {
    return request(url, { ...options, method: 'GET' });
  },
  post: async (url: string, data: Record<string, string>, options: HttpOptions = {}) => {
    const dataString = qs.stringify(data);
    return request(url, {
      agent: options.agent,
      timeout: options.timeout,
      method: 'POST',
      data: dataString,
      headers: {
        'content-type': MimeTypes.FORM,
        'content-length': dataString.length,
        ...options.headers,
      },
    });
  },
  delete(url: string, options: HttpOptions = {}) {
    return request(url, {
      ...options,
      method: 'DELETE',
    });
  },
};

const request = async (url: string, options: HttpOptions = {}) => {
  const { client, requestOptions } = await createRequestOptions(url, options);
  return new Promise<HttpResponse>((resolve, reject) => {
    const req = client.request(url, requestOptions, (res) => {
      let data = '';

      res.on('data', (chunk: Buffer) => (data += chunk.toString()));
      res.on('error', reject);
      res.on('close', () => {
        const response = buildResponse(res, data);
        resolve(response);
      });
    });

    if (options.timeout) {
      req.setTimeout(options.timeout);
    }

    req.on('error', reject);
    req.on('timeout', () => {
      reject(new TorHttpException('Http request timeout'));
    });

    if (options.data) {
      req.write(options.data);
    }

    req.end();
  });
};

const getClient = (protocol: Protocol) => {
  return PROTOCOLS[protocol];
};

const createRequestOptions = async (url: string, options: HttpOptions) => {
  if (!options.agent) {
    throw new TorHttpException('HttpAgent is required for TOR requests');
  }
  const { success, data: protocol } = await AllowedProtocols.safeParseAsync(new URL(url).protocol);
  if (!success) {
    throw new TorHttpException('Invalid HTTP protocol in URL');
  }

  const client = getClient(protocol);
  const requestOptions = {
    headers: { ...headers, ...options.headers },
    method: options.method,
    agent: options.agent,
    lookup: preventDNSLookup,
  };

  return { client, requestOptions };
};
