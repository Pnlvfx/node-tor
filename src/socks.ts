import net, { type NetConnectOpts } from 'node:net';

export const socks = {
  connect: (options: NetConnectOpts) => {
    // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function, unicorn/consistent-function-scoping
    const initialize = async () => {};

    const proto = {
      proxy: async () => {
        await initialize();
      },
    };

    const socket = net.connect(options);

    return new Promise((resolve, reject) => {
      const onError = (err: Error) => {
        socket.destroy();
        reject(err);
      };

      const onTimeout = () => {
        const err = new Error('SOCKS5 connection attempt timed out');
        socket.destroy(err);
      };

      socket.once('error', onError);
      socket.once('timeout', onTimeout);
      socket.once('connect', () => {
        socket.removeListener('error', onError);
        socket.removeListener('timeout', onTimeout);
        resolve(proto);
      });
    });
  },
};
