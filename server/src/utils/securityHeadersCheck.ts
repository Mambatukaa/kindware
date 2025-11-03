import fetch from 'node-fetch';

export const checkSecurityHeaders = async (url: string) => {
  const res = await fetch(url);
  return {
    contentSecurityPolicy: res.headers.get('content-security-policy')
      ? true
      : false,
    referrerPolicy: res.headers.get('referrer-policy') ? true : false,
    strictTransportSecurity: res.headers.get('strict-transport-security')
      ? true
      : false,
  };
};
