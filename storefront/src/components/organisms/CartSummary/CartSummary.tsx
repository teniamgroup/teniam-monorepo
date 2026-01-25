"use client"

import { convertToLocale } from "@/lib/helpers/money"

export const CartSummary = ({
  item_total,
  shipping_total,
  total,
  currency_code,
  tax,
  discount_total,
}: {
  item_total: number
  shipping_total: number
  total: number
  currency_code: string
  tax: number
  discount_total: number
}) => {
  return (
    <div>
      <div className="space-y-4 label-md text-foreground mb-4">
        <div className="flex justify-between">
          <span>Items:</span>
          <span className="font-medium">
            {convertToLocale({
              amount: item_total,
              currency_code,
            })}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Delivery:</span>
          <span className="font-medium">
            {convertToLocale({
              amount: shipping_total,
              currency_code,
            })}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Tax:</span>
          <span className="font-medium">
            {convertToLocale({
              amount: tax,
              currency_code,
            })}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Discount:</span>
          <span className="font-medium">
            {convertToLocale({
              amount: discount_total,
              currency_code,
            })}
          </span>
        </div>
        <div className="flex justify-between border-t pt-4 items-center">
          <span className="font-semibold">Total:</span>
          <span className="label-xl font-bold">
            {convertToLocale({
              amount: total,
              currency_code,
            })}
          </span>
        </div>
      </div>
    </div>
  )
}
