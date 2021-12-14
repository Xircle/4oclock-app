import AxiosClient from "../apiClient";

const kakaoRESTApiKey = "152c0dc196279b0d56c7f090af095b38";

interface kakaoLocalData {
  place_name: string;
  address_name: string;
  plce_url: string;
  category_group_code: string;
  category_group_nme: string;
}

interface kakaoLocalResponse {
  documents: kakaoLocalData[];
}

export const kakaoLocal = {
  searchByNameAndKeyword: async (
    keyword: string
  ): Promise<kakaoLocalData[] | undefined> => {
    let searchResearch;
    const url = `https://dapi.kakao.com/v2/local/search/keyword.json?page=1&size=5&query=${keyword}`;
    //두번째api:"https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&x=127.106604&y=37.64116";
    const result = await fetch(url, {
      method: "post",
      headers: new Headers({
        Authorization: `KakaoAK ${kakaoRESTApiKey}`, //KakaoAK하고 한 칸 띄워야합니다.
      }),
    })
      .then((response) => response.json())
      .then((responseData: kakaoLocalResponse) => {
        searchResearch = responseData.documents;
      });
    return searchResearch;
  },
};
