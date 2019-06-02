import { useState, useEffect } from "react";

export default httpError => {
  const [error, setError] = useState(null);

  const reqInterceptor = httpError.interceptors.request.use(req => {
    setError(null);
    return req;
  });
  const resInterceptor = httpError.interceptors.response.use(
    res => res,
    err => {
      setError(err);
    }
  );

  useEffect(() => {
    return () => {
      httpError.interceptors.request.eject(reqInterceptor);
      httpError.interceptors.response.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor]);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
};
