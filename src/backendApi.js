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

export var ContentType;
(function (ContentType) {
  ContentType["Json"] = "application/json";
  ContentType["FormData"] = "multipart/form-data";
  ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
  ContentType["Text"] = "text/plain";
})(ContentType || (ContentType = {}));
export class HttpClient {
  baseUrl = "http://localhost:8080";
  securityData = null;
  securityWorker;
  abortControllers = new Map();
  customFetch = (...fetchParams) => fetch(...fetchParams);
  baseApiParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };
  constructor(apiConfig = {}) {
    Object.assign(this, apiConfig);
  }
  setSecurityData = (data) => {
    this.securityData = data;
  };
  encodeQueryParam(key, value) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }
  addQueryParam(query, key) {
    return this.encodeQueryParam(key, query[key]);
  }
  addArrayQueryParam(query, key) {
    const value = query[key];
    return value.map((v) => this.encodeQueryParam(key, v)).join("&");
  }
  toQueryString(rawQuery) {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }
  addQueryParams(rawQuery) {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }
  contentFormatters = {
    [ContentType.Json]: (input) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input) => this.toQueryString(input),
  };
  mergeRequestParams(params1, params2) {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }
  createAbortSignal = (cancelToken) => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }
    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };
  abortRequest = (cancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);
    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };
  request = async ({ body, secure, path, type, query, format, baseUrl, cancelToken, ...params }) => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;
    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response;
      r.data = null;
      r.error = null;
      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });
      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }
      if (!response.ok) throw data;
      return data;
    });
  };
}
/**
 * @title OpenAPI definition
 * @version v0
 * @baseUrl http://localhost:8080
 */
