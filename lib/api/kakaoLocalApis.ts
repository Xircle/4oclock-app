import AxiosClient from "../apiClient";

const kakaoRESTApiKey = "152c0dc196279b0d56c7f090af095b38";

export interface kakaoLocalData {
  place_name: string;
  address_name: string;
  plce_url: string;
  category_group_code: string;
  category_group_nme: string;
}

export interface kakaoLocalResponse {
  documents: kakaoLocalData[];
}

export const kakaoLocal = {
  searchByNameAndKeyword: async (keyword: string, size: number = 5) => {
    const url = `https://dapi.kakao.com/v2/local/search/keyword.json?page=1&size=${size}&query=${keyword}`;

    return await fetch(url, {
      method: "post",
      headers: new Headers({
        Authorization: `KakaoAK ${kakaoRESTApiKey}`,
      }),
    }).then((response) => response.json());
  },
};
