/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AbstractJsonSchemaPropertyObject {
  title?: string;
  readOnly?: boolean;
}
export interface Item {
  type?: string;
  properties?: Record<string, AbstractJsonSchemaPropertyObject>;
  requiredProperties?: string[];
}
export interface JsonSchema {
  title?: string;
  description?: string;
  properties?: Record<string, AbstractJsonSchemaPropertyObject>;
  requiredProperties?: string[];
  definitions?: Record<string, Item>;
  type?: string;
  $schema?: string;
}
export declare type Links = Record<string, Link>;
export interface RepresentationModelObject {
  _links?: Links;
}
export interface EntityModelGenre {
  name?: string;
  _links?: Links;
}
export interface Genre {
  /** @format int32 */
  id?: number;
  name?: string;
}
export interface CollectionModelEntityModelGenre {
  _embedded?: {
    genres?: EntityModelGenre[];
  };
  _links?: Links;
}
export interface Account {
  /** @format int64 */
  id?: number;
  name?: string;
  /** @uniqueItems true */
  favoriteMovies?: Movie[];
  /** @uniqueItems true */
  favoriteGenres?: Genre[];
  passwordHash?: string;
  city?: string;
}
export interface EntityModelAccount {
  name?: string;
  passwordHash?: string;
  city?: string;
  _links?: Links;
}
export interface Movie {
  /** @format int64 */
  id?: number;
  /** @uniqueItems true */
  genre?: Genre[];
  imdb_id?: string;
  original_title?: string;
  title?: string;
}
export interface CollectionModelEntityModelAccount {
  _embedded?: {
    accounts?: EntityModelAccount[];
  };
  _links?: Links;
}
export interface CollectionModelGenre {
  _embedded?: {
    genres?: GenreResponse[];
  };
  _links?: Links;
}
export interface CollectionModelObject {
  _embedded?: {
    objects?: object[];
  };
  _links?: Links;
}
export interface CollectionModelMovie {
  _embedded?: {
    movies?: MovieResponse[];
  };
  _links?: Links;
}
export interface EntityModelMovie {
  imdb_id?: string;
  original_title?: string;
  title?: string;
  _links?: Links;
}
export interface AccountRequestBody {
  /** @format int64 */
  id?: number;
  name?: string;
  favoriteMovies?: string[];
  favoriteGenres?: string[];
  passwordHash?: string;
  city?: string;
}
export interface GenreRequestBody {
  /** @format int32 */
  id?: number;
  name?: string;
}
export interface MovieRequestBody {
  /** @format int64 */
  id?: number;
  genre?: string[];
  imdb_id?: string;
  original_title?: string;
  title?: string;
}
export interface GenreResponse {
  name?: string;
}
export interface MovieResponse {
  imdb_id?: string;
  original_title?: string;
  title?: string;
}
export interface LoginData {
  name?: string;
  passwordHash?: string;
}
export interface Link {
  href?: string;
  hreflang?: string;
  title?: string;
  type?: string;
  deprecation?: string;
  profile?: string;
  name?: string;
  templated?: boolean;
}
export declare type QueryParamsType = Record<string | number, any>;
export declare type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;
export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}
export declare type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;
export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}
export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}
declare type CancelToken = Symbol | string | number;
export declare enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}
export declare class HttpClient<SecurityDataType = unknown> {
  baseUrl: string;
  private securityData;
  private securityWorker?;
  private abortControllers;
  private customFetch;
  private baseApiParams;
  constructor(apiConfig?: ApiConfig<SecurityDataType>);
  setSecurityData: (data: SecurityDataType | null) => void;
  protected encodeQueryParam(key: string, value: any): string;
  protected addQueryParam(query: QueryParamsType, key: string): string;
  protected addArrayQueryParam(query: QueryParamsType, key: string): any;
  protected toQueryString(rawQuery?: QueryParamsType): string;
  protected addQueryParams(rawQuery?: QueryParamsType): string;
  private contentFormatters;
  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams;
  protected createAbortSignal: (cancelToken: CancelToken) => AbortSignal | undefined;
  abortRequest: (cancelToken: CancelToken) => void;
  request: <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams) => Promise<HttpResponse<T, E>>;
}
/**
 * @title OpenAPI definition
 * @version v0
 * @baseUrl http://localhost:8080
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  accounts: {
    /**
     * @description get-account
     *
     * @tags account-entity-controller
     * @name GetCollectionResourceAccountGet1
     * @request GET:/accounts
     */
    getCollectionResourceAccountGet1: (
      params?: RequestParams,
    ) => Promise<HttpResponse<CollectionModelEntityModelAccount, any>>;
    /**
     * @description create-account
     *
     * @tags account-entity-controller
     * @name PostCollectionResourceAccountPost
     * @request POST:/accounts
     */
    postCollectionResourceAccountPost: (
      data: AccountRequestBody,
      params?: RequestParams,
    ) => Promise<HttpResponse<EntityModelAccount, any>>;
    /**
     * No description
     *
     * @tags account-search-controller
     * @name ExecuteSearchAccountGet
     * @request GET:/accounts/search/findByName
     */
    executeSearchAccountGet: (
      query?: {
        name?: string;
      },
      params?: RequestParams,
    ) => Promise<HttpResponse<EntityModelAccount, void>>;
    /**
     * @description get-account
     *
     * @tags account-entity-controller
     * @name GetItemResourceAccountGet
     * @request GET:/accounts/{id}
     */
    getItemResourceAccountGet: (id: string, params?: RequestParams) => Promise<HttpResponse<EntityModelAccount, void>>;
    /**
     * @description update-account
     *
     * @tags account-entity-controller
     * @name PutItemResourceAccountPut
     * @request PUT:/accounts/{id}
     */
    putItemResourceAccountPut: (
      id: string,
      data: AccountRequestBody,
      params?: RequestParams,
    ) => Promise<HttpResponse<EntityModelAccount, any>>;
    /**
     * @description delete-account
     *
     * @tags account-entity-controller
     * @name DeleteItemResourceAccountDelete
     * @request DELETE:/accounts/{id}
     */
    deleteItemResourceAccountDelete: (id: string, params?: RequestParams) => Promise<HttpResponse<void, void>>;
    /**
     * @description patch-account
     *
     * @tags account-entity-controller
     * @name PatchItemResourceAccountPatch
     * @request PATCH:/accounts/{id}
     */
    patchItemResourceAccountPatch: (
      id: string,
      data: AccountRequestBody,
      params?: RequestParams,
    ) => Promise<HttpResponse<EntityModelAccount, any>>;
    /**
     * @description get-genre-by-account-Id
     *
     * @tags account-property-reference-controller
     * @name FollowPropertyReferenceAccountGet1
     * @request GET:/accounts/{id}/favoriteGenres
     */
    followPropertyReferenceAccountGet1: (
      id: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<CollectionModelGenre, void>>;
    /**
     * @description update-genre-by-account-Id
     *
     * @tags account-property-reference-controller
     * @name CreatePropertyReferenceAccountPut
     * @request PUT:/accounts/{id}/favoriteGenres
     */
    createPropertyReferenceAccountPut: (
      id: string,
      data: CollectionModelObject,
      params?: RequestParams,
    ) => Promise<HttpResponse<CollectionModelGenre, any>>;
    /**
     * @description delete-genre-by-account-Id
     *
     * @tags account-property-reference-controller
     * @name DeletePropertyReferenceAccountDelete
     * @request DELETE:/accounts/{id}/favoriteGenres
     */
    deletePropertyReferenceAccountDelete: (id: string, params?: RequestParams) => Promise<HttpResponse<void, void>>;
    /**
     * @description patch-genre-by-account-Id
     *
     * @tags account-property-reference-controller
     * @name CreatePropertyReferenceAccountPatch
     * @request PATCH:/accounts/{id}/favoriteGenres
     */
    createPropertyReferenceAccountPatch: (
      id: string,
      data: CollectionModelObject,
      params?: RequestParams,
    ) => Promise<HttpResponse<CollectionModelGenre, any>>;
    /**
     * @description get-genre-by-account-Id
     *
     * @tags account-property-reference-controller
     * @name FollowPropertyReferenceAccountGet
     * @request GET:/accounts/{id}/favoriteGenres/{propertyId}
     */
    followPropertyReferenceAccountGet: (
      id: string,
      propertyId: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<CollectionModelGenre, void>>;
    /**
     * @description delete-genre-by-account-Id
     *
     * @tags account-property-reference-controller
     * @name DeletePropertyReferenceIdAccountDelete
     * @request DELETE:/accounts/{id}/favoriteGenres/{propertyId}
     */
    deletePropertyReferenceIdAccountDelete: (
      id: string,
      propertyId: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<void, void>>;
    /**
     * @description get-movie-by-account-Id
     *
     * @tags account-property-reference-controller
     * @name FollowPropertyReferenceAccountGet21
     * @request GET:/accounts/{id}/favoriteMovies
     */
    followPropertyReferenceAccountGet21: (
      id: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<CollectionModelMovie, void>>;
    /**
     * @description update-movie-by-account-Id
     *
     * @tags account-property-reference-controller
     * @name CreatePropertyReferenceAccountPut1
     * @request PUT:/accounts/{id}/favoriteMovies
     */
    createPropertyReferenceAccountPut1: (
      id: string,
      data: CollectionModelObject,
      params?: RequestParams,
    ) => Promise<HttpResponse<CollectionModelMovie, any>>;
    /**
     * @description delete-movie-by-account-Id
     *
     * @tags account-property-reference-controller
     * @name DeletePropertyReferenceAccountDelete1
     * @request DELETE:/accounts/{id}/favoriteMovies
     */
    deletePropertyReferenceAccountDelete1: (id: string, params?: RequestParams) => Promise<HttpResponse<void, void>>;
    /**
     * @description patch-movie-by-account-Id
     *
     * @tags account-property-reference-controller
     * @name CreatePropertyReferenceAccountPatch1
     * @request PATCH:/accounts/{id}/favoriteMovies
     */
    createPropertyReferenceAccountPatch1: (
      id: string,
      data: CollectionModelObject,
      params?: RequestParams,
    ) => Promise<HttpResponse<CollectionModelMovie, any>>;
    /**
     * @description get-movie-by-account-Id
     *
     * @tags account-property-reference-controller
     * @name FollowPropertyReferenceAccountGet2
     * @request GET:/accounts/{id}/favoriteMovies/{propertyId}
     */
    followPropertyReferenceAccountGet2: (
      id: string,
      propertyId: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<CollectionModelMovie, void>>;
    /**
     * @description delete-movie-by-account-Id
     *
     * @tags account-property-reference-controller
     * @name DeletePropertyReferenceIdAccountDelete1
     * @request DELETE:/accounts/{id}/favoriteMovies/{propertyId}
     */
    deletePropertyReferenceIdAccountDelete1: (
      id: string,
      propertyId: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<void, void>>;
  };
  genres: {
    /**
     * @description get-genre
     *
     * @tags genre-entity-controller
     * @name GetCollectionResourceGenreGet1
     * @request GET:/genres
     */
    getCollectionResourceGenreGet1: (
      params?: RequestParams,
    ) => Promise<HttpResponse<CollectionModelEntityModelGenre, any>>;
    /**
     * @description create-genre
     *
     * @tags genre-entity-controller
     * @name PostCollectionResourceGenrePost
     * @request POST:/genres
     */
    postCollectionResourceGenrePost: (
      data: GenreRequestBody,
      params?: RequestParams,
    ) => Promise<HttpResponse<EntityModelGenre, any>>;
    /**
     * @description get-genre
     *
     * @tags genre-entity-controller
     * @name GetItemResourceGenreGet
     * @request GET:/genres/{id}
     */
    getItemResourceGenreGet: (id: string, params?: RequestParams) => Promise<HttpResponse<EntityModelGenre, void>>;
    /**
     * @description update-genre
     *
     * @tags genre-entity-controller
     * @name PutItemResourceGenrePut
     * @request PUT:/genres/{id}
     */
    putItemResourceGenrePut: (
      id: string,
      data: GenreRequestBody,
      params?: RequestParams,
    ) => Promise<HttpResponse<EntityModelGenre, any>>;
    /**
     * @description delete-genre
     *
     * @tags genre-entity-controller
     * @name DeleteItemResourceGenreDelete
     * @request DELETE:/genres/{id}
     */
    deleteItemResourceGenreDelete: (id: string, params?: RequestParams) => Promise<HttpResponse<void, void>>;
    /**
     * @description patch-genre
     *
     * @tags genre-entity-controller
     * @name PatchItemResourceGenrePatch
     * @request PATCH:/genres/{id}
     */
    patchItemResourceGenrePatch: (
      id: string,
      data: GenreRequestBody,
      params?: RequestParams,
    ) => Promise<HttpResponse<EntityModelGenre, any>>;
  };
  movies: {
    /**
     * No description
     *
     * @tags movie-controller
     * @name GetMoviesFromApi
     * @request GET:/movies
     */
    getMoviesFromApi: (params?: RequestParams) => Promise<HttpResponse<Movie[], any>>;
    /**
     * @description create-movie
     *
     * @tags movie-entity-controller
     * @name PostCollectionResourceMoviePost
     * @request POST:/movies
     */
    postCollectionResourceMoviePost: (
      data: MovieRequestBody,
      params?: RequestParams,
    ) => Promise<HttpResponse<EntityModelMovie, any>>;
    /**
     * @description get-movie
     *
     * @tags movie-entity-controller
     * @name GetItemResourceMovieGet
     * @request GET:/movies/{id}
     */
    getItemResourceMovieGet: (id: string, params?: RequestParams) => Promise<HttpResponse<EntityModelMovie, void>>;
    /**
     * @description update-movie
     *
     * @tags movie-entity-controller
     * @name PutItemResourceMoviePut
     * @request PUT:/movies/{id}
     */
    putItemResourceMoviePut: (
      id: string,
      data: MovieRequestBody,
      params?: RequestParams,
    ) => Promise<HttpResponse<EntityModelMovie, any>>;
    /**
     * @description delete-movie
     *
     * @tags movie-entity-controller
     * @name DeleteItemResourceMovieDelete
     * @request DELETE:/movies/{id}
     */
    deleteItemResourceMovieDelete: (id: string, params?: RequestParams) => Promise<HttpResponse<void, void>>;
    /**
     * @description patch-movie
     *
     * @tags movie-entity-controller
     * @name PatchItemResourceMoviePatch
     * @request PATCH:/movies/{id}
     */
    patchItemResourceMoviePatch: (
      id: string,
      data: MovieRequestBody,
      params?: RequestParams,
    ) => Promise<HttpResponse<EntityModelMovie, any>>;
    /**
     * @description get-genre-by-movie-Id
     *
     * @tags movie-property-reference-controller
     * @name FollowPropertyReferenceMovieGet1
     * @request GET:/movies/{id}/genre
     */
    followPropertyReferenceMovieGet1: (
      id: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<CollectionModelGenre, void>>;
    /**
     * @description update-genre-by-movie-Id
     *
     * @tags movie-property-reference-controller
     * @name CreatePropertyReferenceMoviePut
     * @request PUT:/movies/{id}/genre
     */
    createPropertyReferenceMoviePut: (
      id: string,
      data: CollectionModelObject,
      params?: RequestParams,
    ) => Promise<HttpResponse<CollectionModelGenre, any>>;
    /**
     * @description delete-genre-by-movie-Id
     *
     * @tags movie-property-reference-controller
     * @name DeletePropertyReferenceMovieDelete
     * @request DELETE:/movies/{id}/genre
     */
    deletePropertyReferenceMovieDelete: (id: string, params?: RequestParams) => Promise<HttpResponse<void, void>>;
    /**
     * @description patch-genre-by-movie-Id
     *
     * @tags movie-property-reference-controller
     * @name CreatePropertyReferenceMoviePatch
     * @request PATCH:/movies/{id}/genre
     */
    createPropertyReferenceMoviePatch: (
      id: string,
      data: CollectionModelObject,
      params?: RequestParams,
    ) => Promise<HttpResponse<CollectionModelGenre, any>>;
    /**
     * @description get-genre-by-movie-Id
     *
     * @tags movie-property-reference-controller
     * @name FollowPropertyReferenceMovieGet
     * @request GET:/movies/{id}/genre/{propertyId}
     */
    followPropertyReferenceMovieGet: (
      id: string,
      propertyId: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<CollectionModelGenre, void>>;
    /**
     * @description delete-genre-by-movie-Id
     *
     * @tags movie-property-reference-controller
     * @name DeletePropertyReferenceIdMovieDelete
     * @request DELETE:/movies/{id}/genre/{propertyId}
     */
    deletePropertyReferenceIdMovieDelete: (
      id: string,
      propertyId: string,
      params?: RequestParams,
    ) => Promise<HttpResponse<void, void>>;
    /**
     * No description
     *
     * @tags movie-controller
     * @name GetAllGenreMovies
     * @request GET:/movies/genres
     */
    getAllGenreMovies: (params?: RequestParams) => Promise<HttpResponse<Genre[], any>>;
  };
  profile: {
    /**
     * No description
     *
     * @tags profile-controller
     * @name ListAllFormsOfMetadata1
     * @request GET:/profile
     */
    listAllFormsOfMetadata1: (params?: RequestParams) => Promise<HttpResponse<RepresentationModelObject, any>>;
    /**
     * No description
     *
     * @tags profile-controller
     * @name Descriptor111
     * @request GET:/profile/accounts
     */
    descriptor111: (params?: RequestParams) => Promise<HttpResponse<string, any>>;
    /**
     * No description
     *
     * @tags profile-controller
     * @name Descriptor112
     * @request GET:/profile/genres
     */
    descriptor112: (params?: RequestParams) => Promise<HttpResponse<string, any>>;
    /**
     * No description
     *
     * @tags profile-controller
     * @name Descriptor1
     * @request GET:/profile/movies
     */
    descriptor1: (params?: RequestParams) => Promise<HttpResponse<string, any>>;
  };
  login: {
    /**
     * No description
     *
     * @tags account-controller
     * @name UserLogin
     * @request POST:/login
     */
    userLogin: (data: LoginData, params?: RequestParams) => Promise<HttpResponse<Account, any>>;
  };
}
export {};
