import { useEffect, useState } from "react";
import styled from "styled-components";
import config from "../config.json";
import Banner from "../src/components/Banner";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/StyledTimeline";
import { videoService } from "../src/services/videosService";


function HomePage() {
  const service = videoService();
  const [valorFiltro, setValorFiltro] = useState("");
  //config.playlists
  const [playlists, setPlaylists] = useState({});

  useEffect(() => {
    service
      .getAllVideos()
      .then((dados) => {
        console.log(dados.data);
        const novasPlaylists = { ...playlists };
        dados.data.forEach((video) => {
            if (!novasPlaylists[video.playlist]) novasPlaylists[video.playlist] = [];
            novasPlaylists[video.playlist].push(video);
        });
        setPlaylists(novasPlaylists);
        });
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Menu searchValue={valorFiltro} setValorFiltro={setValorFiltro} />
        <Header />
        <Timeline searchValue={valorFiltro} playlists={playlists} />
      </div>
    </>
  );
}

export default HomePage;

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.backgroundLevel1};

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user__info {
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
      <Banner bg={config.bg} />
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

function Timeline({ searchValue, ...props }) {
  const playlistsNames = Object.keys(props.playlists);
  return (
    <StyledTimeline>
      {playlistsNames.map((playlistName) => {
        const videos = props.playlists[playlistName];
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos
                .filter((video) => {
                  const titleNormalized = video.title.toLowerCase();
                  const searchValueNormalized = searchValue.toLowerCase();
                  return titleNormalized.includes(searchValueNormalized);
                })
                .map((video) => {
                  return (
                    <a key={video.url} href={video.url}>
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
