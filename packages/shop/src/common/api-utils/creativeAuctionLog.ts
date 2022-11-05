import yup from '../utils/yup';
import { getFirebaseAdminApp } from '../firebase-admin';
import { CreativeAuctionLog } from '../types/creativeAuctionLog';

const CREATIVE_AUCTION_LOG_DOC_SCHEMA = yup.object().shape({
  response: yup
    .object()
    .shape({
      requestId: yup.string().required(),
      items: yup.array().of(
        yup
          .object()
          .shape({
            itemId: yup.string().required(),
            impTrackers: yup.array().of(yup.string().required()).required(),
            clickTrackers: yup.array().of(yup.string().required()).required(),
          })
          .required()
      ),
    })
    .required(),
});

export const fetchCreativeAuctionLogDocSnapshot = (requestId: string) =>
  getFirebaseAdminApp()
    .firestore()
    .collection('creativeAuctionLog')
    .doc(requestId)
    .get();

export const storeCreativeAuctionLog = (requestId: string, data: any) =>
  getFirebaseAdminApp()
    .firestore()
    .collection('creativeAuctionLog')
    .doc(requestId)
    .set(data);

export const translateCreativeAuctionLogDocToCreativeAuctionLog = (
  docSnapshot: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
): CreativeAuctionLog | undefined => {
  const data = docSnapshot.data();

  if (!docSnapshot.exists || data === undefined) {
    return undefined;
  }

  const isValid = CREATIVE_AUCTION_LOG_DOC_SCHEMA.isValidSync(data, {
    strict: true,
    abortEarly: true,
  });

  if (!isValid) {
    return undefined;
  }

  return data;
};
