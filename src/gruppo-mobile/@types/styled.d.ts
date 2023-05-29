// styled.d.ts
import 'styled-components';
interface IPalette {
  main: string
  alt: string
}

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {      
      text: IPalette,
      background: IPalette,      
      primary: string,
      secondary: string,
      warning: string,
      success: string,
      info: string,
      danger: string,
      border: string,
    },
    size: {
      text: number,
      title: number,
      icon: number,
      spacing: number,
      borderRadius: number,
    }
  }
}
