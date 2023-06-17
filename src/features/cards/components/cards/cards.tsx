import { useParams } from "react-router-dom";
import { useGetCardsQuery } from "features/cards/service/cards-api";
import { Progress } from "@mantine/core";

export const Cards = () => {
  let { packId } = useParams<{ packId: string }>();

  const { data, isLoading, error } = useGetCardsQuery(packId ?? "");

  if (isLoading) return <Progress animate value={100} />;

  return (
    <div>
      <h1>Cards</h1>
      {JSON.stringify(data)}
    </div>
  );
};
