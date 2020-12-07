import { StyleSheet, Font } from '@react-pdf/renderer';
import { CRIMSON, LATO } from './const';

Font.register({
  family: CRIMSON,
  fonts: [
    {
      src: `${process.env.PUBLIC_URL}/fonts/CrimsonText-Regular.ttf`,
      fontStyle: 'normal',
      fontWeight: 400,
    },
  ],
});

Font.register({
  family: LATO,
  fonts: [
    {
      src: `${process.env.PUBLIC_URL}/fonts/Lato-Regular.ttf`,
      fontStyle: 'normal',
      fontWeight: 400,
    },
    {
      src: `${process.env.PUBLIC_URL}/fonts/Lato-Bold.ttf`,
      fontStyle: 'normal',
      fontWeight: 700,
    },
    {
      src: `${process.env.PUBLIC_URL}/fonts/Lato-Black.ttf`,
      fontStyle: 'normal',
      fontWeight: 900,
    },
  ],
});

const commonStyles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontFamily: CRIMSON,
  },
  h2: {
    fontSize: 24,
    marginBottom: 16,
    fontFamily: CRIMSON,
  },
  h3: {
    fontSize: 14,
    fontWeight: 700,
    fontFamily: LATO,
    marginBottom: 6,
  },
  h4: {
    fontSize: 12,
    fontWeight: 700,
    fontFamily: LATO,
  },
  link: {
    color: '#004DC7',
    textDecoration: 'none',
  },
  small: {
    fontSize: 8,
  },

  bold: {
    fontWeight: 700,
  },
  black: {
    fontWeight: 900,
  },
  mb1: {
    marginBottom: 16,
  },

  pageBody: {
    padding: 50,
    fontFamily: LATO,
    fontSize: 12,
  },
});

export default commonStyles;
