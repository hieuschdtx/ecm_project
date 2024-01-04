import styled from 'styled-components';

export const StyleCardProduct = styled.div`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.$number}, 1fr)`};
  gap: 2px;
  background-color: white;
`;

export const StyleCardItem = styled.div`
  background-color: rgb(255, 255, 255);
  overflow: hidden;
  border-radius: 0px;
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 12px;
  -webkit-box-pack: justify;
  justify-content: space-between;
  &:hover {
    box-shadow: rgba(153, 153, 153, 0.6) 0px 0px 6px 0px;
  }
`;
