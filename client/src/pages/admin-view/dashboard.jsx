import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import {
  addFeatureImage,
  getFeatureImages,
  deleteFeatureImage,
} from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2 } from "lucide-react";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  function handleDeleteImage(imageUrl) {
    dispatch(deleteFeatureImage(imageUrl)).then((res) => {
      if (res?.payload?.success) {
        dispatch(getFeatureImages());
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      />

      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>

      <div className="flex flex-col gap-4 mt-5">
        {featureImageList?.length > 0 ? (
          featureImageList.map((featureImgItem, index) => (
            <div
              key={index}
              className="relative group border rounded-lg overflow-hidden"
            >
              <img
                src={featureImgItem.image}
                alt="Feature"
                className="w-full h-[300px] object-cover"
              />

              <button
                onClick={() => handleDeleteImage(featureImgItem.image)}
                className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition"
              >
               <Trash2 size={16} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No feature images found.</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
