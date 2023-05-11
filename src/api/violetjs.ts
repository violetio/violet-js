let _apiRootPath = '';

export const initializeVioletjs = (apiRootPath: string) => {
  _apiRootPath = apiRootPath;
};

export const getConfig = () => ({
  apiRootPath: _apiRootPath,
});
