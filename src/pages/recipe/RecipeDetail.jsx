import { useParams } from "react-router-dom";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { useQuery } from "@tanstack/react-query";
import Banner from "@components/Recipe/Detail/Banner/Banner";
import Content from "@components/Recipe/Detail/Content/Content";
import SubTitle from "@components/Recipe/Detail/SubTitle/SubTitle";
import styles from "./RecipeDetail.module.css";

function RecipeDetail() {
  const { name } = useParams();
  const axios = useCustomAxios(true);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["detail"],
    queryFn: () => axios.get(`/1/1000/RCP_NM=${name}`),
    select: (response) => response.data.COOKRCP01.row[0],
  });

  console.log(data);
  // ingredient;
  return (
    <>
      {data && (
        <Banner
          name={data["RCP_NM"]}
          pat={data["RCP_PAT2"]}
          way={data["RCP_WAY2"]}
          type="haeRcp"
        />
      )}
      <Content>
        <SubTitle>재료</SubTitle>
        <SubTitle>단계별 레시피</SubTitle>
        <SubTitle>요리 후기</SubTitle>
      </Content>
    </>
  );
}

export default RecipeDetail;