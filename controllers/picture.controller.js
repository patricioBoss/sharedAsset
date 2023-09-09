const { v4: uuidv4 } = require('uuid');
import response from '../apiUtil/reponses';
import proctAdmin from '../utils/firebase';
import User from '../models/user.model';
// import formidable from 'formidable';

//Storage Reference
const bucket = proctAdmin().storage().bucket(`gs://pipsvile.appspot.com`);

export const uploadFile = async (file, filename) =>
  bucket.upload(file, {
    public: true,
    destination: `/uploads/pipsville/${filename}`,
    metadata: {
      firebaseStorgaeDownloadTokens: uuidv4(),
    },
  });

export const uploadPhoto = async (req, res) => {
  try {
    const { _id } = req.profile;
    //get picture from files
    const file = req.files.photo;

    const uploadFileFirebase = await uploadFile(file.filepath, file.newFilename);

    if (!uploadFileFirebase) {
      return response(res, 500, 'error uploading to firebase', null);
    }
    await User.findOneAndUpdate({ _id }, { imageUrl: uploadFileFirebase[0].metadata.mediaLink });

    return response(res, 200, 'success', uploadFileFirebase[0].metadata.mediaLink);
  } catch (err) {
    console.log(err);
    return response(res, 500, err.message, null);
  }
};

export const verifyUpload = async (req, res) => {
  try {
    const { _id } = req.profile;
    //const file = await re.files.photo;
    const file = req.files.photo;

    console.log(file);
    const uploadFileFirebase = await uploadFile(file.filepath, file.newFilename);
    if (!uploadFileFirebase) {
      return response(res, 400, 'error uploading to firebase', null);
    }
    await User.findOneAndUpdate({ _id }, { IdImg: uploadFileFirebase[0].metadata.mediaLink });

    return response(res, 200, 'success', uploadFileFirebase[0].metadata.mediaLink);
  } catch (err) {
    console.log(err);
    response(res, 500, err.message, null);
  }
};
