import { Linking } from "react-native";

export const openLink = {
  LOpenLink: async (url: string) => {
    if (!url) return;
    await Linking.openURL(url);
  },
  LWriteReview: async (id: string) => {
    await Linking.openURL(`https://www.koreapas.com/m/sofo.php?kid=${id}`);
  },

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
      "https://longhaired-gym-a5e.notion.site/bf4fee3b18ff43d988f6532105d51604"
    );
  },
  LLocationAgree: async () => {
    await Linking.openURL(
      "https://sixth-lace-751.notion.site/b9f30a5063944628b104f19ad479b4f6"
    );
  },
  LInstagram: async () => {
    await Linking.openURL(
      "https://instagram.com/univ.eating_official?utm_medium=copy_link"
    );
  },
  LServiceGuide: async () => {
    await Linking.openURL("https://bit.ly/3ImoPjY");
  },
  LYoutube: async () => {
    await Linking.openURL(
      "https://youtube.com/channel/UCev1islBkJuHDZgbdcGOnlg"
    );
  },
  LPrivacyAgree: async () => {
    await Linking.openURL(
      "https://sixth-lace-751.notion.site/91c032eabd624b3a8744f8d699b40787"
    );
  },
  LOpenKakaoChatGUide: async () => {
    await Linking.openURL(
      "https://longhaired-gym-a5e.notion.site/b8c0db81145043d99ab757cb747e7a42"
    );
  },
};
