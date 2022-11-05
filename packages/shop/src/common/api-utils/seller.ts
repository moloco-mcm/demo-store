import yup from '../utils/yup';
import { getFirebaseAdminApp } from '../firebase-admin';
import { Seller } from '../types/seller';

const SELLER_DOC_SCHEMA = yup.object().shape({
  name: yup.string().required(),
});

export const fetchSellerDocSnapshot = (id: string) =>
  getFirebaseAdminApp().firestore().collection('sellers').doc(id).get();

export const translateSellerDocToSeller = (
  docSnapshot: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
): Seller | undefined => {
  const data = docSnapshot.data();

  if (!docSnapshot.exists || data === undefined) {
    return undefined;
  }

  const isValid = SELLER_DOC_SCHEMA.isValidSync(data, {
    strict: true,
    abortEarly: true,
  });

  if (!isValid) {
    return undefined;
  }

  return {
    id: docSnapshot.id,
    name: data.name,
  };
};
