import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImgSlider from "./ImgSlider";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Recommends from "./Recommends";
import Trending from "./Trending";
import Viewers from "./Viewers";
import db from "../firebase";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

  useEffect(() => {
    const unsubscribe = db.collection("movies").onSnapshot((snapshot) => {
      // Build fresh arrays on every snapshot so data never duplicates
      const recommends = [];
      const newDisneys = [];
      const originals = [];
      const trending = [];

      snapshot.docs.forEach((doc) => {
        const movie = { id: doc.id, ...doc.data() };

        switch (movie.type) {
          case "recommend":
            recommends.push(movie);
            break;
          case "new":
            newDisneys.push(movie);
            break;
          case "original":
            originals.push(movie);
            break;
          case "trending":
            trending.push(movie);
            break;
          default:
            break;
        }
      });

      dispatch(
        setMovies({
          recommend: recommends,
          newDisney: newDisneys,
          original: originals,
          trending: trending,
        })
      );
    });

    // Stop listening when the component unmounts or userName changes
    return unsubscribe;
  }, [userName, dispatch]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;