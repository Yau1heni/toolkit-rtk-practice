import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "common/hooks";
import s from "./packs.module.css";
import { packsThunks } from "features/packs/packs-slice";
import { PackType } from "features/packs/packs-api";

export const Packs = () => {
  const cardPacks = useAppSelector((state) => state.packs.cardPacks);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(packsThunks.fetchPacks());
  }, []);

  const addPackHandler = () => {
    const newPack = {
      name: "🦁" + Math.random(),
    };
    dispatch(packsThunks.createPack(newPack));
  };

  const removePackHandler = (id: string) => {
    dispatch(packsThunks.removePack(id));
  };

  const updatePackHandler = (pack: PackType) => {
    const newName = "🦖" + Math.random();
    dispatch(packsThunks.updatePack({ ...pack, name: newName }));
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
            </div>
          );
        })}
      </div>
    </div>
  );
};
