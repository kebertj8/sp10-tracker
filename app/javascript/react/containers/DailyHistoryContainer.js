import React from "react";
import { DailyHistoryRow } from "../tiles/DailyHistoryRow";
import { Pagination } from "../tiles/Pagination";

export const DailyHistoryContainer = ({
  records,
  currentRecords,
  currentPage,
  setCurrentPage,
  recordsPerPage,
  totalRecords
}) => {
  let n = 0;
  const dailyHistoryRows = currentRecords.map(dataRow => {
    n = n + 1;
    return <DailyHistoryRow key={n} data={dataRow} />;
  });

  return (
    <div className="padding-10">
      <div className="section-title section-title-no-bottom">
        <span className="w7">SP10 Daily Records</span>
        <span>{records.length} Records</span>
      </div>
      <div className="row history-row">
        <div className="small-6 columns w5">Date</div>
        <div className="small-6 history-row-flex">
          <div className="w5">SP10</div>
          <div className="w5">S&P 500</div>
          <div className="w5">Delta</div>
        </div>
      </div>
      {dailyHistoryRows}
      <div className="container">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          recordsPerPage={recordsPerPage}
          totalRecords={totalRecords}
        />
      </div>
    </div>
  );
};
