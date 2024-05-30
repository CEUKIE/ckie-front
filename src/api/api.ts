import http from './http';
import {AuthType, FileResponse, ResponseForm, UserType} from './types';

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

const uploadImage = async (data: FormData) => {
  const response = await http.post<ResponseForm<FileResponse>>(
    '/files/upload',
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};

export const getUserDetail = async () => {
  const response = await http.get<ResponseForm<UserType.UserDetailResponse>>(
    '/users',
  );
  return response.data.result!;
};

export const updateUserInfo = async (data: UserType.UpdateUserRequest) => {
  const response = await http.patch<ResponseForm<UserType.UpdateUserResponse>>(
    '/users',
    data,
  );
  return response;
};

export {login, verfiyAccessToken, signup, uploadImage};
