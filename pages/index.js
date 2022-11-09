import { useState } from "react";
import styled from "styled-components";
import config from "../config.json";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/StyledTimeline";

function HomePage() {

  const [valorFiltro, setValorFiltro] = useState('')

  return (
    <>
      <CSSReset />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Menu searchValue={valorFiltro} setValorFiltro={setValorFiltro}/>
        <Header />
        <Timeline searchValue={valorFiltro} playlists={config.playlists} />
      </div>
    </>
  );
}

export default HomePage;


const StyledHeader = styled.div`
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user__info {
    margin-top: 50px;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;

function Header() {
  return (
    <StyledHeader>
      {/* <img src="banner" /> */}
      <section className="user__info">
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  );
}

function Timeline({searchValue, ...props}) {
  const playlistsNames = Object.keys(props.playlists);
  return (
    <StyledTimeline>
      {playlistsNames.map((playlistName) => {
        const videos = props.playlists[playlistName];
        // console.log(playlistName);
        // console.log(videos);
        return (
          <section>
            <h2>{playlistName}</h2>
            <div>
              {videos.filter((video) => {
                const titleNormalized = video.title.toLowerCase();
                const searchValueNormalized = searchValue.toLowerCase();
                return titleNormalized.includes(searchValueNormalized);
              }).map((video) => {
                return (
                  <a href={video.url}>
                    <img src={video.thumb} />
                    <span>{video.title}</span>
                  </a>
                );
              })}
            </div>
          </section>
        );
      })}
    </StyledTimeline>
  );
}
