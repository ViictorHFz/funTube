import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import styled from "styled-components";
import config from "../config.json";
import Banner from "../src/components/Banner";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/StyledTimeline";

const PROJECT_URL = "https://eeixiqoaxpvyhdmkhaww.supabase.co";
const PUBLIC_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlaXhpcW9heHB2eWhkbWtoYXd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzNjcxODgsImV4cCI6MTk4Mzk0MzE4OH0.7uwl8AgCtQIbiyP46GMq1cP7mhxescjZCxvXrPZpuOg";
const supabase = createClient(PROJECT_URL, PUBLIC_API_KEY);

function HomePage() {
  const [valorFiltro, setValorFiltro] = useState("");
  //config.playlists
  const [playlists, setPlaylists] = useState({});

  useEffect(() => {
    supabase
      .from("tb_video")
      .select("*")
      .then((dados) => {
        console.log(dados.data);
        const novasPlaylists = {...playlists}
        dados.data.forEach((video) => {
          if(!novasPlaylists[video.playlist]) {
            novasPlaylists[video.playlist] = [];
          }
          novasPlaylists[video.playlist].push(video);
        });
        setPlaylists(novasPlaylists)
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
