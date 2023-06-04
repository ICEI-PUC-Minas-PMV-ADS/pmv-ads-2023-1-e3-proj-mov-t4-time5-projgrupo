import styled from 'styled-components/native';

interface IText {
  asTitle?: boolean,
  mono?: boolean,
  weight?: string,
  small?: boolean,
}

function getFontSize(size, small) {
  return small ? size - 4 : size;
}

export const Text = styled.Text<IText>`
  color: ${({ theme, asTitle }) => asTitle ? theme.color.text.alt : theme.color.text.main};
  margin: ${({ asTitle }) => asTitle ? 16 : 0}px;
  font-family: ${({ mono }) => mono ? 'SpaceMono, moonospace' : "'sans-serif'"};
  font-size: ${({ theme, asTitle, small }) => getFontSize(asTitle ? theme.size.title : theme.size.text, small)}px;
  font-weight: ${({ weight }) => weight ? weight : 'normal'};
`;
