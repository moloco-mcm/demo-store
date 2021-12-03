import yup from '../utils/yup';

const ORDER_DOC_SCHEMA = yup
  .object()
  .shape({
    userId: yup.string().required(),
    items: yup.array().of(
      yup.object().shape({
        productId: yup.string().required(),
        price: yup
          .object()
          .shape({
            currency: yup.string().required(),
            amount: yup.number().required().positive(),
          })
          .required(),
        quantity: yup.number().required().positive().integer(),
      })
    ),
    createdAt: yup.number().required(),
  })
  .required();

type OrderDoc = {
  userId: string;
  items?: {
    productId: string;
    price: {
      currency: string;
      amount: number;
    };
    quantity: number;
  }[];
  createdAt: number;
};

export const isValidOrderDocData = (data: any): data is OrderDoc =>
  ORDER_DOC_SCHEMA.isValidSync(data, {
    strict: true,
    abortEarly: true,
  });
