import styled from 'styled-components/native';

type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'title' | 'text' | 'white'

interface IText {
  asTitle?: boolean,
  mono?: boolean,
  weight?: string,
  small?: boolean,
  marginVertical?: number,
  marginHorizontal?: number,
  variant?: Variant
  align?: 'center' | 'left' | 'right'
}

function getFontSize(size: number, small: boolean) {
  return small ? size - 4 : size;
}

function getColor(theme: any, variant?: Variant) {
  switch (variant) {
    case 'primary':
      return theme.color.primary;
    case 'secondary':
      return theme.color.secondary;
    case 'success':
      return theme.color.success;
    case 'warning':
      return theme.color.warning;
    case 'title':
      return theme.color.text.alt;
    case 'text':
      return theme.color.text.main;
    case 'white':
      return '#FFFFFF';
    default:
      return theme.color.text.main;
  }
}

export const Text = styled.Text<IText>`  
  color: ${({ theme, variant }) => getColor(theme, variant)};
  margin: ${({ marginVertical, asTitle }) => marginVertical ? marginVertical : asTitle ? 12 : 0}px ${({ marginHorizontal }) => marginHorizontal ? marginHorizontal : 0}px;
  font-family: ${({ mono }) => mono ? 'SpaceMono, moonospace' : "'sans-serif'"};
  font-size: ${({ theme, asTitle, small }) => getFontSize(asTitle ? theme.size.title : theme.size.text, small)}px;
  font-weight: ${({ weight }) => weight ? weight : 'normal'};
  text-align: ${({ align }) => align ? align : 'left'};
`;
