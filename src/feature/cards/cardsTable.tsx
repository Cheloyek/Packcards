import React, {useEffect, useRef} from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { useSelector } from "react-redux";
import { selectorCards } from "./cardsSelectors";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CardsActionsIconPack } from "./cardsActionsIconPack";
import { CardsTableHead } from "./cardsTableHead";
import { CardsTableBody } from "./cardsTableBody";
import { CardsTablePagination } from "./cardsTablePagination";
import { useAppDispatch } from "../../app/store";
import { getCardsTC } from "./cardsReducer";
import { selectAppStatus } from "../../app/appSelectors";
import PATH from "../../common/constans/path/path";
import { SkeletonLoader } from "../../common/skeletonLoader/skeletonLoader";
import { CardsType } from "./cardsAPI";
import {Order} from "../packs/packsTableHead";

export const CardsList = () => {
  const [searchParams] = useSearchParams();;
  const URLParams = Object.fromEntries(searchParams);

  const cards = useSelector(selectorCards);
  const status = useSelector(selectAppStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const statusApp = useSelector(selectAppStatus);
  const [orderBy, setOrderBy] = React.useState<string>("grade");
  const orderRef = useRef<Order>("asc");

  useEffect(() => {
    dispatch(getCardsTC(URLParams));

  }, [dispatch, searchParams]);

  function createData(question: string, answer: string, lastUpdated: string, grade: number,answerImg:string,questionImg:string, actions: any): DataCards {
    return { question, answer, lastUpdated, grade,answerImg,questionImg, actions };
  }

  const rows = cards?.map((card: CardsType) => {
    return createData(
      card.question,
      card.answer,
      card.updated.substring(0, 10),
      card.grade,
      card.answerImg,
      card.questionImg,
      <CardsActionsIconPack
        user_id={card.user_id}
        questionTitle={card.question}
        answer={card.answer}
        answerImg={card.answerImg}
        questionImg={card.questionImg}
        card_id={card._id}
        pack_id={card.cardsPack_id}
      />
    );
  });

  useEffect(() => {
    if (cards && cards.length === 0 && status === "idle") {
      navigate(PATH.EMPTY_PACK);
    }
  }, [status]);

  return (
    <div>
      {statusApp === "loading" ? (
        <SkeletonLoader height={"60px"} count={5} />
      ) : (
        <Paper>
          <Table aria-labelledby="tableTitle" size={"medium"}>
            <CardsTableHead orderRef={orderRef} urlParams={URLParams}
            orderBy={orderBy} setOrderBy={setOrderBy}/>
            <CardsTableBody rows={rows} />
          </Table>
          <CardsTablePagination />
        </Paper>
      )}
    </div>
  );
};

////////types //////////

export type DataCards = {
  question: string;
  answer: string;
  lastUpdated: string;
  grade: number;
  answerImg:string;
  questionImg:string;
  actions: string;
};
