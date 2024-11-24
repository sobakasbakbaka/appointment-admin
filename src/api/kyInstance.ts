import ky from "ky";

let unauthorizedHandler: (() => void) | null = null;

export const setUnauthorizedHandler = (handler: () => void) => {
  unauthorizedHandler = handler;
};

export const kyInstance = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    afterResponse: [
      async (_request, _options, response) => {
        if (response.status === 401 && unauthorizedHandler) {
          unauthorizedHandler();
        }
      },
    ],
  },
  timeout: 10000,
  retry: {
    limit: 3,
    methods: ["GET", "POST", "PUT"],
    statusCodes: [500, 502, 503],
  },
});
