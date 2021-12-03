import { getFirebaseAdminApp } from '../firebase-admin';
import { CartItem } from '../types';
import yup from '../utils/yup';
import { translateProductDocsToProducts } from './products';

const CART_DOC_SCHEMA = yup
  .object()
  .shape({
    items: yup.array().of(
      yup.object().shape({
        productId: yup.string().required(),
        quantity: yup.number().required().positive().integer(),
      })
    ),
  })
  .required();

type CartDoc = {
  items?: {
    productId: string;
    quantity: number;
  }[];
};

export const isValidCartDocData = (data: any): data is CartDoc =>
  CART_DOC_SCHEMA.isValidSync(data, {
    strict: true,
    abortEarly: true,
  });

export const fetchCartDoc = (userId: string) =>
  getFirebaseAdminApp().firestore().collection('cart').doc(userId).get();

export const expandCartItems = async (
  items: CartDoc['items']
): Promise<CartItem[]> => {
  if (!items || items.length === 0) {
    return [];
  }

  const firestore = getFirebaseAdminApp().firestore();
  const productsCollection = firestore.collection('products');
  const productDocRefs = items.map((item) =>
    productsCollection.doc(item.productId)
  );

  const productDocSnapshots = await firestore.getAll(...productDocRefs);

  const products = translateProductDocsToProducts(productDocSnapshots);

  return products.map((product) => ({
    product,
    quantity: items.find((i) => i.productId == product.id)?.quantity || 0,
  }));
};
