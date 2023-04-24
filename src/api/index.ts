let _apiRootPath = '';

export const violetjs = (apiRootPath: string) => {
  _apiRootPath = apiRootPath;
};

export const getConfig = () => ({
  apiRootPath: _apiRootPath,
});
