let isServerStarted = false;

async function initMocks() {
  if (isServerStarted) return;

  if (typeof window === 'undefined') {
    const { server } = await import('./server');
    server.listen();
  } else {
    const { worker } = await import('./browser');
    worker.start();
  }

  isServerStarted = true;
}

initMocks();

export {};
