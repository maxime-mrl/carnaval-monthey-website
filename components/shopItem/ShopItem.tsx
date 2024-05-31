import Image from "next/image";

import { buyItem } from "./action";
import Stripe from "stripe";

const ShopItem = ({ item } : { item: Stripe.Price & {product: Stripe.Product} }) => {
    return (
        <form>
            <button formAction={async () => {
                "use server";
                if (item.product.active) await buyItem(item.id);
                else return;
            }} className={`w-[10rem] relative ${!item.product.active ? "cursor-default opacity-50" : ""}`}>
                <div>
                <Image
                    src={item.product.images[0]}
                    alt={`Image pour ${item.product.name}`}
                    width={400}
                    height={400}
                    style={{objectFit: "cover", maxWidth: "100%", display:"block", height: "12rem"}}
                />
                </div>
                <div className="w-full text-left">
                    <p>
                        {item.product.name} {!item.product.active && "(épuisé)"}
                    </p>
                    <p>
                        <strong>{item.unit_amount ? item.unit_amount/100 : 0} .-</strong>
                    </p>
                </div>
            </button>
        </form>
    )
}

export default ShopItem;