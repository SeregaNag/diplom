import React from "react";
import useFetchHistoryData from "../hooks/useFetchHistoryData";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

const EffGraph = (props) => {
  const { startTimestamp, endTimestamp } = props;
  const hostIdsData = [
    "10603",
    "10604",
    "10605",
    "10606",
    "10607",
    "10608",
    "10609",
    "10610",
    "10611",
    "10612",
    "10613",
    "10614",
    "10615",
    "10616",
    "10617",
    "10618",
    "10619",
    "10620",
    "10621",
    "10622",
    "10623",
  ];

  const itemIdsU32 = ["45018", "45020", "45021"];
  const itemIdsU33 = ["45028", "45030", "45031"];
  const itemIdsU34 = ["45038", "45040", "45041"];
  const itemIdsU35 = ["45048", "45050", "45051"];
  const itemIdsU36 = ["45058", "45060", "45061"];
  const itemIdsU37 = ["45068", "45070", "45071"];
  const itemIdsU38 = ["45078", "45080", "45081"];
  const itemIdsU39 = ["45088", "45090", "45091"];
  const itemIdsU40 = ["45098", "45100", "45101"];
  const itemIdsU41 = ["45108", "45110", "45111"];
  const itemIdsU42 = ["45118", "45120", "45121"];
  const itemIdsU43 = ["45128", "45130", "45131"];
  const itemIdsU44 = ["45138", "45140", "45141"];
  const itemIdsU45 = ["45148", "45150", "45151"];
  const itemIdsU46 = ["45158", "45160", "45161"];
  const itemIdsU47 = ["45168", "45170", "45171"];
  const itemIdsU48 = ["45178", "45180", "45181"];
  const itemIdsU49 = ["45188", "45190", "45191"];
  const itemIdsU50 = ["45198", "45200", "45201"];
  const itemIdsU51 = ["45208", "45210", "45211"];
  const itemIdsU52 = ["45218", "45220", "45221"];

  const dataEffU32 = useFetchHistoryData(
    hostIdsData[0],
    itemIdsU32,
    startTimestamp,
    endTimestamp
  );
  let dataVoltageIn = [];
  let dataVoltageOut = [];
  let dataCurrentOut = [];
  let lineData = [];

  dataEffU32.forEach((item, index) => {
    if (item.itemid == itemIdsU32[0]) {
      dataVoltageIn.push(item);
    } else if (item.itemid == itemIdsU32[1]) {
      dataVoltageOut.push(item);
    } else if (item.itemid == itemIdsU32[2]) {
      dataCurrentOut.push(item);
    }
  });
  dataCurrentOut.forEach((item, index) => {
    const voltageIn = Number(dataVoltageIn[index]?.value) || 1;
    const voltageOut = Number(dataVoltageOut[index]?.value) || 1;
    const value = (voltageOut / voltageIn) * 100;

    if (
      Boolean(!isNaN(value)) &&
      Boolean(item.value !== "0") &&
      Boolean(isFinite(value))
    ) {
      lineData.push({
        name: item.value,
        value,
      });
    }
  });

  const formatYAxis = (value) => {
    return value.toFixed(2) + "%";
  };

  console.log(lineData);

  return (
    <LineChart width={600} height={300} data={lineData}>
      <XAxis dataKey="name" />
      <YAxis tickFormatter={formatYAxis} domain={[80, 100]} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
    </LineChart>
  );
};

export default EffGraph;
