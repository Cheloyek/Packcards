import React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {headCellsCards} from "../../common/constans/table";
import s from "./Cards.module.css";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";
import {useAppDispatch} from "../../app/store";
import {Order, SortPropsType} from "../packs/packsTableHead";
import {getCardsTC} from "./cardsReducer";


export const CardsTableHead = ({ orderRef, urlParams, orderBy, setOrderBy }:SortPropsType ) => {
  const dispatch = useAppDispatch();
  let params: any;

  const onRequestSort = (event: React.MouseEvent<unknown>, property: string, order: Order) => {
    setOrderBy(property);

    let cellName = property;

    if (property === "lastUpdated") {
      cellName = "updated";
    }
    if (order === "asc") {
      console.log("URL PAR 2", urlParams.cardsPack_id)
      orderRef.current = "desc";
      params = {cardsPack_id: urlParams.cardsPack_id,  sortCards: `0${cellName}`,pageCount: urlParams.pageCount };
    }
    if (order === "desc") {
      orderRef.current = "asc";
      params = {cardsPack_id: urlParams.cardsPack_id,  sortCards: `1${cellName}`,pageCount: urlParams.pageCount };
    }
    console.log(params,"PARAMS")
    dispatch(getCardsTC(params));
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="none"></TableCell>
        {headCellsCards.map((headCell) =>
          <TableCell key={headCell.id}
                     sortDirection={orderBy === headCell.id ? orderRef.current : false}
                     className={s.headCell}
                     sx={{ paddingRight: "36px", textAlign: "left"}}>
            <TableSortLabel active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? orderRef.current : "asc"}
                            onClick={(e) => onRequestSort(e, headCell.id, orderRef.current)}>
              <span className={s.headCell}>{headCell.label}</span>
              {orderBy === headCell.id && (
                  <Box component="span" sx={visuallyHidden}>
                    {orderRef.current === "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
              )}
            </TableSortLabel>
          </TableCell>)}
      </TableRow>
    </TableHead>
  );
};
