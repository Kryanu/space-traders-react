const AUTH_TOKEN = import.meta.env.PUBLIC_AUTH_TOKEN as string | undefined;

export class Fetch {
  private static instance: Fetch | undefined = undefined;
  private static baseUrl = 'https://api.spacetraders.io/v2/';
  private static baseHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${AUTH_TOKEN || '123'}`,
  };

  constructor() {
    if (Fetch.instance) {
      return Fetch.instance;
    }

    Fetch.instance = this;
  }

  static async post(endpoint: string, payload: unknown) {
    const options = {
      method: 'POST',
      headers: {
        ...this.baseHeaders,
        Authorization: `Bearer ${sessionStorage.getItem('sessionToken') || AUTH_TOKEN}`,
      },
      body: JSON.stringify(payload),
    };
    try {
      return (await (await fetch(`${this.baseUrl}${endpoint}`, options)).json())
        ?.data;
    } catch (ex) {
      return ex;
    }
  }

  static async get(endpoint: string, headers?: any, params?: any) {
    const options = {
      method: 'GET',
      headers: {
        ...this.baseHeaders,
        ...headers,
        Authorization: `Bearer ${sessionStorage.getItem('sessionToken') || AUTH_TOKEN}`,
      },
    };

    let definedParams = {} as Record<string, any>;

    if (params) {
      for (const param of Object.keys(params)) {
        if (params[param]) {
          definedParams[param] = params[param];
        }
      }
    }

    const urlParams = definedParams
      ? new URLSearchParams(definedParams).toString()
      : '';
    const url = urlParams
      ? `${this.baseUrl}${endpoint}?${urlParams}`
      : `${this.baseUrl}${endpoint}`;

    try {
      const res = await (await fetch(url, options)).json();

      if (res?.meta) {
        return {
          data: res?.data,
          meta: res?.meta || undefined,
        };
      }

      return res?.data;
    } catch (ex) {
      return ex;
    }
  }
}
