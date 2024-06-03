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

  export interface UpdateIndividualRequest {
    id: string;
    name: string;
    avatarUrl: string;
    gender: Gender;
    hatchedAt?: Date | null;
    memo?: string | null;
    cageId?: string | null;
  }

  export interface IndividualsResponse {
    id: string;
    name: string;
    avatarUrl: string;
    gender: Gender;
    hatchedAt: Date;
    memo: string;
    species: Pick<SpeciesType.SpeciesListResponse, 'id' | 'name'>;
    // TODO Cage 타입 선언하면 교체
    cage: {
      name: string;
      id: string;
    };
  }
}

export namespace CageType {
  export interface CageResponse {
    id: string;
    name: string;
  }
}

export namespace SpeciesType {
  export interface SpeciesListResponse {
    id: string;
    name: string;
    minTemperature: number;
    maxTemperature: number;
    minHumidity: number;
    maxHumidity: number;
  }
}

export namespace RecordType {
  export type RecordCategory = 'FEEDING' | 'WEIGHT' | 'ECDYSIS' | 'ETC';

  export interface RecordsResponse {
    target: string;
    record: {
      id: string;
      name: RecordCategory;
      memo?: string | null;
      // TODO 나중에 빼자~
      color?: string | null;
    }[];
  }

  export interface WeightRecordResponse {
    id: string;
    targetDate: string;
    weight: number;
  }
}

export interface FileRequest {
  image: FormData;
}

export interface FileResponse {
  filePath: string;
}
