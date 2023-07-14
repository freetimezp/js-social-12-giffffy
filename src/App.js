import styled from "styled-components";

import { useTheme } from "./context/themeContext";
import Header from "./Components/Header";
import Button from "./Components/Button";

function App() {
  const theme = useTheme();
  //console.log(theme);

  return (
    <AppStyled theme={theme}>
      <Header />

      <div className="fetch-btns">
        <Button
          name={"Liked"}
          icon={<i className="fa-solid fa-heart"></i>}
        />
        <Button
          name={"Trending Gifs"}
          icon={<i className="fa-solid fa-arrow-trend-up"></i>}
        />
        <Button
          name={"Random Gifs"}
          icon={<i className="fa-solid fa-shuffle"></i>}
        />
      </div>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colorBg1};

  .fetch-btns {
    display: flex;
    justify-content: center;
    gap: 4rem;
    margin-top: 4rem;
    margin-bottom: 4rem;
  }
`;

export default App;
