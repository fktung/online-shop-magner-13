import { IHow_to_pay } from "@/types";
import React from "react";
interface IWidgetPaymentMethodProps {
  how_to_pay: IHow_to_pay[];
  noVA: string;
}

export const WidgetPaymentMethod = (props: IWidgetPaymentMethodProps) => {
  const { how_to_pay, noVA } = props;
  return (
    <div>
      <p className="font-bold">Cara Pembayaran</p>
      {how_to_pay.map((item, i) => (
        <div key={i} className="collapse collapse-arrow">
          <input type="radio" name="paymentMethod" />
          <div className="font-black collapse-title">{item.name}</div>
          <div className="collapse-content">
            {item.header.map((itemChile, ii) => (
              <div key={ii}>
                <p>
                  <span className="font-black">{ii + 1}.</span> {itemChile.name}
                </p>
                <div className="ml-10">
                  <ol className="list-decimal">
                    {itemChile.content.map((itemChileRow, iii) => (
                      <li key={iii}>
                        <p>{itemChileRow.replace("[ACCOUNT_NUMBER]", noVA)}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
