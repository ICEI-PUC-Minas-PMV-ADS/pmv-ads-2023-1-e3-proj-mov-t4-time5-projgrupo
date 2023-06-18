import { DefaultTheme } from 'styled-components';
import { ThemeProvider } from 'styled-components/native';

const Size = {
  text: 16,
  title: 20,
  icon: 24,
  spacing: 8,
  borderRadius: 10,
}

const DarkTheme: DefaultTheme = {
  color: {
    text: {
      main: "#9f9fa5",
      alt: '#ffffff'
    },
    background: {
      main: '#474747',
      alt: '#141414'
    },
    primary: "#007aff",
    secondary: "#ff9500",
    warning: "#ff3b30",
    success: "#4cd964",
    info: "#5ac8fa",
    danger: "#ff2d55",
    border: "#adb3bc",
  },
  size: Size
}

const LightTheme: DefaultTheme = {
  color: {
    text: {
      main: "#39393d",
      alt: '#000000'
    },
    background: {
      main: '#adb3bc',
      alt: '#ffffff'
    },
    primary: "#007aff",
    secondary: "#ff9500",
    warning: "#ff3b30",
    success: "#4cd964",
    info: "#5ac8fa",
    danger: "#ff2d55",
    border: "#474747",
  },
  size: Size
}

export { DarkTheme, LightTheme, ThemeProvider }
