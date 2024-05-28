import http from './http';
import {AuthType, ResponseForm} from './types';

const login = async (data: AuthType.LoginRequest) => {
  const response = await http.post<ResponseForm<AuthType.LoginResponse>>(
    '/auth/kakao-login',
    data,
  );
  return response.data;
};

const signup = async (data: AuthType.SignupRequest) => {
  const response = await http.post<ResponseForm<AuthType.SignupResponse>>(
    '/auth/kakao-signup',
    data,
  );
  return response.data;
};

const verfiyAccessToken = async () => {
  const response = await http.get<
    ResponseForm<AuthType.VerifyAccessTokenRepsonse>
  >('/auth/verify');
  return response.data;
};

export {login, verfiyAccessToken, signup};
