import axios from "@/config/axios";
import { TAdvertisement } from "@/types/advertisement";

const createAdvertisement = async (payload: any): Promise<TAdvertisement> => {
  let formData = new FormData();
  for (let key in payload) {
    const data = payload[key];
    formData.append(key, data);
  }
  console.log(payload);

  const { data } = await axios.post(`api/advertisement`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(data);
  return data.data as TAdvertisement;
};

export default createAdvertisement;
