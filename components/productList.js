import styles from "./productList.module.css"
import clsx from "clsx";
import {Fragment} from 'react'

const groupByToMap = (x, f) =>
    x.reduce((a, b, i, x) => {
        const k = f(b, i, x);
        a.get(k)?.push(b) ?? a.set(k, [b]);
        return a;
    }, new Map());

export function ProductLine({ product }) {
    return <li className={
        clsx({
            [styles.outofstock]: !product.stocked,
            [styles.forsale]: product.price <= 1
        })}>{product.name}: ${product.price}</li>
}


export default function ProductList({ products, filter }) {
    const list = groupByToMap(products, product => product.category)

    return [...list.keys()].map(key => <Fragment key={key}>
        <p>{key}</p>
        <ul>{list.get(key).map(it => {
            if(it.name.toLowerCase().includes(filter.toLowerCase())){
                return <ProductLine key={it.name} product={it} />
            }
        })}</ul>
    </Fragment>)
}
