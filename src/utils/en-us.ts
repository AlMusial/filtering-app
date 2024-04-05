interface IAppStrings {
  product: string;
  year: string;
  errors: {
    forbiddenError: string;
    serverError: string;
  };
}
export const strings: IAppStrings = {
  product: 'Product',
  year: 'year',
  errors: {
    forbiddenError: 'Access to this page is unavailable.',
    serverError: 'Something went wrong. Please try again later.',
  },
};
