import {HttpStatusCode} from 'axios';

export type Platform = 'KAKAO' | 'GOOGLE' | 'NAVER';

export interface ResponseForm<T> {
  status: HttpStatusCode;
  result?: T;
}

export namespace AuthType {
  export interface LoginRequest {
    accessToken: string;
  }

  export interface SignupRequest {
    accessToken: string;
    avatarUrl: string;
    nickname: string;
    introduction: string;
  }

  export interface LoginResponse {
    accessToken?: string;
    isRegisterd?: boolean;
  }

  export interface SignupResponse {
    accessToken: string;
  }

  export interface VerifyAccessTokenRepsonse {
    isVerified: boolean;
  }
}

export namespace UserType {
  export interface UserDetailResponse {
    id: string;
    nickname: string;
    avatarUrl: string;
    platform: Platform;
    introduction: string;
  }
}

export interface FileRequest {
  image: FormData;
}

export interface FileResponse {
  filePath: string;
}
