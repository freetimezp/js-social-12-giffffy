import styled from "styled-components";
import { useTheme } from "./context/themeContext";
import Header from "./Components/Header";

function App() {
  const theme = useTheme();
  //console.log(theme);

  return (
    <AppStyled theme={theme}>
      <Header />
    </AppStyled>
  );
}

const AppStyled = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colorBg1};
`;

export default App;
