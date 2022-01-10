import { ActivityAction } from "./ActivityReducer";

export const activityValidation = {
  validateName: (name: string) => {
    return name.length > 2 && name.length < 21;
  },
  validateDescription: (description: string) => {
    return description.length > 0 && description.length < 500;
  },
  validateTime: (time: Date) => {
    const tempTime = new Date();

    return time.getTime() - tempTime.getTime() > 1800000;
  },
  validateDetailAddress: (address: string) => {
    return address.length > 0;
  },
  validateParticipationFee: (fee: string) => {
    return fee.length > 0 && !isNaN(Number(fee));
  },
};
