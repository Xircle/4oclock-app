import { Linking } from "react-native";

export const openLink = {
  LOpenKakaoChat: async () => {
    await Linking.openURL("http://pf.kakao.com/_Rczhb/chat");
  },
  LMarketingAgree: async () => {
    await Linking.openURL(
      "https://sixth-lace-751.notion.site/03e0c647bef34396a24b230927a55b4f"
    );
  },
  LServiceAgree: async () => {
    await Linking.openURL(
      "https://sixth-lace-751.notion.site/578c7e0e670845ab9de63ad54edf4fc8"
    );
  },
  LLocationAgree: async () => {
    await Linking.openURL(
      "https://sixth-lace-751.notion.site/b9f30a5063944628b104f19ad479b4f6"
    );
  },
  LInstagram: async () => {
    await Linking.openURL("https://www.instagram.com/ykuniv_eating_official/");
  },
  LServiceGuide: async () => {
    await Linking.openURL(
      "https://www.notion.so/yketing/50e486c6831e4f538be205d11de29be7"
    );
  },
  LYoutube: async () => {
    await Linking.openURL(
      "https://www.youtube.com/channel/UCNIwL_pCvrAt_hTp0ysZo-Q"
    );
  },
  LPrivacyAgree: async () => {
    await Linking.openURL(
      "https://sixth-lace-751.notion.site/91c032eabd624b3a8744f8d699b40787"
    );
  },
};
