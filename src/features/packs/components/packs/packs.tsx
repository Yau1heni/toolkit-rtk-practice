import { useEffect } from "react";
import { useActions, useAppSelector } from "common/hooks";
import s from "features/packs/components/packs/packs.module.css";
import { packsThunks } from "features/packs/packs-slice";
import { PackType } from "features/packs/service/packs-api";
import { useNavigate } from "react-router-dom";

export const Packs = () => {
  const { fetchPacks, removePack, createPack, updatePack } = useActions(packsThunks);
  const cardPacks = useAppSelector((state) => state.packs.cardPacks);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPacks();
  }, []);

  const addPackHandler = () => {
    const newPack = {
      name: "🦁" + Math.random(),
    };
    createPack(newPack);
  };

  const removePackHandler = (id: string) => {
    removePack(id);
  };

  const updatePackHandler = (pack: PackType) => {
    const newName = "🦖" + Math.random();
    updatePack({ ...pack, name: newName });
  };

  const navigateToCardsPageHandler = (packId: string) => {
    navigate(`/cards/${packId}`);
  };

  return (
    <div>
      <h1>Packs</h1>
      <button onClick={addPackHandler}>add pack</button>
      <div>
        {cardPacks.map((p) => {
          return (
            <div key={p._id} className={s.container}>
              <p>
                <b>pack name</b>: {p.name}
              </p>
              <p>
                <b>cardsCount</b>: {p.cardsCount}
              </p>
              <p>
                <b>user name</b>: {p.user_name}
              </p>
              <button onClick={() => removePackHandler(p._id)}>remove</button>
              <button onClick={() => updatePackHandler(p)}>update</button>
              <button onClick={() => navigateToCardsPageHandler(p._id)}>cards</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
