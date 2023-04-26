import React from "react";
import useFetchHistoryData from "../hooks/useFetchHistoryData";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

const EffGraph = (props) => {
  const { startTimestamp, endTimestamp } = props;

  const formatYAxis = (value) => {
    return value.toFixed(2) + "%";
  };

  const dataEff10603 = useFetchHistoryData(
    "10603",
    ["45018", "45020", "45021"],
    startTimestamp,
    endTimestamp
  );

  const dataEff10604 = useFetchHistoryData(
    "10604",
    ["45028", "45030", "45031"],
    startTimestamp,
    endTimestamp
  );

  const dataEff10605 = useFetchHistoryData(
    "10605",
    ["45038", "45040", "45041"],
    startTimestamp,
    endTimestamp
  );

  const dataEff10606 = useFetchHistoryData(
    "10606",
    ["45048", "45050", "45051"],
    startTimestamp,
    endTimestamp
  );

  const dataEff10607 = useFetchHistoryData(
    "10607",
    ["45058", "45060", "45061"],
    startTimestamp,
    endTimestamp
  );

  const dataEff10608 = useFetchHistoryData(
    "10608",
    ["45068", "45070", "45071"],
    startTimestamp,
    endTimestamp
  );

  const dataEff10609 = useFetchHistoryData(
    "10609",
    ["45078", "45080", "45081"],
    startTimestamp,
    endTimestamp
  );

  const dataEff10610 = useFetchHistoryData(
    "10610",
    ["45088", "45090", "45091"],
    startTimestamp,
    endTimestamp
  );

  const dataEff10611 = useFetchHistoryData(
    "10611",
    ["45098", "45100", "45101"],
    startTimestamp,
    endTimestamp
  );

  const dataEff10612 = useFetchHistoryData(
    "10612",
    ["45108", "45110", "45111"],
    startTimestamp,
    endTimestamp
  );

  const dataEff10613 = useFetchHistoryData(
    "10613",
    ["45118", "45120", "45121"],
    startTimestamp,
    endTimestamp
  );

  const dataEff10614 = useFetchHistoryData(
    "10614",
    ["45128", "45130", "45131"],
    startTimestamp,
    endTimestamp
  );

  const dataEff10615 = useFetchHistoryData(
    "10615",
    ["45138", "45140", "45141"],
    startTimestamp,
    endTimestamp
  );

  const dataEff10616 = useFetchHistoryData(
    "10616",
    ["45148", "45150", "45151"],
    startTimestamp,
    endTimestamp
  );

  const dataEff10617 = useFetchHistoryData(
    "10617",
    ["45158", "45160", "45161"],
    startTimestamp,
    endTimestamp
  );

  const dataEff10618 = useFetchHistoryData(
    "10618",
    ["45168", "45170", "45171"],
    startTimestamp,
    endTimestamp
  );

  const dataEff10619 = useFetchHistoryData(
    "10619",
    ["45178", "45180", "45181"],
    startTimestamp,
    endTimestamp
  );

  const dataEff10620 = useFetchHistoryData(
    "10620",
    ["45188", "45190", "45191"],
    startTimestamp,
    endTimestamp
  );

  const dataEff10621 = useFetchHistoryData(
    "10621",
    ["45198", "45200", "45201"],
    startTimestamp,
    endTimestamp
  );

  const dataEff10622 = useFetchHistoryData(
    "10622",
    ["45208", "45210", "45211"],
    startTimestamp,
    endTimestamp
  );

  const dataEff10623 = useFetchHistoryData(
    "10623",
    ["45218", "45220", "45221"],
    startTimestamp,
    endTimestamp
  );

  const getEfficiencyData = (dataEff, itemIds) => {
    const data = [];
    let dataVoltageIn = [];
    let dataVoltageOut = [];
    let dataCurrentOut = [];

    dataEff.forEach((item, index) => {
      if (item.itemid === itemIds[0]) {
        dataVoltageIn.push(item);
      } else if (item.itemid === itemIds[1]) {
        dataVoltageOut.push(item);
      } else if (item.itemid === itemIds[2]) {
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
        data.push({
          name: item.value,
          value,
        });
      }
    });
    return data;
  };

  const data10603 = getEfficiencyData(dataEff10603, [
    "45018",
    "45020",
    "45021",
  ]);
  const data10604 = getEfficiencyData(dataEff10604, [
    "45028",
    "45030",
    "45031",
  ]);
  const data10605 = getEfficiencyData(dataEff10605, [
    "45038",
    "45040",
    "45041",
  ]);
  const data10606 = getEfficiencyData(dataEff10606, [
    "45048",
    "45050",
    "45051",
  ]);
  const data10607 = getEfficiencyData(dataEff10607, [
    "45058",
    "45060",
    "45061",
  ]);
  const data10608 = getEfficiencyData(dataEff10608, [
    "45068",
    "45070",
    "45071",
  ]);
  const data10609 = getEfficiencyData(dataEff10609, [
    "45078",
    "45080",
    "45081",
  ]);
  const data10610 = getEfficiencyData(dataEff10610, [
    "45088",
    "45090",
    "45091",
  ]);
  const data10611 = getEfficiencyData(dataEff10611, [
    "45098",
    "45100",
    "45101",
  ]);
  const data10612 = getEfficiencyData(dataEff10612, [
    "45108",
    "45110",
    "45111",
  ]);
  const data10613 = getEfficiencyData(dataEff10613, [
    "45118",
    "45120",
    "45121",
  ]);
  const data10614 = getEfficiencyData(dataEff10614, [
    "45128",
    "45130",
    "45131",
  ]);
  const data10615 = getEfficiencyData(dataEff10615, [
    "45138",
    "45140",
    "45141",
  ]);
  const data10616 = getEfficiencyData(dataEff10616, [
    "45148",
    "45150",
    "45151",
  ]);
  const data10617 = getEfficiencyData(dataEff10617, [
    "45158",
    "45160",
    "45161",
  ]);
  const data10618 = getEfficiencyData(dataEff10618, [
    "45168",
    "45170",
    "45171",
  ]);
  const data10619 = getEfficiencyData(dataEff10619, [
    "45178",
    "45180",
    "45181",
  ]);
  const data10620 = getEfficiencyData(dataEff10620, [
    "45188",
    "45190",
    "45191",
  ]);
  const data10621 = getEfficiencyData(dataEff10621, [
    "45198",
    "45200",
    "45201",
  ]);
  const data10622 = getEfficiencyData(dataEff10622, [
    "45208",
    "45210",
    "45211",
  ]);
  const data10623 = getEfficiencyData(dataEff10623, [
    "45218",
    "45220",
    "45221",
  ]);

  const lineCharts = [
    {
      name: "u32",
      data: data10603,
      color: "#8884d8",
    },
    {
      name: "u33",
      data: data10604,
      color: "#82ca9d",
    },
    {
      name: "u34",
      data: data10605,
      color: "#ffc658",
    },
    {
      name: "u35",
      data: data10606,
      color: "#A37B00",
    },
    {
      name: "u36",
      data: data10607,
      color: "#473600",
    },
    {
      name: "u37",
      data: data10608,
      color: "#FBCEB1",
    },
    {
      name: "u38",
      data: data10609,
      color: "#7FFFD4",
    },
    {
      name: "u39",
      data: data10610,
      color: "#F19CBB",
    },
    {
      name: "u40",
      data: data10611,
      color: "#ED3CCA",
    },
    {
      name: "u41",
      data: data10612,
      color: "#9966CC",
    },
    {
      name: "u42",
      data: data10613,
      color: "#CD9575",
    },
    {
      name: "u43",
      data: data10614,
      color: "#293133",
    },
    {
      name: "u44",
      data: data10615,
      color: "#44944A",
    },
    {
      name: "u45",
      data: data10616,
      color: "#A8E4A0",
    },
    {
      name: "u46",
      data: data10617,
      color: "#6A5ACD",
    },
    {
      name: "u47",
      data: data10618,
      color: "#990066",
    },
    {
      name: "u48",
      data: data10619,
      color: "#CCCCFF",
    },
    {
      name: "u49",
      data: data10620,
      color: "#C1876B",
    },
    {
      name: "u50",
      data: data10621,
      color: "#003153",
    },
    {
      name: "u51",
      data: data10622,
      color: "#77DDE7",
    },
    {
      name: "u52",
      data: data10623,
      color: "#A5260A",
    },
  ];

  return (
    <div style={{ width: "1000px", overflow: "hidden" }}>
      <LineChart width={15000} height={800}>
        <XAxis dataKey="name" type="category" />
        <YAxis tickFormatter={formatYAxis} domain={[85, 100]} type="number" />
        <Tooltip />
        <Legend layout="vertical" verticalAlign="top" align="left" />
        {lineCharts.map((chart) => (
          <Line
            key={chart.name}
            data={chart.data}
            name={chart.name}
            type="monotone"
            dataKey="value"
            stroke={chart.color}
            dot={false}
            connectNulls={true}
          />
        ))}
      </LineChart>
    </div>
  );
};

export default EffGraph;
