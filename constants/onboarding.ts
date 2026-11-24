

import { ImageSourcePropType } from 'react-native';

export interface OnboardingItem {
    title: string;
    tagline: string;
    description: string;
    image: ImageSourcePropType;
}
export const ONBOARDING_DATA = [
    {
        title: 'Ice Vault',
        tagline: 'Store fresh. Grow More',
        description: 'Reliable Cold Storage for Your Cold Room',
        image: require(''),
    },
];