import React, { useRef, useEffect, useMemo, useState } from "react";
import { renderToString } from "react-dom/server";
import {
  BsArrowsCollapse,
  BsFullscreen,
  BsZoomIn,
  BsZoomOut,
} from "react-icons/bs";
import { CgArrowsExpandRight } from "react-icons/cg";
import { OrgChart as D3OrgChart } from "d3-org-chart";
import { HierarchyNode } from "d3-hierarchy";
import { useAuth } from "@/hooks/auth";
import { IReferrals } from "@/types";
import { ApiAxios } from "@/helpers/axios";

type Props = {
  // referral: string;
  className?: string;
};

export const ChartOrgHierarchy = (props: Props) => {
  const { className, ...rest } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const { isAuth, isId, isName, isPhone, isStatus } = useAuth();
  const [isCardShow, setIsCardShow] = useState(false);
  const [isReferrals, setIsReferrals] = useState<IReferrals[]>();

  const data = useMemo(() => {
    if (!isReferrals) return;
    const newData = [
      {
        id: isId,
        parentId: "",
        name: isName,
        level: "0",
        phone: isPhone.number,
        status: isStatus,
        total: "0",
      },
      ...isReferrals.map(item => ({
        id: item.id,
        parentId: item.parent_id,
        name: item.name,
        level: item.lvl,
        phone: item.phone,
        status: item.status,
        total: item.total,
      })),
    ];
    return newData;
  }, [isId, isName, isPhone.number, isReferrals, isStatus]);

  const getReferrals = async () => {
    try {
      const response = ApiAxios.get(`membership/referrals`);
      const data = (await response).data.data;
      // console.log(data);
      setIsReferrals(data);
    } catch (error: any) {
      console.log("getReferrals", error);
    }
  };

  useEffect(() => {
    if (!isReferrals) {
      getReferrals();
    }
    if (!data) return;
    if (!isAuth) return;
    if (!containerRef.current) return;
    const orgChart = new D3OrgChart();
    orgChart
      .backgroundColor("#ffffff")
      .nodeHeight(() => 85)
      .nodeWidth(() => 320)
      .childrenMargin(() => 50)
      .compactMarginBetween(() => 25)
      .compactMarginPair(() => 50)
      .neightbourMargin(() => 25)
      .siblingsMargin(() => 25)
      // .buttonContent(({ node }: Connection) => {
      .buttonContent((params: { node: HierarchyNode<any> }) => {
        const { node } = params;
        return `<div style="color:#716E7B;border-radius:5px;padding:4px;font-size:10px;margin:auto auto;background-color:white;border: 1px solid #E4E2E9"> <span style="font-size:9px">${
          node.children
            ? `<i class="fas fa-angle-up"></i>`
            : `<i class="fas fa-angle-down"></i>`
        }</span> ${node.data._directSubordinates}  </div>`;
      })
      // .nodeContent(function (d: Connection) {
      .nodeContent(
        (
          node: HierarchyNode<any>,
          // index: number,
          // nodes: HierarchyNode<any>[],
          // state: any
        ) => {
          return renderToString(<NodeContent data={node.data} />);
        },
      )
      .container(containerRef.current as any)
      // .svgHeight(containerRef.current!.clientHeight)
      // .svgWidth(containerRef.current!.clientWidth)
      // .svgWidth(window.innerWidth)
      // .svgHeight(window.innerWidth)
      // .onNodeClick(el => setIsCardShow(!isCardShow))
      .data(data)
      .layout("left")
      .render();

    orgChart.expandAll();
  }, [data, isCardShow, isAuth, isReferrals]);

  return (
    <div className={className ?? `relative w-full h-full max-w-5xl`}>
      {/* <div className="absolute top-0 right-0 flex flex-col gap-4 p-4">
        <button
          onClick={() => orgChart.fullscreen.bind(orgChart)()}
          aria-label="center"
        >
          <BsFullscreen />
        </button>
        <button
          onClick={orgChart.expandAll.bind(orgChart)}
          aria-label="expand all"
        >
          <CgArrowsExpandRight />
        </button>
        <button
          onClick={orgChart.collapseAll.bind(orgChart)}
          aria-label="collapse all"
        >
          <BsArrowsCollapse />
        </button>
        <button onClick={orgChart.zoomIn.bind(orgChart)} aria-label="zoom in">
          <BsZoomIn />
        </button>
        <button onClick={orgChart.zoomOut.bind(orgChart)} aria-label="zoom out">
          <BsZoomOut />
        </button>
      </div> */}
      <div ref={containerRef} className="max-h-[70vh]">
        {isCardShow && (
          <div className="absolute top-0 bottom-0 left-0 right-0 grid min-h-screen bg-blue-400 place-items-center">
            <div className="bg-red-500 ">
              <button
                onClick={() => {
                  setIsCardShow(false);
                }}
              >
                close
              </button>
              here
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

type TNodeContentProps = {
  name: string;
  level: string;
  phone: string;
};

const NodeContent = (props: { data: TNodeContentProps }) => {
  const { data } = props;

  return (
    <div className="h-full p-4 border border-black rounded-xl">
      <p>
        name: <span className="font-black text-black">{data.name}</span>
      </p>
      {/* <p>
        Phone: <span className="font-black text-black">{data.phone}</span>
      </p> */}
      <p>
        Level: <span className="font-black text-black">{data.level}</span>
      </p>
    </div>
  );
};
