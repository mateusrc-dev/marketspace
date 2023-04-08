import {
  storageAuthTokenGet,
  storageAuthTokenSave,
} from "@storage/storageAuthToken";
import { AppError } from "@utils/AppError";
import axios, { AxiosInstance, AxiosError } from "axios"; // AxiosInstance have all which a instance axios possess

type SignOut = () => void;

type PromiseType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

type APIInstanceProps = AxiosInstance & {
  // let's create this type for insert the function which to will user logout of application case have token invalid
  registerInterceptTokenManager: (signOut: SignOut) => () => void; // this function which to will to manage the intercept of token in application
};

const api = axios.create({
  baseURL: "http://192.168.0.16:3333", // has part of the url that will not change in requests - remember that the IP address may change when accessing the internet again
}) as APIInstanceProps;

let failedQueue: Array<PromiseType> = [];
let isRefreshing = false;

api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response, // this callback is necessary because the application flow needs to continue
    async (requestError) => {
      if (requestError?.response?.status === 401) {
        // status code 401 = request not authorization
        if (
          // verifying if error he comes of token
          requestError.response.data?.message === "token.expired" ||
          requestError.response.data?.message === "token.invalid"
        ) {
          // we let's fetch a new token in backend
          const { refresh_token } = await storageAuthTokenGet(); // we need of the 'refresh_token' for update the token
          if (!refresh_token) {
            signOut();
            return Promise.reject(requestError);
          }
          const originalRequestConfig = requestError.config; // we let's get all details request
          if (isRefreshing) {
            // flow of add requests in row
            // when other request pass will enter here
            return new Promise((resolve, reject) => {
              failedQueue.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers = {
                    Authorization: `Bearer ${token}`, // let's insert the updated token
                  };
                  resolve(api(originalRequestConfig)); // returning and processing the request
                },
                onFailure: (error: AxiosError) => reject(error),
              });
            });
          }

          isRefreshing = true;

          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await api.post("sessions/refresh-token", {
                refresh_token,
              }); // let's fetch for a new token by sending the refresh_token for this to be possible
              await storageAuthTokenSave({
                token: data.token,
                refresh_token: data.refresh_token,
              });
              if (originalRequestConfig.data) {
                originalRequestConfig.data = JSON.parse(
                  originalRequestConfig.data
                );
              }
              
              originalRequestConfig.headers = {
                Authorization: `Bearer ${data.token}`, // let's insert the updated token
              };

              api.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${data.token}`;

              failedQueue.forEach((request) => {
                request.onSuccess(data.token);
              }); // processing requests which are wait in queue
              console.log("TOKEN ATUALIZADO!");
              resolve(api(originalRequestConfig)); // for send a new request with token updated
            } catch (error: any) {
              failedQueue.forEach((request) => {
                request.onFailure(error);
              });

              signOut();
              reject(error);
            } finally {
              isRefreshing = false;
              failedQueue = [];
            }
          });
        }

        signOut();
      }

      if (requestError.response && requestError.response.data) {
        // verifying if message is treated in backend - now we can distinct between message treated and untreated
        return Promise.reject(new AppError(requestError.response.data.message)); // we let's create new error - new default of error
      } else {
        return Promise.reject(requestError);
      }
    }
  );

  return () => {
    api.interceptors.response.eject(interceptTokenManager); // how we insert inside of constant the api interceptors, we can use the reference her
  };
};

export { api };
