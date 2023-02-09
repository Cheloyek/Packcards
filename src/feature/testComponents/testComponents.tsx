import SuperSelect from "../../common/c5-SuperSelect/SuperSelect";
import SuperInputText from "../../common/c1-SuperInputText/SuperInputText";
import SuperCheckbox from "../../common/c3-SuperCheckbox/SuperCheckbox";
import SuperEditableSpan from "../../common/c4-SuperEditableSpan/SuperEditableSpan";
import SuperRadio from "../../common/c6-SuperRadio/SuperRadio";
import SuperRange from "../../common/c7-SuperRange/SuperRange";
import SuperDebouncedInput from "../../common/c8-SuperDebouncedInput/SuperDebouncedInput";

import s from "./TestComponents.module.css";

export const TestComponents = () => {
  return (
    <div className={s.wrapper}>
      <SuperSelect />
      <SuperInputText />
      <SuperCheckbox />
      <SuperEditableSpan />
      <SuperRadio />
      <SuperRange />
      <SuperDebouncedInput />
    </div>
  );
};
