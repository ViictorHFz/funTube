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
      console.log(values);
    },
    clearForm() {
      setValues({})
    }
  };
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
