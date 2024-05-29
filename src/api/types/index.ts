import {HttpStatusCode} from 'axios';

export type Platform = 'KAKAO' | 'GOOGLE' | 'NAVER';
export type Gender = 'MALE' | 'FEMALE' | 'LESS';
export type WeightUnit = 'G' | 'KG';

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
  export interface UpdateUserRequest {
    avatarUrl: string;
    nickname: string;
    introduction: string;
  }

  export interface UserDetailResponse {
    id: string;
    nickname: string;
    avatarUrl: string;
    platform: Platform;
    introduction: string;
  }

  export type UpdateUserResponse = boolean;
}

export namespace IndividualType {
  export interface CreateIndividualRequest {
    name: string;
    avatarUrl: string;
    weight: number;
    weightUnit: WeightUnit;
    gender: Gender;
    hatchedAt?: Date | null;
    speciesId: string;
    memo?: string | null;
    cageId?: string | null;
  }
}

export interface FileRequest {
  image: FormData;
}

export interface FileResponse {
  filePath: string;
}
