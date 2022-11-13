import { createClient } from '@supabase/supabase-js';
import React from "react";
import { StyledRegisterVideo } from "./styles";

//Custom Hook
function useForm(propsForm) {
  const [values, setValues] = React.useState(propsForm.initialValues);

  return {
    values,
    handleChange: (event) => {
      const value = event.target.value;
      const name = event.target.name;
      setValues({
        ...values,
        [name]: value
      });
    },
    clearForm() {
      setValues({
        titulo: "",
        url: ""
      })
    }
  };
}

const PROJECT_URL = 'https://eeixiqoaxpvyhdmkhaww.supabase.co'
const PUBLIC_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlaXhpcW9heHB2eWhkbWtoYXd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzNjcxODgsImV4cCI6MTk4Mzk0MzE4OH0.7uwl8AgCtQIbiyP46GMq1cP7mhxescjZCxvXrPZpuOg'
const supabase = createClient(PROJECT_URL, PUBLIC_API_KEY);

//pega a thumbnail do video baseado no url do video do YOUTUBE
function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}


export default function RegisterVideo() {
  const formCadastroVideo = useForm({
    initialValues: { titulo: "teste", url: "https://youtube.com" },
  });
  const [formVisivel, setFormVisivel] = React.useState(false);

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setFormVisivel(true)}>
        +
      </button>
      {formVisivel && (
        <form onSubmit={(event) => {
          event.preventDefault();

          supabase.from("tb_video").insert({
            title: formCadastroVideo.values.title,
            url: formCadastroVideo.values.url,
            thumb: getThumbnail(formCadastroVideo.values.url) ,
            playlist: "games"
          })
          // .then((veioOQ) => {
          //   console.log(veioOQ)
          // })
          // .catch((err) => {
          //   console.log('deu errado porra' + err)
          // })

          setFormVisivel(false);
          formCadastroVideo.clearForm();
        } }>
          <div>
            <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>X</button>
            <input
              placeholder="Título do vídeo"
              name="titulo"
              value={formCadastroVideo.values.titulo}
              onChange={formCadastroVideo.handleChange}
            />
            <input
              placeholder="URL"
              name="url"
              value={formCadastroVideo.values.url}
              onChange={formCadastroVideo.handleChange}
            />
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      )}
    </StyledRegisterVideo>
  );
}
