export const CONFIG = {
    API_URL: import.meta.env.VITE_API_URL || 'https://ghostagent-dev.dataripple.ai',
    IS_DEV: import.meta.env.VITE_NODE_ENV,
    // Add other config values
  };



  export const ToastConfig = {

    position: 'bottom-right',
    offset: '16px',
    richColors: true,
    toastOptions: {
      // Define default options
      className: '',
      duration: 3000,
      // style: {
      //   "--normal-bg": "var(--popover)",
      //   "--normal-text": "var(--popover-foreground)",
      //   "--normal-border": "var(--border)",
      //   "--border-radius": "var(--radius)"
      // }
    },
    icons: {
      // Defne custom icons
      // success: ,
      // info: ,
      // warning: ,
      // error: ,
      // loading:
    }
  };