export class Api extends HttpClient {
  accounts = {
    /**
     * @description get-account
     *
     * @tags account-entity-controller
     * @name GetCollectionResourceAccountGet1
     * @request GET:/accounts
     */
    getCollectionResourceAccountGet1: (params = {}) =>
      this.request({
        path: `/accounts`,
        method: "GET",
        format: "json",
        ...params,
      }),
    /**
     * @description create-account
     *
     * @tags account-entity-controller
     * @name PostCollectionResourceAccountPost
     * @request POST:/accounts
     */
    postCollectionResourceAccountPost: (data, params = {}) =>
      this.request({
        path: `/accounts`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags account-search-controller
     * @name ExecuteSearchAccountGet
     * @request GET:/accounts/search/findByName
     */
    executeSearchAccountGet: (query, params = {}) =>
      this.request({
        path: `/accounts/search/findByName`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
    /**
     * @description get-account
     *
     * @tags account-entity-controller
     * @name GetItemResourceAccountGet
     * @request GET:/accounts/{id}
     */
    getItemResourceAccountGet: (id, params = {}) =>
      this.request({
        path: `/accounts/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),
    /**
     * @description update-account
     *
     * @tags account-entity-controller
     * @name PutItemResourceAccountPut
     * @request PUT:/accounts/{id}
     */
    putItemResourceAccountPut: (id, data, params = {}) =>
      this.request({
        path: `/accounts/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
    /**
     * @description delete-account
     *
     * @tags account-entity-controller
     * @name DeleteItemResourceAccountDelete
     * @request DELETE:/accounts/{id}
     */
    deleteItemResourceAccountDelete: (id, params = {}) =>
      this.request({
        path: `/accounts/${id}`,
        method: "DELETE",
        ...params,
      }),
    /**
     * @description patch-account
     *
     * @tags account-entity-controller
     * @name PatchItemResourceAccountPatch
     * @request PATCH:/accounts/{id}
     */
    patchItemResourceAccountPatch: (id, data, params = {}) =>
      this.request({
        path: `/accounts/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
    /**
     * @description get-movie-by-account-Id
     *
     * @tags account-property-reference-controller
     * @name FollowPropertyReferenceAccountGet1
     * @request GET:/accounts/{id}/favorites
     */
    followPropertyReferenceAccountGet1: (id, params = {}) =>
      this.request({
        path: `/accounts/${id}/favorites`,
        method: "GET",
        format: "json",
        ...params,
      }),
    /**
     * @description update-movie-by-account-Id
     *
     * @tags account-property-reference-controller
     * @name CreatePropertyReferenceAccountPut
     * @request PUT:/accounts/{id}/favorites
     */
    createPropertyReferenceAccountPut: (id, data, params = {}) =>
      this.request({
        path: `/accounts/${id}/favorites`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
    /**
     * @description delete-movie-by-account-Id
     *
     * @tags account-property-reference-controller
     * @name DeletePropertyReferenceAccountDelete
     * @request DELETE:/accounts/{id}/favorites
     */
    deletePropertyReferenceAccountDelete: (id, params = {}) =>
      this.request({
        path: `/accounts/${id}/favorites`,
        method: "DELETE",
        ...params,
      }),
    /**
     * @description patch-movie-by-account-Id
     *
     * @tags account-property-reference-controller
     * @name CreatePropertyReferenceAccountPatch
     * @request PATCH:/accounts/{id}/favorites
     */
    createPropertyReferenceAccountPatch: (id, data, params = {}) =>
      this.request({
        path: `/accounts/${id}/favorites`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
    /**
     * @description get-movie-by-account-Id
     *
     * @tags account-property-reference-controller
     * @name FollowPropertyReferenceAccountGet
     * @request GET:/accounts/{id}/favorites/{propertyId}
     */
    followPropertyReferenceAccountGet: (id, propertyId, params = {}) =>
      this.request({
        path: `/accounts/${id}/favorites/${propertyId}`,
        method: "GET",
        format: "json",
        ...params,
      }),
    /**
     * @description delete-movie-by-account-Id
     *
     * @tags account-property-reference-controller
     * @name DeletePropertyReferenceIdAccountDelete
     * @request DELETE:/accounts/{id}/favorites/{propertyId}
     */
    deletePropertyReferenceIdAccountDelete: (id, propertyId, params = {}) =>
      this.request({
        path: `/accounts/${id}/favorites/${propertyId}`,
        method: "DELETE",
        ...params,
      }),
  };
  genres = {
    /**
     * @description get-genre
     *
     * @tags genre-entity-controller
     * @name GetCollectionResourceGenreGet1
     * @request GET:/genres
     */
    getCollectionResourceGenreGet1: (params = {}) =>
      this.request({
        path: `/genres`,
        method: "GET",
        format: "json",
        ...params,
      }),
    /**
     * @description create-genre
     *
     * @tags genre-entity-controller
     * @name PostCollectionResourceGenrePost
     * @request POST:/genres
     */
    postCollectionResourceGenrePost: (data, params = {}) =>
      this.request({
        path: `/genres`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
    /**
     * @description get-genre
     *
     * @tags genre-entity-controller
     * @name GetItemResourceGenreGet
     * @request GET:/genres/{id}
     */
    getItemResourceGenreGet: (id, params = {}) =>
      this.request({
        path: `/genres/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),
    /**
     * @description update-genre
     *
     * @tags genre-entity-controller
     * @name PutItemResourceGenrePut
     * @request PUT:/genres/{id}
     */
    putItemResourceGenrePut: (id, data, params = {}) =>
      this.request({
        path: `/genres/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
    /**
     * @description delete-genre
     *
     * @tags genre-entity-controller
     * @name DeleteItemResourceGenreDelete
     * @request DELETE:/genres/{id}
     */
    deleteItemResourceGenreDelete: (id, params = {}) =>
      this.request({
        path: `/genres/${id}`,
        method: "DELETE",
        ...params,
      }),
    /**
     * @description patch-genre
     *
     * @tags genre-entity-controller
     * @name PatchItemResourceGenrePatch
     * @request PATCH:/genres/{id}
     */
    patchItemResourceGenrePatch: (id, data, params = {}) =>
      this.request({
        path: `/genres/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  movies = {
    /**
     * No description
     *
     * @tags movie-controller
     * @name GetMoviesFromApi
     * @request GET:/movies
     */
    getMoviesFromApi: (params = {}) =>
      this.request({
        path: `/movies`,
        method: "GET",
        format: "json",
        ...params,
      }),
    /**
     * @description create-movie
     *
     * @tags movie-entity-controller
     * @name PostCollectionResourceMoviePost
     * @request POST:/movies
     */
    postCollectionResourceMoviePost: (data, params = {}) =>
      this.request({
        path: `/movies`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
    /**
     * @description get-movie
     *
     * @tags movie-entity-controller
     * @name GetItemResourceMovieGet
     * @request GET:/movies/{id}
     */
    getItemResourceMovieGet: (id, params = {}) =>
      this.request({
        path: `/movies/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),
    /**
     * @description update-movie
     *
     * @tags movie-entity-controller
     * @name PutItemResourceMoviePut
     * @request PUT:/movies/{id}
     */
    putItemResourceMoviePut: (id, data, params = {}) =>
      this.request({
        path: `/movies/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
    /**
     * @description delete-movie
     *
     * @tags movie-entity-controller
     * @name DeleteItemResourceMovieDelete
     * @request DELETE:/movies/{id}
     */
    deleteItemResourceMovieDelete: (id, params = {}) =>
      this.request({
        path: `/movies/${id}`,
        method: "DELETE",
        ...params,
      }),
    /**
     * @description patch-movie
     *
     * @tags movie-entity-controller
     * @name PatchItemResourceMoviePatch
     * @request PATCH:/movies/{id}
     */
    patchItemResourceMoviePatch: (id, data, params = {}) =>
      this.request({
        path: `/movies/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
    /**
     * @description get-genre-by-movie-Id
     *
     * @tags movie-property-reference-controller
     * @name FollowPropertyReferenceMovieGet1
     * @request GET:/movies/{id}/genre
     */
    followPropertyReferenceMovieGet1: (id, params = {}) =>
      this.request({
        path: `/movies/${id}/genre`,
        method: "GET",
        format: "json",
        ...params,
      }),
    /**
     * @description update-genre-by-movie-Id
     *
     * @tags movie-property-reference-controller
     * @name CreatePropertyReferenceMoviePut
     * @request PUT:/movies/{id}/genre
     */
    createPropertyReferenceMoviePut: (id, data, params = {}) =>
      this.request({
        path: `/movies/${id}/genre`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
    /**
     * @description delete-genre-by-movie-Id
     *
     * @tags movie-property-reference-controller
     * @name DeletePropertyReferenceMovieDelete
     * @request DELETE:/movies/{id}/genre
     */
    deletePropertyReferenceMovieDelete: (id, params = {}) =>
      this.request({
        path: `/movies/${id}/genre`,
        method: "DELETE",
        ...params,
      }),
    /**
     * @description patch-genre-by-movie-Id
     *
     * @tags movie-property-reference-controller
     * @name CreatePropertyReferenceMoviePatch
     * @request PATCH:/movies/{id}/genre
     */
    createPropertyReferenceMoviePatch: (id, data, params = {}) =>
      this.request({
        path: `/movies/${id}/genre`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
    /**
     * @description get-genre-by-movie-Id
     *
     * @tags movie-property-reference-controller
     * @name FollowPropertyReferenceMovieGet
     * @request GET:/movies/{id}/genre/{propertyId}
     */
    followPropertyReferenceMovieGet: (id, propertyId, params = {}) =>
      this.request({
        path: `/movies/${id}/genre/${propertyId}`,
        method: "GET",
        format: "json",
        ...params,
      }),
    /**
     * @description delete-genre-by-movie-Id
     *
     * @tags movie-property-reference-controller
     * @name DeletePropertyReferenceIdMovieDelete
     * @request DELETE:/movies/{id}/genre/{propertyId}
     */
    deletePropertyReferenceIdMovieDelete: (id, propertyId, params = {}) =>
      this.request({
        path: `/movies/${id}/genre/${propertyId}`,
        method: "DELETE",
        ...params,
      }),
    /**
     * No description
     *
     * @tags movie-controller
     * @name GetAllGenreMovies
     * @request GET:/movies/genres
     */
    getAllGenreMovies: (params = {}) =>
      this.request({
        path: `/movies/genres`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  profile = {
    /**
     * No description
     *
     * @tags profile-controller
     * @name ListAllFormsOfMetadata1
     * @request GET:/profile
     */
    listAllFormsOfMetadata1: (params = {}) =>
      this.request({
        path: `/profile`,
        method: "GET",
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags profile-controller
     * @name Descriptor111
     * @request GET:/profile/accounts
     */
    descriptor111: (params = {}) =>
      this.request({
        path: `/profile/accounts`,
        method: "GET",
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags profile-controller
     * @name Descriptor112
     * @request GET:/profile/genres
     */
    descriptor112: (params = {}) =>
      this.request({
        path: `/profile/genres`,
        method: "GET",
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags profile-controller
     * @name Descriptor1
     * @request GET:/profile/movies
     */
    descriptor1: (params = {}) =>
      this.request({
        path: `/profile/movies`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  login = {
    /**
     * No description
     *
     * @tags account-controller
     * @name UserLogin
     * @request POST:/login
     */
    userLogin: (data, params = {}) =>
      this.request({
        path: `/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
