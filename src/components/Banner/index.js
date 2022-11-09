import styled from "styled-components";
import config from "../../../config.json";

const Banner = styled.div`
    background-image: url(${({ bg }) => bg});
    height: 230px;
`;

//bg = background lá no config

export default Banner;