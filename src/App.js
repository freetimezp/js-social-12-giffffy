import { useState } from "react";
import styled from "styled-components";

import { useTheme } from "./context/themeContext";
import Header from "./Components/Header";
import Button from "./Components/Button";

import Trending from "./Components/Trending";
import Random from "./Components/Random";
import { useGlobal } from "./context/global";

function App() {
  const theme = useTheme();
  //console.log(theme);

  const { randomGiff } = useGlobal();

  //state
  const [rendered, setRendered] = useState('trending');

  const content = () => {
    switch (rendered) {
      case 'trending':
        return <Trending />;
      case 'liked':
        return <Trending />;
      case 'random':
        return <Random />;
      case 'search':
        return <Trending />;
      default:
        return <Trending />
    }
  };

  return (
    <AppStyled theme={theme}>
      <Header />

      <div className="fetch-btns">
        <Button
          name={"Liked"}
          icon={<i className="fa-solid fa-heart"></i>}
          onClick={() => setRendered('liked')}
        />
        <Button
          name={"Trending Gifs"}
          icon={<i className="fa-solid fa-arrow-trend-up"></i>}
          onClick={() => setRendered('trending')}
        />
        <Button
          name={"Random Gifs"}
          icon={<i className="fa-solid fa-shuffle"></i>}
          onClick={() => {
            setRendered('random');
            randomGiff();
          }}
        />
      </div>

      <main>
        {content()}
      </main>
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

  main {
    padding: 2rem 8rem;
  }
`;

export default App;
