import yup from '../utils/yup';
import { Product } from '../types/product';
import { getFirebaseAdminApp } from '../firebase-admin';

const PRODUCT_DOC_SCHEMA = yup
  .object()
  .shape({
    id: yup.string().required(),
    title: yup.string().required(),
    price: yup
      .object()
      .shape({
        currency: yup.string().required(),
        amount: yup.number().required().positive(),
      })
      .required(),
    salePrice: yup
      .object()
      .notRequired()
      .shape({
        currency: yup.string().required(),
        amount: yup.number().required().positive(),
      })
      .optional(),
    reviewCount: yup.number(),
    ratingScore: yup.number(),
    imageLink: yup.string().required(),
    thumbnailLink: yup.string().required(),
    adAccountId: yup.string().required(), // TODO: rename into "sellerId"
  })
  .required();

export const fetchProductDocSnapshot = (productId: string) =>
  getFirebaseAdminApp().firestore().collection('products').doc(productId).get();

export const translateProductDocToProduct = (
  docSnapshot: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
): Product | undefined => {
  const data = docSnapshot.data();

  if (!docSnapshot.exists || data === undefined) {
    return undefined;
  }

  const isValid = PRODUCT_DOC_SCHEMA.isValidSync(data, {
    strict: true,
    abortEarly: true,
  });

  if (!isValid) {
    return undefined;
  }

  return {
    id: data.id,
    title: data.title,
    price: data.price,
    salePrice: data.salePrice,
    imageUrl: data.imageLink,
    thumbnailUrl: data.thumbnailLink,
    reviewCount: data.reviewCount,
    rating: data.ratingScore,
    adAccountId: data.adAccountId,
  };
};

export const translateProductDocsToProducts = (
  docSnapshots: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>[]
): Product[] =>
  docSnapshots.reduce<Product[]>((acc, current) => {
    const result = translateProductDocToProduct(current);
    if (!result) return acc;
    return [...acc, result];
  }, []);
