const Config = {
  appWriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appWriteId: String(import.meta.env.VITE_APPWRITE_ID),
  appWriteDatabase: String(import.meta.env.VITE_APPWRITE_DATABASE),
  appWriteCollection: String(import.meta.env.VITE_APPWRITE_COLLECTION),
  appWriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default Config;
