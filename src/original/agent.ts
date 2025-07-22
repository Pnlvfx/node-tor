import { Agent, type AgentOptions } from 'node:http';
import { Agent as AgentS, type AgentOptions as AgentOptionsS } from 'node:https';
import { Socket } from 'node:net';

interface SocksOptions extends AgentOptions, AgentOptionsS {
  socksSocket: Socket;
}

export class HttpAgent extends Agent {
  private socksSocket: Socket;

  constructor(options: SocksOptions) {
    super(options);
    this.socksSocket = options.socksSocket;
  }

  override createConnection() {
    return this.socksSocket;
  }
}

export class HttpsAgent extends AgentS {
  private socksSocket: Socket;

  constructor(options: SocksOptions) {
    super(options);
    this.socksSocket = options.socksSocket;
  }

  override createConnection() {
    return this.socksSocket;
  }
}
