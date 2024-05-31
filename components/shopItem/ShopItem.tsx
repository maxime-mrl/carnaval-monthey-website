import Image from "next/image";

import { buyItem } from "./action";
import Stripe from "stripe";

const ShopItem = ({ item } : { item: Stripe.Price & {product: Stripe.Product} }) => {
    console.log(item)
    return (
        <form>
            <button formAction={async () => {
                "use server";
                await buyItem(item.id);
            }} className="w-[10rem] relative">
                <div>
                <Image
                    src={item.product.images[0]}
                    alt={`Image pour ${item.product.name}`}
                    width={400}
                    height={400}
                    style={{objectFit: "contain", maxWidth: "100%", display:"block"}}
                />
                </div>
                <div className="w-full text-left">
                    <p>
                        {item.product.name}
                    </p>
                    <p>
                        <strong>5.-</strong>
                    </p>
                </div>
            </button>
        </form>
    )
}

export default ShopItem;